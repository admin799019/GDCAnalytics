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
        var data = await this._localPnPSetup.web.lists.getByTitle('GDC Intake Form JSON').items.filter(`IsActive eq 'Yes'`,).select("Title").get();
        return data;
    }

    public async getFormMetadata(type): Promise<any> {
        var data = await this._localPnPSetup.web.lists.getByTitle('GDC Intake Form JSON').items.filter(`Title eq '${type}'`,).getAll();
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
        const graphClient = await this._msGraphClientFactory.getClient();

        let resultQuery = graphClient
            .api('/users')
            .version("v1.0")
            .header("ConsistencyLevel", "eventual")
            .count(true)
            .top(10);

        resultQuery = resultQuery.query({ $search: `"displayName:${name}"` });
        let people: any;

        await this._localPnPSetup.web.siteUsers.select("*").filter(`substringof('${encodeURIComponent(name)}',UserPrincipalName)`).get().then((responseAfterFilterChanges) => {

            people = responseAfterFilterChanges;
            //return await responseAfterFilterChanges;
        });
        return people;
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
            Body: `<div class=\"ExternalClassBF1CF651DAD7456D88FDABBF43DF8E4B\"><div style=\"font-family&#58;Calibri, Arial, Helvetica, sans-serif;background-color&#58;rgb(255, 255, 255);\"><div><span style=\"color&#58;black;\">​</span><span style=\"font-size&#58;10pt;\">Hi,</span></div></div><div style=\"font-family&#58;Calibri, Arial, Helvetica, sans-serif;background-color&#58;rgb(255, 255, 255);\"><div><p><br></p></div></div><div style=\"font-family&#58;Calibri, Arial, Helvetica, sans-serif;background-color&#58;rgb(255, 255, 255);\"><div><span style=\"font-size&#58;10pt;\">An intake request has been submitted to the</span><span style=\"font-size&#58;10pt;\">&#160;</span><span style=\"font-size&#58;10pt;\"><b>Operational Framework\\Targeting Enablement and Business Health\\AHR</b></span><span style=\"font-size&#58;10pt;\">&#160;backlog by</span><span style=\"font-size&#58;10pt;\">&#160;</span><span style=\"font-size&#58;10pt;\"><b>MOD Administrator.</b></span><span style=\"font-size&#58;10pt;\">&#160;</span><span style=\"font-size&#58;10pt;\">Use the link below to view the full user story and begin triage and prioritization.</span></div><p></p><ul><li><span style=\"background-color&#58;rgb(255, 255, 255);font-size&#58;10pt;display&#58;inline !important;\"><b>Link to User Story &#58;</b></span><span style=\"background-color&#58;rgb(255, 255, 255);display&#58;inline !important;\"><b><span style=\"font-size&#58;10pt;\">&#160;</span></b></span><span style=\"background-color&#58;rgb(255, 255, 255);font-size&#58;10pt;display&#58;inline !important;\"><a href='https://dev.azure.com/onegdcanalyticsdev/Operational%20Framework/_workitems/edit/1609'>Link</a></span><br></li><li><span style=\"font-size&#58;10pt;\"><b>Request Title &#58;</b></span><span style=\"font-size&#58;10pt;\">&#160;test 1118</span></li><li><span style=\"font-size&#58;10pt;\"><b>Need By Date &#58;</b></span><span style=\"font-size&#58;10pt;\">&#160;</span><br></li><li><span style=\"font-size&#58;10pt;\"><b>Requirement &#58;</b> <p><strong>Please supply the business/strategic question(s) you are seeking to answer with this request. (what questions are you trying to answer) </strong></p><p>sdfsdf</p><p>Microsoft Internet Explorer&amp;#39;s Enhanced Security Configuration is currently enabled on your environment. This enhanced level of security prevents our web integration experiences from displaying or performing correctly. To continue with your operation please disable this configuration or contact your administrator.</p><p><img src=\"https://dev.azure.com/onegdcanalyticsdev/_apis/wit/attachments/f2006f0f-31af-4058-9eb8-3a73ef8e7d25?fileName=image.png\"></p><p><br></p><p><strong>Objective: What will the output of this analysis, metrics, or report enable you to do/understand better or differently? </strong></p><p><br></p><p><br></p><p><strong>Hypothesis: If applicable, please provide a hypothesis statement to ground the analytics exploration and help provide the analyst with a point to work from. </strong></p><p><br></p><p><br></p><p><strong>How many users does this request affect? (myself, my area/subsidiary or all users) </strong></p><p><br></p><p><br></p><p><strong>What do we need to consider to support this request: data (fields, dimensions); time horizon (e.g. last 6, 12, or 18 months; trailing 12 months); what is the frequency you need this available for: 1x, weekly, monthly, quarterly </strong></p><p><br></p></span></li><li><span style=\"font-size&#58;10pt;\"><b>Impact &#58;</b> <p>dddasd</p></span></li><li><span style=\"font-size&#58;10pt;\"><b>Objective &#58; </b>sad</span></li><li><span style=\"font-size&#58;10pt;\"><b>Request Type &#58; </b></span></li><li><span style=\"font-size&#58;10pt;\"></span></li></ul><div><p><br></p><p><span style=\"font-size&#58;10pt;\">Thanks,</span></p><p><span style=\"font-size&#58;10pt;\">GDC Automation</span></p></div></div><br style=\"font-family&#58;Calibri, Arial, Helvetica, sans-serif;font-size&#58;14.6667px;background-color&#58;rgb(255, 255, 255);\"></div>`,
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