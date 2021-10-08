import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { AadHttpClientFactory, AadHttpClient, HttpClientResponse, IHttpClientOptions } from "@microsoft/sp-http";
import { IDevOpsService } from "./IDevOpsService";
import { OrganizationConfig } from "../JSONFormMetadata/OrgConfig";
import AppInsights from "./../ApplicationInsights/ApplicationInsights";

export class DevOpsService implements IDevOpsService {

    public static readonly serviceKey: ServiceKey<IDevOpsService> = ServiceKey.create<IDevOpsService>('SPFx:DevOpsService', DevOpsService);
    private _aadHttpClientFactory: AadHttpClientFactory;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._aadHttpClientFactory = serviceScope.consume(AadHttpClientFactory.serviceKey);
        });
    }

    public addUserStory(data, devopsprojecturl): Promise<any> {
        return new Promise<any>((resolve: (response: any) => void, reject: (response: any) => void): void => {
            const body: string = JSON.stringify(data);

            const requestHeaders: Headers = new Headers();
            requestHeaders.append('Content-type', 'application/json-patch+json');

            const httpClientOptions: IHttpClientOptions = {
                body: body,
                headers: requestHeaders
            };
            this._aadHttpClientFactory.getClient(OrganizationConfig.DevOpsID).then((client: AadHttpClient) => {
                client.post(devopsprojecturl + "/_apis/wit/workItems/$USER STORY?api-version=6.0", AadHttpClient.configurations.v1, httpClientOptions)
                    .then((response: HttpClientResponse) => {
                        return response.json();
                    })
                    .then((datar: any): void => {
                        console.log(["Add User Story response", datar, " site", OrganizationConfig.SharePointSiteUrl]);
                        resolve(datar);
                    }).catch((ex: any) => {
                        AppInsights.trackException(ex, {
                            UserId: "",
                            Module: "DevOpsService.ts",
                            APIUrl: devopsprojecturl + "/_apis/wit/workItems/$USER STORY?api-version=6.0",
                            Method: "Add User Story"
                        });
                    });
            });
        });
    }

    public addAttachment(data, id, devopsprojecturl): any {
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
            client.fetch(devopsprojecturl + "/_apis/wit/workitems/" + id + "?api-version=6.0", AadHttpClient.configurations.v1, httpClientOptions)
                .then((response: HttpClientResponse) => {
                    return response.json();
                })
                .then((projects: any): void => {
                    console.log(["Relate Attachment response", projects]);
                }).catch((ex: any) => {
                    AppInsights.trackException(ex, {
                        UserId: "",
                        Module: "DevOpsService.ts",
                        APIUrl: devopsprojecturl + "/_apis/wit/workitems/" + id + "?api-version=6.0",
                        Method: "Add Attachment"
                    });
                });
        });
    }


    public async uploadImage(base64content, fileName, OrganizationUrl): Promise<any> {
        return new Promise<any>((resolve: (response: any) => void, reject: (response: any) => void): void => {
            const requestHeaders: Headers = new Headers();
            requestHeaders.append('Content-Type', 'application/octet-stream');

            const httpClientOptions: IHttpClientOptions = {
                body: base64content,
                headers: requestHeaders,

            };
            this._aadHttpClientFactory.getClient(OrganizationConfig.DevOpsID).then((client: AadHttpClient) => {
                client.post(OrganizationUrl + "/_apis/wit/attachments?fileName=" + fileName + "&api-version=5.1", AadHttpClient.configurations.v1, httpClientOptions)
                    .then((response: HttpClientResponse) => {
                        return response.json();
                    }).then((res: any): void => {
                        console.log(["upload attchment response"], res.url);
                        resolve(res.url);
                        // return promise;
                    }).catch((ex: any) => {
                        AppInsights.trackException(ex, {
                            UserId: "",
                            Module: "DevOpsService.ts",
                            APIUrl: OrganizationUrl + "/_apis/wit/attachments?fileName=" + fileName + "&api-version=5.1",
                            Method: "Upload Image"
                        });
                    });
            });

        });
        // let promise = new Promise((resolve,reject));
    }

}