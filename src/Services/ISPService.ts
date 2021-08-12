export interface ISPService {
    getFormMetadata(type) : Promise<any>;
    getEmailData(Area) : Promise<any>;
    getOfficeUsers(name): Promise<any>;
    sendEmail(emaildata1,title,date,area, emails, Url);
    getAreasList() : Promise<any>;
}