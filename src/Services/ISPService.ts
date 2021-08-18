export interface ISPService {
    getFormMetadata(type) : Promise<any>;
    getEmailData(Team, Area, PODCategory) : Promise<any>;
    getOfficeUsers(name): Promise<any>;
    sendEmail(emaildata,formData);
    getAreasList() : Promise<any>;
}