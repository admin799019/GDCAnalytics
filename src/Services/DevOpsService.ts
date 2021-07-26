import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { AadHttpClientFactory, AadHttpClient, HttpClientResponse, IHttpClientOptions } from "@microsoft/sp-http";
import { SPHttpClient } from "@microsoft/sp-http";
import { IDevOpsService } from "./IDevOpsService";

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

        await this._aadHttpClientFactory.getClient("499b84ac-1321-427f-aa17-267ca6975798").then((client: AadHttpClient) => {
            client.get(`https://dev.azure.com/onegdcanalyticsdev/_apis/projects?api-version=6.0`, AadHttpClient.configurations.v1)
                .then((response: HttpClientResponse) => {
                    console.log(["Try1", response]);
                    return response.json();
                })
                .then((projects: any): void => {
                    console.log(["Try1", projects]);
                });
        });
    }
    public  getLatestVer(id): Promise<any> {
        console.log(id);
        return new Promise<any>((resolve: (response: any) => void, reject: (response: any) => void): void => {
          this._aadHttpClientFactory.getClient("499b84ac-1321-427f-aa17-267ca6975798").then((client: AadHttpClient) => {
                client.get("https://dev.azure.com/onegdcanalyticsdev/Operational%20Framework/_apis/wit/workItems/"+id+"/updates?$orderby=RevisedDate desc&$top=1&api-version=6.0", AadHttpClient.configurations.v1)
                    .then((response: HttpClientResponse) => {
                        console.log(["TryLates1version", response]);
                        return response.json();
                    })
                    .then((datar: any): void => {
                        console.log(["Try1Latestversion", datar]);
                        resolve(datar);
                    });
            });
        });

    }
    public addfeature(data): Promise<any> {
        // const body: string = JSON.stringify([
        //     {
        //         "op": "add",
        //         "path": "/fields/System.Title",
        //         "from": null,
        //         "value": data
        //     }
        // ]);
        return new Promise<any>((resolve: (response: any) => void, reject: (response: any) => void): void => {
            const body: string = JSON.stringify(data);

            const requestHeaders: Headers = new Headers();
            requestHeaders.append('Content-type', 'application/json-patch+json');

            const httpClientOptions: IHttpClientOptions = {
                body: body,
                headers: requestHeaders
            };
            this._aadHttpClientFactory.getClient("499b84ac-1321-427f-aa17-267ca6975798").then((client: AadHttpClient) => {
                client.post("https://dev.azure.com/onegdcanalyticsdev/Operational%20Framework/_apis/wit/workItems/$USER STORY?api-version=6.0", AadHttpClient.configurations.v1, httpClientOptions)
                    .then((response: HttpClientResponse) => {
                        console.log(["Try1", response]);
                        return response.json();
                    })
                    .then((datar: any): void => {
                        console.log(["Try1", datar]);
                        resolve(datar);
                    });
            });
        });

    }
    public addAttachment(data,id): any {
        const body: string = JSON.stringify(data);
        console.log(body);
        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json-patch+json');
        //requestHeaders.append('method', 'PATCH');

        const httpClientOptions: IHttpClientOptions = {
            body: body,
            headers: requestHeaders,
            method: 'PATCH'
        };
        this._aadHttpClientFactory.getClient("499b84ac-1321-427f-aa17-267ca6975798").then((client: AadHttpClient) => {
            client.fetch("https://dev.azure.com/onegdcanalyticsdev/Operational%20Framework/_apis/wit/workitems/"+id+"?api-version=6.0", AadHttpClient.configurations.v1, httpClientOptions)
                .then((response: HttpClientResponse) => {
                    return response.json();
                })
                .then((projects: any): void => {
                    console.log(["Relate Attachment Try", projects]);
                });
        });
    }
    public updatefeature(data): any {
        const body: string = JSON.stringify(data);

        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json-patch+json');
        //requestHeaders.append('method', 'PATCH');

        const httpClientOptions: IHttpClientOptions = {
            body: body,
            headers: requestHeaders,
            method: 'PATCH'
        };
        this._aadHttpClientFactory.getClient("499b84ac-1321-427f-aa17-267ca6975798").then((client: AadHttpClient) => {
            client.fetch("https://dev.azure.com/onegdcanalyticsdev/Operational%20Framework/_apis/wit/workItems/170?api-version=6.0", AadHttpClient.configurations.v1, httpClientOptions)
                .then((response: HttpClientResponse) => {
                    return response.json();
                })
                .then((projects: any): void => {
                    console.log(["update Try", projects]);
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
            this._aadHttpClientFactory.getClient("499b84ac-1321-427f-aa17-267ca6975798").then((client: AadHttpClient) => {
                client.post("https://dev.azure.com/onegdcanalyticsdev/_apis/wit/attachments?fileName=" + fileName + "&api-version=5.1", AadHttpClient.configurations.v1, httpClientOptions)
                    .then((response: HttpClientResponse) => {

                        return response.json();

                    }).then((res: any): void => {
                        console.log(["upload attchment"], res.url);
                        resolve(res.url);
                        // return promise;
                    });
            });

        });
        // let promise = new Promise((resolve,reject));
    }

    public async SearchWorkItems(): Promise<any> {
        const body: string = JSON.stringify({
            "searchText": "test",
            "$skip": 0,
            "$top": 1,
            "filters": {
                "System.TeamProject": [
                    "test proj"
                ],
                //   "System.AreaPath": [
                //     "GDC Business Intelligence"
                //   ],
                "System.WorkItemType": [
                    "L1 Objective"
                ]
                //   "System.Created By": [
                //     "Veena Garre <veena@mcompany5.onmicrosoft.com>"
                //   ]
            },
            "$orderBy": [
                {
                    "field": "system.id",
                    "sortOrder": "ASC"
                }
            ]
            // "includeFacets": true
        });
        return new Promise<any>((resolve: (response: any) => void, reject: (response: any) => void): void => {
            // const body: string = JSON.stringify(body);

            const requestHeaders: Headers = new Headers();
            requestHeaders.append('Content-type', 'application/json');

            const httpClientOptions: IHttpClientOptions = {
                body: body,
                headers: requestHeaders
            };
            this._aadHttpClientFactory.getClient("499b84ac-1321-427f-aa17-267ca6975798").then((client: AadHttpClient) => {
                client.post("https://almsearch.dev.azure.com/Veena0200/_apis/search/workitemsearchresults?api-version=6.0-preview.1", AadHttpClient.configurations.v1, httpClientOptions)
                    .then((response: HttpClientResponse) => {
                        // console.log(["search Try1", response]);
                        return response.json();
                    })
                    .then((datar: any): void => {
                        console.log(["search Try1", datar]);
                        resolve(datar);
                    });
            });
        });
    }

    public async FilterWorkItems(): Promise<any> {
        const body: string = JSON.stringify({
            "query": "Select [System.Id], [System.Title], [System.State] From WorkItems Where [System.WorkItemType] = 'L1 Objective' "
        });
        return new Promise<any>((resolve: (response: any) => void, reject: (response: any) => void): void => {

            const requestHeaders: Headers = new Headers();
            requestHeaders.append('Content-type', 'application/json');

            const httpClientOptions: IHttpClientOptions = {
                body: body,
                headers: requestHeaders
            };
            this._aadHttpClientFactory.getClient("499b84ac-1321-427f-aa17-267ca6975798").then((client: AadHttpClient) => {
                client.post("https://dev.azure.com/Veena0200/test proj/_apis/wit/wiql?api-version=6.0", AadHttpClient.configurations.v1, httpClientOptions)
                    .then((response: HttpClientResponse) => {
                        console.log(["Filter Try1", response]);
                        return response.json();
                    })
                    .then((datar: any): void => {
                        console.log(["Filter Try1", datar]);
                        client.get("https://dev.azure.com/Veena0200/test proj/_apis/wit/workItems/269/updates?api-version=6.0", AadHttpClient.configurations.v1)
                            .then((responser: HttpClientResponse) => {
                                console.log(["updates Try1", responser]);
                                return responser.json();
                            })
                            .then((datarr: any): void => {
                                let value = datarr.value[0].fields;
                                let td = "System.Title";
                                let v = value[td];
                                console.log(["updates Try1", value]);
                                resolve(datarr);
                            });
                    });
            });
        });
    }
}