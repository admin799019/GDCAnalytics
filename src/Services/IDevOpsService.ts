export interface IDevOpsService {
    getProjects1(): Promise<any>;
    adduserstory(data): Promise<any>;
    uploadImage(base64content, fileName): Promise<any>;
    addAttachment(data,id): any;
    getTeamDetails(team: string): Promise<any>;
}