
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

let ai;
let appInsights = null;
let CurrentLoginName;
let telemetryContext;

export default class AppInsights {
    public static InitializeAppInsights(instrumentationKey) {
        try {
            if (instrumentationKey != "") {
                ai = new ApplicationInsights({
                    config: {
                        instrumentationKey: instrumentationKey,
                    }
                });
                ai.loadAppInsights();
                appInsights = ai.appInsights;
                appInsights.AutoCollectDependencies = false;
                telemetryContext = ai.context;
            }
        } catch (ex) {
            appInsights = null;
            console.error(ex);
        }
    }

    public static trackException(ex, properties) {
        try {
            if (appInsights != null) {
                properties.UserId = CurrentLoginName;
                appInsights.trackException({ exception: ex, properties: properties });
            }
        } catch (error) {
            console.error(error);
        }
    }
}