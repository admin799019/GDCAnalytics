export const metaData = [];

const BusinessAnalyticsMetaData = [
    {
        "id": "Area",
        "fieldType": "SingleSelectInput",
        "label": "What area of Business Analytics & Insights is your request for?",
        "placeholder": "Select an option",
        "className": "gdcGridCol gdcGridCol6 gdcFieldSeperateRow",
        "options": [
            {
                "key": "Business Analytics and Insights",
                "text": "Business Analytics and Insights"
            },
            {
                "key": "Acquisition Analytics",
                "text": "Acquisition Analytics"
            },
            {
                "key": "Lifecycle Programs Analytics",
                "text": "Lifecycle Programs Analytics"
            },
            {
                "key": "Customer Advocacy Analytics",
                "text": "Customer Advocacy Analytics"
            },
            {
                "key": "Events and Skilling Analytics",
                "text": "Events and Skilling Analytics"
            },
            {
                "key": "Lead Funnel Health",
                "text": "Lead Funnel Health"
            },
            {
                "key": "Demand Response",
                "text": "Demand Response"
            },
            {
                "key": "Acct Based Marketing Analytics",
                "text": "Acct Based Marketing Analytics"
            },
            {
                "key": "Partner Analytics",
                "text": "Partner Analytics"
            },
            {
                "key": "Relationship Marketing Analytics",
                "text": "Relationship Marketing Analytics"
            }
        ],
        "value": "",
        "helperText": "If unsure, select Business Analytics & Insights",
        "required": true,
        "errorMessage": "Please select area",
        "devopsName": "System.AreaPath",
        "subFields": [
            {
                "option": "Relationship Marketing Analytics",
                "fields": [
                    {
                        "id": "PODCategory",
                        "fieldType": "SingleSelectInput",
                        "label": "POD Category",
                        "placeholder": "Select an option",
                        "className": "gdcGridCol gdcGridCol6",
                        "options": [
                            {
                                "key": "All PODs",
                                "text": "All PODs"
                            },
                            {
                                "key": "Azure",
                                "text": "Azure"
                            },
                            {
                                "key": "BizApps",
                                "text": "BizApps"
                            },
                            {
                                "key": "Commercial",
                                "text": "Commercial"
                            }
                        ],
                        "value": "",
                        "required": true,
                        "errorMessage": "",
                        "devopsName": "Custom.RMPODCategory"
                    },
                    {
                        "id": "PODName",
                        "fieldType": "SingleSelectCascadingInput",
                        "cascadingField": "PODCategory",
                        "placeholder": "Select an option",
                        "label": "POD Name",
                        "options": [
                            {
                                "key": "All",
                                "text": "All",
                                "cascadingOption": "All PODs"
                            },
                            {
                                "key": "Azure Consumption",
                                "text": "Azure Consumption",
                                "cascadingOption": "Azure"
                            },
                            {
                                "key": "Azure Free Account Activation/Conversion",
                                "text": "Azure Free Account Activation/Conversion",
                                "cascadingOption": "Azure"
                            },
                            {
                                "key": "Azure Marketplace",
                                "text": "Azure Marketplace",
                                "cascadingOption": "Azure"
                            },
                            {
                                "key": "Azure Onboarding",
                                "text": "Azure Onboarding",
                                "cascadingOption": "Azure"
                            },
                            {
                                "key": "Azure Retention",
                                "text": "Azure Retention",
                                "cascadingOption": "Azure"
                            },
                            {
                                "key": "Azure Upsell/Xsell",
                                "text": "Azure Upsell/Xsell",
                                "cascadingOption": "Azure"
                            },
                            {
                                "key": "Azure X-POD",
                                "text": "Azure X-POD",
                                "cascadingOption": "Azure"
                            },
                            {
                                "key": "Power BI",
                                "text": "Power BI",
                                "cascadingOption": "BizApps"
                            },
                            {
                                "key": "Dynamics 365",
                                "text": "Dynamics 365",
                                "cascadingOption": "BizApps"
                            },
                            {
                                "key": "PowerApps",
                                "text": "PowerApps",
                                "cascadingOption": "BizApps"
                            },
                            {
                                "key": "PowerAutomate",
                                "text": "PowerAutomate",
                                "cascadingOption": "BizApps"
                            },
                            {
                                "key": "DevOps",
                                "text": "DevOps",
                                "cascadingOption": "Azure"
                            },
                            {
                                "key": "Comm_All",
                                "text": "Comm_All",
                                "cascadingOption": "Commercial"
                            },
                            {
                                "key": "Comm_ODB",
                                "text": "Comm_ODB",
                                "cascadingOption": "Commercial"
                            },
                            {
                                "key": "Comm_Teams",
                                "text": "Comm_Teams",
                                "cascadingOption": "Commercial"
                            },
                            {
                                "key": "Comm_Onb_Usage",
                                "text": "Comm_Onb_Usage",
                                "cascadingOption": "Commercial"
                            },
                            {
                                "key": "Comm_Trial",
                                "text": "Comm_Trial",
                                "cascadingOption": "Commercial"
                            },
                            {
                                "key": "Comm_Renewal",
                                "text": "Comm_Renewal",
                                "cascadingOption": "Commercial"
                            }
                        ],
                        "className": "gdcGridCol gdcGridCol6",
                        "value": "",
                        "required": true,
                        "errorMessage": "",
                        "devopsName": "Custom.RMPODName"
                    }
                ],
                "active": false
            }
        ]
    },
    {
        "id": "RequestTitle",
        "fieldType": "SingleLineTextInput",
        "label": "Request Title",
        "placeholder": "Enter your text here",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Title"
    },
    {
        "id": "DetailedRequirements",
        "fieldType": "MultiLineTextInput",
        "placeholder": "Enter your text here",
        "label": "Please provide detailed requirements for this request.",
        "className": "gdcGridCol gdcGridCol12",
        "defaultValue": "<p><strong>Please supply the business/strategic question(s) you are seeking to answer with this request. (what questions are you trying to answer) </strong></p><p></br></p><p></br></p><p><strong>Objective: What will the output of this analysis, metrics, or report enable you to do/understand better or differently? </strong></p><p></br></p><p></br></p><p><strong>Hypothesis: If applicable, please provide a hypothesis statement to ground the analytics exploration and help provide the analyst with a point to work from. </strong></p><p></br></p><p></br></p><p><strong>What is the reach or surface area of this request? (How many people might consume this information/report) </strong></p><p></br></p><p></br></p><p><strong>What do we need to consider to support this request: data (fields, dimensions); time horizon (e.g. last 6, 12, or 18 months; trailing 12 months); what is the frequency you need this available for: 1x, weekly, monthly, quarterly </strong></p><p></br></p><p></br></p>",
        "value": "",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Description"
    },
    {
        "id": "BusinessImpact",
        "fieldType": "MultiLineTextInput",
        "placeholder": "Enter your text here",
        "label": "What is the business impact if this work is not done?",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Description"
    },
    {
        "id": "BusinessObjective",
        "fieldType": "SingleLineTextInput",
        "placeholder": "Enter your text here",
        "label": "What business objective are you trying to achieve?",
        "className": "gdcGridCol gdcGridCol6",
        "value": "",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Description",
        "helperText": "Add business objective test"
    },
    {
        "id": "Related Report Link(s)",
        "fieldType": "MultiLineTextInput",
        "placeholder": "Enter your text here",
        "label": "If this request is related to an existing report, please provide link to that report here.",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "required": false,
        "helperText": "Provide links to relevant reports",
        "errorMessage": "Field is required",
        "devopsName": "Custom.ReportRequestType"
    },
    {
        "id": "NeedByDate",
        "fieldType": "DateInput",
        "label": "Need By Date",
        "className": "gdcGridCol gdcGridCol6",
        "placeholder": "Select the date",
        "value": "",
        "required": false,
        "helperText": "This date will be used to help us prioritize your request and will not be automatically committed to",
        "errorMessage": "Field is required",
        "devopsName": "Custom.NeedByDate"
    },
    {
        "id": "Attachments",
        "fieldType": "FileInput",
        "label": "Please attach any supporting artifacts here",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "placeholder": "Please attach any supporting artifacts here",
        "required": false,
        "errorMessage": "",
        "devopsName": "Attachments",
        "files": []
    }
];

const DataServicesmetaData = [
    {
        "id": "RequestType",
        "fieldType": "RadioButtonInput",
        "label": "What type of request is this?",
        "placeholder": "Select an option",
        "className": "gdcGridCol gdcGridCol6 gdcFieldSeperateRow",
        "helperText": "",
        "options": [
            { "key": "Data Platform Development Request", "text": "Data Platform Development Request" },
            { "key": "Support Needed", "text": "Support Needed" }
        ],
        "value": "",
        "required": true,
        "errorMessage": "Please choose request field type",
        "devopsName": "Custom.WhatTypeOfRequestIsThis",
        "subFields": [
            {
                "option": "Data Platform Development Request",
                "fields": [
                    {
                        "id": "RequestTitle",
                        "fieldType": "SingleLineTextInput",
                        "label": "Request Title",
                        "placeholder": "Enter your text here",
                        "helperText": "Input Requirement/Request Title",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Title"
                    },
                    {
                        "id": "Objective",
                        "fieldType": "MultiLineTextInput",
                        "label": "Objective",
                        "placeholder": "Enter your text here",
                        "helperText": "Input what you are trying to accomplish. (e.g. As a GDC Analyst, I want to be able to  measure...)",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "ProblemStatement",
                        "fieldType": "MultiLineTextInput",
                        "placeholder": "Enter your text here",
                        "label": "Problem Statement",
                        "helperText": "Input how you are accomplishing this today. Do any workaround exist? What is stopping you form achieving your objective(s) today?",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "BusinessValue",
                        "fieldType": "MultiLineTextInput",
                        "label": "Business Value",
                        "placeholder": "Enter your text here",
                        "helperText": "<div>What is the Business value of this request? Consider the impact on financial results and/or operational efficiency. Key value indicators to consider include:<ul><li>Improve process/operations</li><li>Improve spending decisions (media spend, social, campaign effectiveness, etc.)</li><li>Increase in revenue (conversion rate, # wins, funnel velocity, etc.)</li><li>Breadth and/or depth of improve analysis</li></ul></div>",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "UseCases",
                        "fieldType": "MultiLineTextInput",
                        "label": "Use Cases",
                        "placeholder": "Enter your text here",
                        "helperText": "What are the different ways that end users will use the data?",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "DesiredOutput",
                        "fieldType": "MultiLineTextInput",
                        "label": "Desired Output",
                        "placeholder": "Enter your text here",
                        "helperText": "Where do you expect to see this land? Data mart, cube, dashboard, etc. While we will do everything we can to meet user's needs, we reserve the right to make decisions that best meet the overall needs of the business vs. a specific user.",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "BusinessRules",
                        "fieldType": "MultiLineTextInput",
                        "label": "Business Rules",
                        "placeholder": "Enter your text here",
                        "helperText": "Input metric definitions, business logic, etc.",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "SuccessCriteria",
                        "fieldType": "MultiLineTextInput",
                        "label": "Success Criteria",
                        "placeholder": "Enter your text here",
                        "helperText": "Input any success criteria for final sign off.",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "Microsoft.VSTS.Common.AcceptanceCriteria"
                    },
                    {
                        "id": "OutputFrequency",
                        "fieldType": "MultiLineTextInput",
                        "label": "Output Frequency",
                        "placeholder": "Enter your text here",
                        "helperText": "Input how frequently this information needs to be refreshed. While we will do everything we can to meet user's needs, we reserve the right to make decisions that best meet the overall needs of the business vs. a specific user.",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "DataDefinition",
                        "fieldType": "MultiLineTextInput",
                        "label": "Data Definition",
                        "placeholder": "Enter your text here",
                        "helperText": "If new fields are being created as a result of this request, please provide a definition for us to include in the data mart documentation.",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "RequestMaturity",
                        "fieldType": "MultiLineTextInput",
                        "label": "Request Maturity",
                        "placeholder": "Enter your text here",
                        "helperText": "Clarify the level of maturity of the request. Has the business logic and/or metric definitions already been in use? Is there an incubation effort or proof of concept to refer to, or is there still uncertainty around this? Provide assumptions, limitations, and/or dependencies along with context here.",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "NeedByDate",
                        "fieldType": "DateInput",
                        "label": "Need By Date",
                        "placeholder": "Select the date",
                        "helperText": "This date will be used to help us prioritize your request and will not be automatically committed to",
                        "className": "gdcGridCol gdcGridCol6",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "Custom.NeedByDate"
                    },
                    {
                        "id": "Attachments",
                        "fieldType": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "placeholder": "Implementation Guidance (Attachments)",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "Attachments",
                        "files": []
                    }
                ],
                "active": false
            },
            {
                "option": "Support Needed",
                "fields": [
                    {
                        "id": "RequestUrgent",
                        "fieldType": "SwitchInput",
                        "label": "Is this request urgent?",
                        "placeholder": "",
                        "className": "gdcGridCol gdcGridCol6",
                        "helperText": "MuSwitchInput",
                        "options": [
                            { "onText": "Urgent" },
                            { "offText": "Not Urgent" }
                        ],
                        "value": "false",
                        "required": false,
                        "errorMessage": "",
                        "checked": false,
                        "devopsName": "Custom.IsThisRequestUrgent"
                    },
                    {
                        "id": "RequestTitle",
                        "fieldType": "SingleLineTextInput",
                        "label": "Issue Title",
                        "placeholder": "Enter your text here",
                        "helperText": "Input issue title",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "hasDependency": true,
                        "dependentField": "RequestUrgent",
                        "dependentFieldValue": true,
                        "textToAppend": "URGENT | ",
                        "devopsName": "System.Title"
                    },
                    {
                        "id": "DescriptionOfIssue",
                        "fieldType": "MultiLineTextInput",
                        "label": "Description of Issue",
                        "placeholder": "Enter your text here",
                        "helperText": "Please describe the issue in as much detail as possible, steps to reproduce the issue, how/when you identified the issue and what steps have you tried to troubleshoot, including screenshots or artifacts like pivot or SQL query",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "BusinessImpact",
                        "fieldType": "MultiLineTextInput",
                        "label": "Business Impact",
                        "placeholder": "Enter your text here",
                        "helperText": "How has business been impacted from this issue? Is there a workaround or is it blocking your work?",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "ExpectedResults",
                        "fieldType": "MultiLineTextInput",
                        "label": "Expected Results",
                        "placeholder": "Enter your text here",
                        "helperText": "Please describe expected results to accept the fix for this issue, sample data would be helpful.",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "id": "NeedByDate",
                        "fieldType": "DateInput",
                        "label": "Need By Date",
                        "className": "gdcGridCol gdcGridCol6",
                        "placeholder": "Select the date",
                        "value": "",
                        "required": false,
                        "helperText": "This date will be used to help us prioritize your request and will not be automatically committed to",
                        "errorMessage": "Field is required",
                        "devopsName": "Custom.NeedByDate"
                    },
                    {
                        "id": "Attachments",
                        "fieldType": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "placeholder": "Implementation Guidance (Attachments)",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "Attachments",
                        "files": []
                    }
                ],
                "active": false
            }
        ]
    }
];

const MEI = [
    {
        "id": "RequestTitle",
        "fieldType": "SingleLineTextInput",
        "label": "Request Title",
        "placeholder": "Enter your text here",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Title"
    },
    {
        "id": "DetailedRequirements",
        "fieldType": "MultiLineTextInput",
        "placeholder": "Enter your text here",
        "label": "Please provide detailed requirements for this request.",
        "defaultValue": "<p><strong>Help us understand how we may help you accomplish what you're trying to do. Briefly explain your primary and/or secondary business objectives or current problems your facing  (e.g. Primarily drive customer adds. Secondarily understand ACR) </strong></p><p></br></p><p></br></p><p><strong>How will you use the output of this work to better drive or understand the above? </strong></p><p></br></p><p></br></p><p><strong>How many users does this request affect? (myself, my area/subsidiary or all users) </strong></p><p></br></p><p></br></p><p><strong>What is the scope of the impact of your request? </strong></p><p></br></p><p></br></p>",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Description"
    },
    {
        "id": "BusinessImpact",
        "fieldType": "MultiLineTextInput",
        "placeholder": "Enter your text here",
        "label": "What is the business impact if this work is not done?",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Description"
    },
    {
        "id": "ReportRequestType",
        "fieldType": "MultiLineTextInput",
        "placeholder": "Enter your text here",
        "label": "If this request is related to an existing report, please provide link to that report here.",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "required": false,
        "helperText": "Provide links to relevant reports",
        "errorMessage": "Field is required",
        "devopsName": "Custom.ReportRequestType"
    },
    {
        "id": "NeedByDate",
        "fieldType": "DateInput",
        "label": "Need By Date",
        "className": "gdcGridCol gdcGridCol6",
        "placeholder": "Select the date",
        "value": "",
        "required": false,
        "helperText": "This date will be used to help us prioritize your request and will not be automatically committed to",
        "errorMessage": "Field is required",
        "devopsName": "Custom.NeedByDate"
    },
    {
        "id": "Attachments",
        "fieldType": "FileInput",
        "label": "Please attach any supporting artifacts here",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "placeholder": "Please attach any supporting artifacts here",
        "required": false,
        "errorMessage": "",
        "devopsName": "Attachments",
        "files": []
    }
];

const TaregetingEnablementandBusinessHealth = [
    {
        "id": "Tools",
        "fieldType": "SingleSelectInput",
        "label": "What tool is your request for?",
        "placeholder": "Select an option",
        "className": "gdcGridCol gdcGridCol6 gdcFieldSeperateRow",
        "options": [
            {
                "key": "AGT",
                "text": "AGT"
            },
            {
                "key": "AHR",
                "text": "AHR"
            },
            {
                "key": "BAT",
                "text": "BAT"
            },
            {
                "key": "BAPR",
                "text": "BAPR"
            }
        ],
        "value": "",
        "required": true,
        "errorMessage": "Please select area",
        "devopsName": "System.AreaPath"
    },
    {
        "id": "RequestTitle",
        "fieldType": "SingleLineTextInput",
        "label": "Request Title",
        "placeholder": "Enter your text here",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "required": true,
        "helperText": "Please Enter the Title of your Request",
        "errorMessage": "Field is required",
        "devopsName": "System.Title"
    },
    {
        "id": "DetailedRequirements",
        "fieldType": "MultiLineTextInput",
        "placeholder": "Enter your text here",
        "label": "Please provide detailed requirements for this request.",
        "className": "gdcGridCol gdcGridCol12",
        "defaultValue": "<p><strong>Please supply the business/strategic question(s) you are seeking to answer with this request. (what questions are you trying to answer) </strong></p><p></br></p><p></br></p><p><strong>Objective: What will the output of this analysis, metrics, or report enable you to do/understand better or differently? </strong></p><p></br></p><p></br></p><p><strong>Hypothesis: If applicable, please provide a hypothesis statement to ground the analytics exploration and help provide the analyst with a point to work from. </strong></p><p></br></p><p></br></p><p><strong>How many users does this request affect? (myself, my area/subsidiary or all users) </strong></p><p></br></p><p></br></p><p><strong>What do we need to consider to support this request: data (fields, dimensions); time horizon (e.g. last 6, 12, or 18 months; trailing 12 months); what is the frequency you need this available for: 1x, weekly, monthly, quarterly </strong></p><p></br></p><p></br></p>",
        "value": "",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Description"
    },
    {
        "id": "BusinessImpact",
        "fieldType": "MultiLineTextInput",
        "placeholder": "Enter your text here",
        "label": "What is the business impact if this work is not done?",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Description"
    },
    {
        "id": "BusinessObjective",
        "fieldType": "SingleLineTextInput",
        "placeholder": "Enter your text here",
        "label": "What business objective are you trying to achieve?",
        "className": "gdcGridCol gdcGridCol6",
        "value": "",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Description"
    },
    {
        "id": "ReportRequestType",
        "fieldType": "MultiLineTextInput",
        "placeholder": "Enter your text here",
        "label": "If this request is related to an existing report, please provide link to that report here.",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "required": false,
        "helperText": "Provide links to relevant reports",
        "errorMessage": "Field is required",
        "devopsName": "Custom.ReportRequestType"
    },
    {
        "id": "NeedByDate",
        "fieldType": "DateInput",
        "label": "Need By Date",
        "className": "gdcGridCol gdcGridCol6",
        "placeholder": "Select the date",
        "value": "",
        "required": false,
        "helperText": "This date will be used to help us prioritize your request and will not be automatically committed to",
        "errorMessage": "Field is required",
        "devopsName": "Custom.NeedByDate"
    },
    {
        "id": "Attachments",
        "fieldType": "FileInput",
        "label": "Please attach any supporting artifacts here",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "placeholder": "Please attach any supporting artifacts here",
        "required": false,
        "errorMessage": "",
        "devopsName": "Attachments",
        "files": []
    }
];

const defaultMetaData = {
    muCheckboxInput: {
        fieldType: "MuCheckboxInput",
        label: "muCheckboxInput",
        disabled: false,
        className: "fields",
        readOnly: false,
        values: null,
        validation: "required"
    },
    muDateInput: {
        fieldType: "MuDateInput",
        label: "muDateInput",
        helperText: "muDateInput",
        disabled: false,
        className: "fields",
        readOnly: false,
        values: null,
        validation: "required"
    },
    muDateTimeInput: {
        fieldType: "MuDateTimeInput",
        label: "muDateTimeInput",
        className: "fields",
        helperText: "muDateTimeInput",
        values: null,
    },
    muMultipleSelectInput: {
        fieldType: "MuMultipleSelectInput",
        label: "muMultipleSelectInput",
        placeholder: "",
        className: "fields",
        helperText: "Date of Birth",
        values: [
            {
                label: "cricket",
                value: "cricket"
            },
            {
                label: "vollyball",
                value: "vollyball"
            }
        ]
    },
    muNumberInput: {
        fieldType: "MuNumberInput",
        label: "muNumberInput",
        placeholder: "",
        className: "fields",
        helperText: "muNumberInput",
        values: null,
        validation: "required|min:18",

    },
    muRadioInput: {
        fieldType: "MuRadioInput",
        label: "muRadioInput",
        placeholder: "",
        className: "fields",
        values: [
            {
                label: "male",
                value: "male"
            },
            {
                label: "female",
                value: "female"
            }
        ],
    },
    muSelectInput: {
        fieldType: "MuSelectInput",
        label: "muSelectInput",
        placeholder: "",
        className: "fields",
        helperText: "radio",
        values: [
            {
                label: "male",
                value: "male"
            },
            {
                label: "female",
                value: "female"
            }
        ],
        validation: "required"
    },
    muSwitchInput: {
        fieldType: "MuSwitchInput",
        label: "muSwitchInput",
        placeholder: "",
        className: "fields",
        helperText: "MuSwitchInput",
        values: null
    },
    muTextAreaInput: {
        fieldType: "MuTextAreaInput",
        label: "muTextAreaInput",
        placeholder: "",
        className: "fields",
        helperText: "muTextAreaInput",
        validation: "required"
    },
    muTextInput: {
        fieldType: "MuTextInput",
        label: "muTextInput",
        placeholder: "",
        helperText: "muTextInput",
        className: "fields"
    },
    muTimeInput: {
        fieldType: "MuTimeInput",
        label: "muTimeInput",
        placeholder: "",
        helperText: "muTimeInput",
        className: "fields"
    }
};
