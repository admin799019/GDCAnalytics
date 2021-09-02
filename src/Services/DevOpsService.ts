import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { AadHttpClientFactory, AadHttpClient, HttpClientResponse, IHttpClientOptions } from "@microsoft/sp-http";
import { SPHttpClient } from "@microsoft/sp-http";
import { IDevOpsService } from "./IDevOpsService";
import { OrganizationConfig } from "../JSONFormMetadata/OrgConfig";

export class DevOpsService implements IDevOpsService {

    public static readonly serviceKey: ServiceKey<IDevOpsService> = ServiceKey.create<IDevOpsService>('SPFx:DevOpsService', DevOpsService);
    private _aadHttpClientFactory: AadHttpClientFactory;
    private _spHttpClient: SPHttpClient;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._aadHttpClientFactory = serviceScope.consume(AadHttpClientFactory.serviceKey);
            this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
        });
    }

    public async getProjects1(): Promise<any> {

        await this._aadHttpClientFactory.getClient(OrganizationConfig.DevOpsID).then((client: AadHttpClient) => {
            client.get(OrganizationConfig.OrganizationUrl + `/_apis/projects?api-version=6.0`, AadHttpClient.configurations.v1)
                .then((response: HttpClientResponse) => {
                    console.log(["Try1", response]);
                    return response.json();
                })
                .then((projects: any): void => {
                    console.log(["Try1", projects]);
                });
        });
    }
    public addUserStory(data): Promise<any> {
        return new Promise<any>((resolve: (response: any) => void, reject: (response: any) => void): void => {
            const body: string = JSON.stringify(data);

            const requestHeaders: Headers = new Headers();
            requestHeaders.append('Content-type', 'application/json-patch+json');

            const httpClientOptions: IHttpClientOptions = {
                body: body,
                headers: requestHeaders
            };
            this._aadHttpClientFactory.getClient(OrganizationConfig.DevOpsID).then((client: AadHttpClient) => {
                client.post(OrganizationConfig.ProjectUrl + "/_apis/wit/workItems/$USER STORY?api-version=6.0", AadHttpClient.configurations.v1, httpClientOptions)
                    .then((response: HttpClientResponse) => {
                        return response.json();
                    })
                    .then((datar: any): void => {
                        console.log(["Add User Story response", datar]);
                        resolve(datar);
                    });
            });
        });
    }

    public addAttachment(data, id): any {
        const body: string = JSON.stringify(data);
        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json-patch+json');
        //requestHeaders.append('method', 'PATCH');

        const httpClientOptions: IHttpClientOptions = {
            body: body,
            headers: requestHeaders,
            method: 'PATCH'
        };
        this._aadHttpClientFactory.getClient(OrganizationConfig.DevOpsID).then((client: AadHttpClient) => {
            client.fetch(OrganizationConfig.ProjectUrl + "/_apis/wit/workitems/" + id + "?api-version=6.0", AadHttpClient.configurations.v1, httpClientOptions)
                .then((response: HttpClientResponse) => {
                    return response.json();
                })
                .then((projects: any): void => {
                    console.log(["Relate Attachment response", projects]);
                });
        });
    }


    public async uploadImage(base64content, fileName): Promise<any> {
        return new Promise<any>((resolve: (response: any) => void, reject: (response: any) => void): void => {
            const requestHeaders: Headers = new Headers();
            requestHeaders.append('Content-Type', 'application/octet-stream');

            const httpClientOptions: IHttpClientOptions = {
                body: base64content,
                headers: requestHeaders,

            };
            this._aadHttpClientFactory.getClient(OrganizationConfig.DevOpsID).then((client: AadHttpClient) => {
                client.post(OrganizationConfig.OrganizationUrl + "/_apis/wit/attachments?fileName=" + fileName + "&api-version=5.1", AadHttpClient.configurations.v1, httpClientOptions)
                    .then((response: HttpClientResponse) => {

                        return response.json();

                    }).then((res: any): void => {
                        console.log(["upload attchment response"], res.url);
                        resolve(res.url);
                        // return promise;
                    });
            });

        });
        // let promise = new Promise((resolve,reject));
    }

    public getTeamDetails(team: string): Promise<any> {
        return new Promise<any>((resolve: (response: any) => void, reject: (response: any) => void): void => {
            const requestHeaders: Headers = new Headers();
            requestHeaders.append('Content-type', 'application/json-patch+json');

            const httpClientOptions: IHttpClientOptions = {
                headers: requestHeaders,
            };
            this._aadHttpClientFactory.getClient(OrganizationConfig.DevOpsID).then((client: AadHttpClient) => {
                client.get(OrganizationConfig.OrganizationUrl + "/_apis/projects/" + OrganizationConfig.ProjectName + "/teams/" + team + "/members?api-version=6.0", AadHttpClient.configurations.v1, httpClientOptions)
                    .then((response: HttpClientResponse) => {
                        return response.json();
                    })
                    .then((teams: any): void => {
                        console.log(["get Team details response", teams]);
                        resolve(teams);
                    });
            });

        });
    }
}