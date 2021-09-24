import { sp, SPRest } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/sputilities";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { PageContext } from '@microsoft/sp-page-context';
import { Logger, ConsoleListener } from '@pnp/logging';
import { graph } from "@pnp/graph";
import { IHttpClientOptions, HttpClientResponse, HttpClient } from '@microsoft/sp-http';
import "@pnp/graph/groups";
import "@pnp/graph/users";
import { ISearchResult, SearchQueryBuilder } from '@pnp/sp/presets/all';
import '@pnp/sp/search';

import { IEmailProperties } from "@pnp/sp/sputilities";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISPService } from "./ISPService";
import { OrganizationConfig } from "../JSONFormMetadata/OrgConfig";

export class SPService implements ISPService {
    private _pageContext: PageContext;
    //private sp:sp.web;
    private _localPnPSetup: SPRest;
    private _searchParameter: string;

    private wpContext: WebPartContext;
    constructor(pageContext: PageContext, wpContext: WebPartContext) {
        this._pageContext = pageContext;
        this.wpContext = wpContext;
        const consoleListener = new ConsoleListener();
        Logger.subscribe(consoleListener);
        this._localPnPSetup = sp.configure({
            headers: {
                Accept: 'application/json; odata=nometadata',
                //'User Agent': 'NONISV|Microsoft|22b26582-4ad7-4166-8450-a7b7471c5614|1.0',
                'X-ClientTag': 'NONISV|Microsoft|22b26582-4ad7-4166-8450-a7b7471c5614|1.0',
                'Clienttype': '22b26582-4ad7-4166-8450-a7b7471c5614',
            },
            mode: 'cors'
        }, this._pageContext.web.absoluteUrl);

       
    }

    public async getAreasList(): Promise<any> {
        var data = await this._localPnPSetup.web.lists.getByTitle('GDC Intake Form JSON').items.filter(`IsActive eq 'Yes'`,).select("Title").get();
        return data;
    }

    public async getFormMetadata(type): Promise<any> {
        var data = await this._localPnPSetup.web.lists.getByTitle('GDC Intake Form JSON').items.filter(`Title eq '${type}'`,).getAll();
       console.log(data,"data from metadata");
        return data[0];
    }
    public async getEmailData(Team, Area, PODCategory): Promise<any> {
        var filterStr = "";
        filterStr = filterStr.concat(Team != "" ? `GDCEmailTeam eq '${Team}'` : "");
        filterStr = filterStr.concat(Area != "" ? ` and GDCEmailArea eq '${Area}'` : "");
        filterStr = filterStr.concat(PODCategory != "" ? ` and GDCEmailPODCategory eq '${PODCategory}'` : "");

        var data = await this._localPnPSetup.web.lists.getByTitle('GDC Intake Form Notifications').items.filter(filterStr).select("Title,GDCEmailTo/EMail,GDCEmailTeam,GDCEmailSubject,GDCEmailPODCategory,GDCEmailArea,GDCEmailBody,GDCEmailCc/EMail").expand("GDCEmailTo,GDCEmailCc").getAll();
        return data[0];
    }

    public async getOfficeUsersAlt(name): Promise<any> {
       

        // let resultQuery = graphClient
        //     .api('/users')
        //     .version("v1.0")
        //     .header("ConsistencyLevel", "eventual")
        //     .count(true)
        //     .top(10);

        // resultQuery = resultQuery.query({ $search: `"displayName:${name}"` });
         let people: any;

        await this._localPnPSetup.web.siteUsers.select("*").filter(`substringof('${encodeURIComponent(name)}',UserPrincipalName)`).get().then((responseAfterFilterChanges) => {

            people = responseAfterFilterChanges;
            //return await responseAfterFilterChanges;
        });
        return people;
    }
    public async getOfficeUsers(name): Promise<any> {
        
        let people: any;

        await this._localPnPSetup.web.siteUsers.select("*").filter(`substringof('${encodeURIComponent(name)}',Title)`).get().then((responseAfterFilterChanges) => {

            people = responseAfterFilterChanges;
            //return await responseAfterFilterChanges;
        });
        return people;
    }

    public async sendEmail(emaildata, formData) {
        var people: any = emaildata.GDCEmailTo;
        var to: any = [];
        people.forEach(email => {
            to.push(email.EMail);
        });

        var peopleCc: any = emaildata.GDCEmailCc != null ? emaildata.GDCEmailCc : [];
        var cc: any = [];
        peopleCc.forEach(element => {
            cc.push(element.EMail);
        });

        await this._localPnPSetup.web.currentUser().then((data) => {
            let currentUserInTO = to.filter(t => t == data.Email);
            let currentUserInCC = cc.filter(t => t == data.Email);
            console.log("to", currentUserInTO, "cc", currentUserInCC);

            if (currentUserInTO.length == 0 && currentUserInCC.length == 0) {
                cc.push(data.Email);
            }
            formData.push({ "id": "CreatedBy", "value": data.Title });
        });

        let mailBodyStr = emaildata.GDCEmailBody;
        let mailSubjectStr = emaildata.GDCEmailSubject;

        var mailSubjectWords = mailSubjectStr != null || mailSubjectStr != undefined ? mailSubjectStr.split(' ') : [];
        mailSubjectWords.map(w => {
            const word = w.match("{{(.*)}}");
            if (word != null) {
                let wordWithoutBraces = word[0].slice(2, word[0].length - 2);
                let data = formData.filter(d => d.id == wordWithoutBraces) != null && formData.filter(d => d.id == wordWithoutBraces).length > 0 && formData.filter(d => d.id == wordWithoutBraces)[0].value != null
                    ? formData.filter(d => d.id == wordWithoutBraces)[0].value : "";
                mailSubjectStr = mailSubjectStr.replace(`${word[0]}`, data);
            }
        });

        mailBodyStr = mailBodyStr.replaceAll("&#123;", "{");
        mailBodyStr = mailBodyStr.replaceAll("&#125;", "}");

        var mailBodyWords = mailBodyStr !== null || mailBodyStr != undefined ? mailBodyStr.split('&#160;').join(' ').split('<').join(' <').split(' ') : [];
        mailBodyWords.map(w => {
            const word = w.match("{{(.*)}}");

            if (word != null) {
                let wordWithoutBraces = word[0].slice(2, word[0].length - 2);
                let data = formData.filter(d => d.id == wordWithoutBraces) != null && formData.filter(d => d.id == wordWithoutBraces).length > 0 && formData.filter(d => d.id == wordWithoutBraces)[0].value != null
                    ? (formData.filter(d => d.id == wordWithoutBraces)[0].value || formData.filter(d => d.id == wordWithoutBraces)[0].value.url as string || "")
                    : "";
                mailBodyStr = mailBodyStr.replace(`${word[0]}`, data);
            }
        });

        var emailProps: IEmailProperties = {
            Body: mailBodyStr,
            Subject: mailSubjectStr,
            To: to,
            CC: cc
            
        };
        this._localPnPSetup.utility.sendEmail(emailProps).then((i) => {
            console.log("email sent", i);
        }).catch((i) => {
            console.log("email not sent", i);
        });
    }

}