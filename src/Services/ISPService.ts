export interface ISPService {
    getFormMetadata(type) : Promise<any>;
    getOfficeUsers(name): Promise<any>;
}