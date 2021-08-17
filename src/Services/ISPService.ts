export interface ISPService {
    getFormMetadata(type) : Promise<any>;
    getEmailData(Area) : Promise<any>;
    getOfficeUsers(name): Promise<any>;
    sendEmail(emaildata,formData);
    getAreasList() : Promise<any>;
}