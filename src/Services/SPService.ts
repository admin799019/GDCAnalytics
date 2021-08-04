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

    public async getFormMetadata(type): Promise<any> {
        var data = await sp.web.lists.getByTitle('GDC Form JSON').items.filter(`Title eq '${type}'`).getAll();
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

    public async sendEmail(area: string, emails, id) {
        var url = OrganizationConfig.ProjectUrl + "/_workitems/edit/" + id;
        let currentUser = await sp.web.currentUser();
        emails.push(currentUser.Email);

        var emailProps: IEmailProperties = {
            Body: 'A New User Story has been submitted. Please find the link below: </br> <a href= "' + url + '">link to User Story</a>',
            Subject: 'New User Story has been Submitted',
            To: emails,
        };
        sp.utility.sendEmail(emailProps).then((i) => {
            console.log("email sent", i);
        }).catch((i) => {
            console.log("email not sent", i);
        });
    }
}