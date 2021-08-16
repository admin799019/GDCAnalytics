import { sp, SPRest } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/sputilities";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { PageContext } from '@microsoft/sp-page-context';
import { Logger, ConsoleListener } from '@pnp/logging';
import { graph } from "@pnp/graph";
import "@pnp/graph/groups";
import "@pnp/graph/users";
import { MSGraphClientFactory } from '@microsoft/sp-http';
import { IEmailProperties } from "@pnp/sp/sputilities";

import { ISPService } from "./ISPService";
import { OrganizationConfig } from "../JSONFormMetadata/OrgConfig";

export class SPService implements ISPService {
    private _pageContext: PageContext;
    //private sp:sp.web;
    private _localPnPSetup: SPRest;
    private _searchParameter: string;
    private _msGraphClientFactory: MSGraphClientFactory;

    constructor(pageContext: PageContext, msGraphClientFactory: MSGraphClientFactory) {
        this._pageContext = pageContext;
        const consoleListener = new ConsoleListener();
        Logger.subscribe(consoleListener);
        // this._localPnPSetup = sp.configure({
        //     headers: {
        //         Accept: 'application/json; odata=nometadata',
        //         //'User Agent': 'NONISV|Microsoft|22b26582-4ad7-4166-8450-a7b7471c5614|1.0',
        //         'X-ClientTag': 'NONISV|Microsoft|22b26582-4ad7-4166-8450-a7b7471c5614|1.0',
        //         'Clienttype': '22b26582-4ad7-4166-8450-a7b7471c5614',
        //     },
        //     mode: 'cors'
        // }, this._pageContext.web.absoluteUrl);

        this._msGraphClientFactory = msGraphClientFactory;
    }

    public async getAreasList(): Promise<any> {
        var data = await sp.web.lists.getByTitle('GDC Form JSON').items.select("Title").get();
        return data;
    }

    public async getFormMetadata(type): Promise<any> {
        var data = await sp.web.lists.getByTitle('GDC Form JSON').items.filter(`Title eq '${type}'`).getAll();
        return data[0];
    }
    public async getEmailData(Area): Promise<any> {
        console.log(Area);
        var data = await sp.web.lists.getByTitle('Intake Form Notifications').items.filter(`GDCEmailArea eq '${Area}'`).getAll();
        return data[0];
    }

    public async getOfficeUsers(name): Promise<any> {
        const graphClient = await this._msGraphClientFactory.getClient();

        let resultQuery = graphClient
            .api('/users')
            .version("v1.0")
            .header("ConsistencyLevel", "eventual")
            .count(true)
            .top(10);

        resultQuery = resultQuery.query({ $search: `"displayName:${name}"` });
        return await resultQuery.get();

        // const allUsers = await graph.users();
        // return allUsers;
    }

    public async sendEmail(emaildata1, title, date, area, emails, id) {
        var url = OrganizationConfig.ProjectUrl + "/_workitems/edit/" + id;
        let currentUser = await sp.web.currentUser();
        emails.push(currentUser.Email);
        let Bodystr = emaildata1.GDCEmailBody;
        let newstr = "";
        

        Bodystr = Bodystr.replace("System.Areapath", area);
        Bodystr = Bodystr.replace("System.CreatedBy", currentUser.Title);
        Bodystr = Bodystr.replace("System.Link", url);
        Bodystr = Bodystr.replace("System.Title", title);
        Bodystr = Bodystr.replace("System.NeedByDate", date);
        
        Bodystr = Bodystr.replaceAll("{", " ");
        Bodystr = Bodystr.replaceAll("}", " ");

        Bodystr = Bodystr.replaceAll("&#123;", " ");
        Bodystr = Bodystr.replaceAll("&#125;", " ");
        for (let i = 0; i < Bodystr.length; i++) {
            if (Bodystr[i] != '{' || Bodystr[i] != '}')
                newstr += Bodystr[i];
        }
        
        var emailProps: IEmailProperties = {
            //Body: '<br></br>An intake request has been submitted to the<b> '+area+'</b> backlog by <b>'+currentUser.Title+'.</b> Use the link below to view the full user story and begin triage and prioritization.<br></br> <ul><li><a href= "' + url + '">link to User Story</a></li><li><b>Request Title : </b>'+title+'</li><li><b>Need By Date : </b>'+date+'</li>',
            Body: newstr,
            Subject: emaildata1.GDCEmailSubject,
            To: emails,
        };
        sp.utility.sendEmail(emailProps).then((i) => {
            console.log("email sent", i);
        }).catch((i) => {
            console.log("email not sent", i);
        });
    }
}