export interface IDevOpsService {
    //getProjects1(): Promise<any>;
    addUserStory(data,devopsprojecturl): Promise<any>;
    uploadImage(base64content, fileName,OrganizationUrl): Promise<any>;
    addAttachment(data,id,devopsprojecturl): any;
   // getTeamDetails(team: string): Promise<any>;
}