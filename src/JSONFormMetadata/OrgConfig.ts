const Demo = {
    DevOpsID: "499b84ac-1321-427f-aa17-267ca6975798",
    SharePointSiteUrl: "https://m365x799019.sharepoint.com/sites/GDCAnalytics",
    SharePointSiteName: "GEPAnalyticsTest",
    instrumentationKey: "d226b88e-1d15-4ca7-a0be-9528d60f790a"
};

const Test = {
    DevOpsID: "499b84ac-1321-427f-aa17-267ca6975798",
    SharePointSiteUrl: "https://m365x799019.sharepoint.com/sites/GEPAnalyticsTest",
    SharePointSiteName: "GDCAnalytics",
    instrumentationKey: "d226b88e-1d15-4ca7-a0be-9528d60f790a"
};

const ProdTest = {
    DevOpsID: "499b84ac-1321-427f-aa17-267ca6975798",
    SharePointSiteUrl: "https://m365x037651.sharepoint.com/sites/GDCAnalytics",
    SharePointSiteName: "GDCAnalytics",
    instrumentationKey: "d226b88e-1d15-4ca7-a0be-9528d60f790a"
};

const Prod = {
    DevOpsID: "499b84ac-1321-427f-aa17-267ca6975798",
    SharePointSiteUrl: "https://microsoft.sharepoint.com/teams/GDCAnalyticsCentral",
    SharePointSiteName: "GDCAnalyticsCentral",
    instrumentationKey: ""
};

export var OrganizationConfig = Test;

export class OrganizationConfiguration {
    constructor() {
        OrganizationConfig = Test;
    }
    public static setOrg(siteUrl) {
        if ("https://microsoft.sharepoint.com/teams/GDCAnalyticsCentral".indexOf(siteUrl) === 0) {
            console.log("prod");
            OrganizationConfig = Prod;
        }
        else if ("https://m365x037651.sharepoint.com/sites/GDCAnalytics".indexOf(siteUrl) === 0) {
            console.log("prod test");
            OrganizationConfig = ProdTest;
        }
        else if ("https://m365x799019.sharepoint.com/sites/GDCAnalytics".indexOf(siteUrl) === 0) {
            OrganizationConfig = Demo;
            console.log("demo");
        }
        else if ("https://m365x799019.sharepoint.com/sites/GEPAnalyticsTest".indexOf(siteUrl) === 0) {
            OrganizationConfig = Test;
            console.log("test");
        }
        else
            OrganizationConfig = Test;
    }
}
