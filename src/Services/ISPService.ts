export interface ISPService {
    getFormMetadata(type) : Promise<any>;
    getOfficeUsers(name): Promise<any>;
    sendEmail(title,date,area, emails, Url);
    getAreasList() : Promise<any>;
}