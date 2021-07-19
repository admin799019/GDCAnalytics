export interface IDevOpsService {
    getProjects1(): Promise<any>;
    addfeature(data): Promise<any>;
    updatefeature(text: any): any;
    uploadImage(base64content, fileName): Promise<any>;
    FilterWorkItems(): Promise<any>;
    SearchWorkItems(): Promise<any>;
    getLatestVer(id):Promise<any>;
}