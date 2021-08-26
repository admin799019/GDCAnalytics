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
import {ISearchResult, SearchQueryBuilder } from '@pnp/sp/presets/all';
import '@pnp/sp/search';
import { MSGraphClientFactory } from '@microsoft/sp-http';
import { IEmailProperties } from "@pnp/sp/sputilities";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISPService } from "./ISPService";
import { OrganizationConfig } from "../JSONFormMetadata/OrgConfig";

export class SPService implements ISPService {
    private _pageContext: PageContext;
    //private sp:sp.web;
    private _localPnPSetup: SPRest;
    private _searchParameter: string;
    private _msGraphClientFactory: MSGraphClientFactory;
    private wpContext: WebPartContext;
    constructor(pageContext: PageContext, msGraphClientFactory: MSGraphClientFactory, wpContext: WebPartContext) {
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

        this._msGraphClientFactory = msGraphClientFactory;
    }

    public async getAreasList(): Promise<any> {
        var data = await this._localPnPSetup.web.lists.getByTitle('GDC Form JSON').items.filter(`IsActive eq 'Yes'`,).select("Title").get();
        return data;
    }

    public async getFormMetadata(type): Promise<any> {
        var data = await this._localPnPSetup.web.lists.getByTitle('GDC Form JSON').items.filter(`Title eq '${type}'`,).getAll();
        return data[0];
    }
    public async getEmailData(Team, Area, PODCategory): Promise<any> {
        var filterStr = "";
        filterStr = filterStr.concat(Team != "" ? `GDCEmailTeam eq '${Team}'` : "");
        filterStr = filterStr.concat(Area != "" ? ` and GDCEmailArea eq '${Area}'` : "");
        filterStr = filterStr.concat(PODCategory != "" ? ` and GDCEmailPODCategory eq '${PODCategory}'` : "");

        var data = await this._localPnPSetup.web.lists.getByTitle('Intake Form Notifications').items.filter(filterStr).getAll();
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
let people:any;
await sp.web.siteUsers.select("Email","UserPrincipalName","Title").filter(`substringof('${encodeURIComponent(name)}',UserPrincipalName)`) .get().then((responseAfterFilterChanges)=>  { 
    console.log(responseAfterFilterChanges,"rafc")
 people=responseAfterFilterChanges;
    //return await responseAfterFilterChanges;
});
return people;
//         //return await resultQuery.get();
//       sp.web.siteUsers().then((data)=>{
//         console.log(data) 
//     //data.filter(x => x.LoginName.lastIndexOf(name,17)=== 0)
//     let people:any;
//     data.forEach(element => {
//       if(element.LoginName.lastIndexOf(name,17)=== 0)  
//       {
//           console.log("insideif");
//           people.push({displayName:element.Title,mail:element.Email})
//       }
//     });
//    //console.log(data[0].LoginName.lastIndexOf(name,17)=== 0)
//     console.log(people,"data")
//           return(people);
    
    //  await console.log(resultQuery.get(),"result query")
    //     //const q = SearchQueryBuilder(`${name}*`)
    //     //sp.profiles
    //     //console.log(q,"q")
    //     sp.web.siteUsers().then((data)=>{
    //         console.log(data,"pnp");
    //         return data;
    //     })
        // const allUsers = await graph.users();
        // return allUsers;
    }

    public async sendEmail(emaildata, formData) {
        console.log(formData, "formdata in sp email service");
        let currentUser = await this._localPnPSetup.web.currentUser();
        // emails.push(currentUser.Email);
        var to = emaildata.GDCEmailTo != null ? emaildata.GDCEmailTo.split(';') : [];
        to.forEach(async email => {
            await this._localPnPSetup.web.ensureUser(email);
        });
        var cc = emaildata.GDCEmailCc != null ? emaildata.GDCEmailCc.split(';') : [];
        formData.push({ "id": "CreatedBy", "value": currentUser.Title });
        cc.forEach(element => {
            sp.web.ensureUser(element).then((data)=>{
                
            })  
        });
        let mailBodyStr = emaildata.GDCEmailBody;
        let mailSubjectStr = emaildata.GDCEmailSubject;

        var mailSubjectWords = mailSubjectStr != null || mailSubjectStr != undefined ? mailSubjectStr.split(' ') : [];
        mailSubjectWords.map(w => {
            const word = w.match("{{(.*)}}");
            if (word != null) {
                let wordWithoutBraces = word[0].slice(2, word[0].length - 2);
                let data = formData.filter(d => d.id == wordWithoutBraces) != null && formData.filter(d => d.id == wordWithoutBraces).length > 0 ? formData.filter(d => d.id == wordWithoutBraces)[0].value : "";
                mailSubjectStr = mailSubjectStr.replace(`${word[0]}`, data);
            }
        });

        mailBodyStr = mailBodyStr.replaceAll("&#123;", "{");
        mailBodyStr = mailBodyStr.replaceAll("&#125;", "}");

        var mailBodyWords = mailBodyStr !== null || mailBodyStr != undefined ? mailBodyStr.split(' ') : [];
        mailBodyWords.map(w => {
            const word = w.match("{{(.*)}}");

            if (word != null) {
                let wordWithoutBraces = word[0].slice(2, word[0].length - 2);
                let data = formData.filter(d => d.id == wordWithoutBraces) != null && formData.filter(d => d.id == wordWithoutBraces).length > 0 ? (formData.filter(d => d.id == wordWithoutBraces)[0].value || formData.filter(d => d.id == wordWithoutBraces)[0].value.url as string || "") : "";
                mailBodyStr = mailBodyStr.replace(`${word[0]}`, data);
            }
        });
        
      


        var emailProps: IEmailProperties = {
            //Body: '<br></br>An intake request has been submitted to the<b> '+area+'</b> backlog by <b>'+currentUser.Title+'.</b> Use the link below to view the full user story and begin triage and prioritization.<br></br> <ul><li><a href= "' + url + '">link to User Story</a></li><li><b>Request Title : </b>'+title+'</li><li><b>Need By Date : </b>'+date+'</li>',
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

    public async sendEmailUsingPowerAutomate(formData, emaildata): Promise<HttpClientResponse> {
        const postURL = OrganizationConfig.FlowUrl;

        let currentUser = await this._localPnPSetup.web.currentUser();
        formData.push({ "id": "CreatedBy", "value": currentUser.Title });

        let mailBodyStr = emaildata.GDCEmailBody;
        let mailSubjectStr = emaildata.GDCEmailSubject;

        var mailSubjectWords = mailSubjectStr != null || mailSubjectStr != undefined ? mailSubjectStr.split(' ') : [];
        mailSubjectWords.map(w => {
            const word = w.match("{{(.*)}}");
            if (word != null) {
                let wordWithoutBraces = word[0].slice(2, word[0].length - 2);
                let data = formData.filter(d => d.id == wordWithoutBraces) != null && formData.filter(d => d.id == wordWithoutBraces).length > 0 ? formData.filter(d => d.id == wordWithoutBraces)[0].value : "";
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
                let data = formData.filter(d => d.id == wordWithoutBraces) != null && formData.filter(d => d.id == wordWithoutBraces).length > 0
                    ? (formData.filter(d => d.id == wordWithoutBraces)[0].value || formData.filter(d => d.id == wordWithoutBraces)[0].value.url as string || "")
                    : "";
                mailBodyStr = mailBodyStr.replace(`${word[0]}`, data);
            }
        });
        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        
        const body: string = JSON.stringify({
            'emailTo': emaildata.GDCEmailTo != null ? emaildata.GDCEmailTo : "",
            'emailCc': emaildata.GDCEmailCc != null ? emaildata.GDCEmailCc : "",
            'emailSubject': mailSubjectStr,
            'emailBody': mailBodyStr
        });
        console.log(body,"body")
         const httpClientOptions: IHttpClientOptions = {
            body: body,
            headers: requestHeaders
        };

        return this.wpContext.httpClient.post(
            postURL,
            HttpClient.configurations.v1,
            httpClientOptions)
            .then((response: HttpClientResponse): Promise<HttpClientResponse> => {
                console.log("Email sent.", response);
                return response.json();
            });
    }
}