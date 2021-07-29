export const metaData = [

    // {
    //     "field": "Is this Request Urgent",
    //     "fieldType": "SwitchInput",
    //     "label": "Is this Request Urgent",
    //     "placeholder": "",
    //     "className": "fields",
    //     "helperText": "MuSwitchInput",
    //     "options": null,
    //     "value": ""
    // }
];

const ChannelAnalyticsMetaData = [
    {
        "field": "What area of Channel Analytics is your request for?",
        "fieldType": "SingleSelectInput",
        "label": "What area of Channel Analytics is the request for?",
        "placeholder":"Select an option",
        "className": "gdcGridCol gdcGridCol6 gdcFieldSeperateRow",
        "options": [
            {
                "key": "Operational Framework\\Channel Analytics\\Demand Response",
                "text": "Demand Response"
            },
            {
                "key": "Operational Framework\\Channel Analytics\\Global Programs",
                "text": "Global Programs"
            },
            {
                "key": "Operational Framework\\Channel Analytics\\Partner",
                "text": "Partner"
            },
            {
                "key": "Operational Framework\\Channel Analytics\\Paid Acquisition",
                "text": "Paid Acquisition"
            },
            {
                "key": "Operational Framework\\Channel Analytics\\GEP Analytics",
                "text": "GEP Analytics"
            },
            {
                "key": "Operational Framework\\Channel Analytics\\LFQ",
                "text": "LFQ"
            },
            {
                "key": "Operational Framework\\Channel Analytics\\Relationship Marketing",
                "text": "Relationship Marketing"
            }
        ],
        "value": "",
        "required": true,
        "errorMessage": "Please select area",
        "devopsName": "System.AreaPath",
        "subFields": [
            {
                "option": "Operational Framework\\Channel Analytics\\Relationship Marketing",
                "fields": [
                    {
                        "field": "POD Category",
                        "fieldType": "SingleSelectInput",
                        "label": "POD Category",
                        "placeholder":"Select an option",
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
                                "key": "M365 Commercial",
                                "text": "M365 Commercial"
                            }
                        ],
                        "value": "",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "Custom.RMPODCategory"
                    },
                    {
                        "field": "POD Name",
                        "fieldType": "SingleSelectCascadingInput",
                        "cascadingField": "POD Category",
                        "placeholder":"Select an option",
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
                                "key": "M365_All",
                                "text": "M365_All",
                                "cascadingOption": "M365 Commercial"
                            },
                            {
                                "key": "M365_ODB",
                                "text": "M365_ODB",
                                "cascadingOption": "M365 Commercial"
                            },
                            {
                                "key": "M365_Teams",
                                "text": "M365_Teams",
                                "cascadingOption": "M365 Commercial"
                            },
                            {
                                "key": "Comm_Onb_Usage",
                                "text": "Comm_Onb_Usage",
                                "cascadingOption": "M365 Commercial"
                            },
                            {
                                "key": "Comm_Trial",
                                "text": "Comm_Trial",
                                "cascadingOption": "M365 Commercial"
                            },
                            {
                                "key": "Comm_Renewal",
                                "text": "Comm_Renewal",
                                "cascadingOption": "M365 Commercial"
                            }
                        ],
                        "className": "gdcGridCol gdcGridCol6",
                        "value": "",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "Custom.RMPODName"
                    }
                ],
                "active": false
            }
        ]
    },
    {
        "field": "What fieldType of request is this?",
        "fieldType": "RadioButtonInput",
        "label": "What Type of request is this?",
        "className": "gdcGridCol gdcGridCol6 gdcBottomLine",
        "options": [
            {
                "key": "Ask an Expert",
                "text": "Ask an Expert"
            },
            {
                "key": "Report Request",
                "text": "Report Request"
            }
        ],
        "value": "",
        "required": true,
        "errorMessage": "Request fieldType is required",
        "devopsName": "Custom.RequestfieldType",
        "subFields": [
            {
                "option": "Ask an Expert",
                "fields": [
                    {
                        "field": "Request Title",
                        "fieldType": "SingleLineTextInput",
                        "label": "Request Title",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "helperText":"Please Enter the Title of your Request",
                        "required": true,
                        "errorMessage": "Request Title is required",
                        "devopsName": "System.Title"
                    },
                    {
                        "field": "What is the business question you are trying to answer?",
                        "fieldType": "MultiLineTextInput",
                        "placeholder":"Enter the text here",
                        "label": "What is the business question you are trying to answer?",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "What is the priority of your request?",
                        "fieldType": "SingleSelectInput",
                        "label": "What is the priority of your request?",
                        "placeholder":"Select an option",
                        "className": "gdcGridCol gdcGridCol6",
                        "options": [
                            {
                                "key": "Priority 1: Urgent and important - must have ASAP",
                                "text": "Priority 1: Urgent and important - must have ASAP",
                                "color": "#ff5a5a"
                            },
                            {
                                "key": "Priority 2: Not urgent but important - must have",
                                "text": "Priority 2: Not urgent but important - must have",
                                "color": "#faaa4c"
                            },
                            {
                                "key": "Priority 3: Low priority - nice to have",
                                "text": "Priority 3: Low priority - nice to have",
                                "color": "#6ef1c2"
                            }
                        ],
                        "value": "",
                        "required": true,
                        "errorMessage": "Priority is required",
                        "devopsName": "Custom.RequestedPriority"
                    },

                    {
                        "field": "Requested Completion Date",
                        "fieldType": "DateInput",
                        "label": "Requested Completion Date",
                        "className": "gdcGridCol gdcGridCol6",
                        "placeholder":"Select the date",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Are there any other details or dependencies that the team should be aware of?",
                        "fieldType": "MultiLineTextInput",
                        "label": "Are there any other details or dependencies that the team should be aware of?",
                        "className": "gdcGridCol gdcGridCol12",
                        "placeholder":"Enter the text here",
                        "helperText":"You can inlcude any information,details or any dependencies for the team  ",
                        "value": "",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Please provide attachments or screenshots to support your request",
                        "fieldType": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
                        "placeholder":"Add attachment",
                        "value": "",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "Attachments"
                    }
                ],
                "active": false
            },
            {
                "option": "Report Request",
                "fields": [
                    {
                        "field": "Request Title",
                        "fieldType": "SingleLineTextInput",
                        "label": "Request Title",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "helperText":"Please Enter the Title of your Request",
                        "errorMessage": "Request Title is required",
                        "devopsName": "System.Title"
                    },
                    {
                        "field": "Please provide detailed requirements for this request.",
                        "fieldType": "MultiLineTextInput",
                        "placeholder":"Enter the text here",
                        "label": "Please provide detailed requirements for this request.",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },

                    {
                        "field": "What is the business impact if this request is not committed?",
                        "fieldType": "MultiLineTextInput",
                        "placeholder":"Enter the text here",
                        "label": "What is the business impact if this request is not committed?",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "What business objective does this request map to?",
                        "fieldType": "SingleLineTextInput",
                        "placeholder":"Enter the text here",
                        "label": "What business objective does this request map to?",
                        "className": "gdcGridCol gdcGridCol6",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Is this an enhancement to an existing report or a new report request?",
                        "fieldType": "SingleSelectInput",
                        "placeholder":"Select an option",
                        "label": "Is this an enhancement to an existing report or a new report request?",
                        "className": "gdcGridCol gdcGridCol6",
                        "options": [
                            {
                                "key": "Enhance Existing Report",
                                "text": "Enhance Existing Report"
                            },
                            {
                                "key": "New Report Request",
                                "text": "New Report Request"
                            }
                        ],
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "Custom.ReportRequestfieldType"
                    },
                    {
                        "field": "What is the priority of your request?",
                        "fieldType": "SingleSelectInput",
                        "placeholder":"Select an option",
                        "label": "What is the priority of your request?",
                        "className": "gdcGridCol gdcGridCol6",
                        "options": [
                            {
                                "key": "Priority 1: Urgent and important - must have ASAP",
                                "text": "Priority 1: Urgent and important - must have ASAP",
                                "color": "#ff5a5a"
                            },
                            {
                                "key": "Priority 2: Not urgent but important - must have",
                                "text": "Priority 2: Not urgent but important - must have",
                                "color": "#faaa4c"
                            },
                            {
                                "key": "Priority 3: Low priority - nice to have",
                                "text": "Priority 3: Low priority - nice to have",
                                "color": "#6ef1c2"
                            }
                        ],
                        "value": "",
                        "required": true,
                        "errorMessage": "Priority is required",
                        "devopsName": "Custom.RequestedPriority"
                    },
                    {
                        "field": "Requested Completion Date",
                        "fieldType": "DateInput",
                        "label": "Requested Completion Date",
                        "className": "gdcGridCol gdcGridCol6",
                        "placeholder":"Select the date",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Are there any other details or dependencies that the team should be aware of?",
                        "fieldType": "MultiLineTextInput",
                        "label": "Are there any other details or dependencies that the team should be aware of?",
                        "className": "gdcGridCol gdcGridCol12",
                        "placeholder":"Enter the text here",
                        "helperText":"You can inlcude any information,details or any dependencies for the team  ",
                        "value": "",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Please provide attachments or screenshots to support your request",
                        "fieldType": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "placeholder":"Add attachment",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "Attachments"
                    }
                ],
                "active": false
            }
        ]
    }
];

const DataServicesmetaData = [
    {
        
        "field": "What fieldType of request is this?",
        "fieldType": "SingleSelectInput",
        "label": "What fieldType of request is this?",
        "placeholder":"Select an option",
        "className": "gdcGridCol gdcGridCol6 gdcFieldSeperateRow",
        "helperText": "",
        "options": [
            { "key": "Data Platform Development Request", "text": "Data Platform Development Request" },
            { "key": "Support Needed", "text": "Support Needed" }
        ],
        "value": "",
        "required": true,
        "errorMessage": "Please choose request fieldType",
        "devopsName": "Custom.WhatfieldTypeOfRequestIsThis",
        "subFields": [
            {
                "option": "Data Platform Development Request",
                "fields": [
                    {
                        "field": "Request Title",
                        "fieldType": "SingleLineTextInput",
                        "label": "Request Title",
                        "placeholder":"Enter the text here",
                        "helperText": "TextInput",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Title is required",
                        "devopsName": "System.Title"
                    },
                    {
                        "field": "Objective",
                        "fieldType": "MultiLineTextInput",
                        "label": "Objective",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Problem Statement",
                        "fieldType": "MultiLineTextInput",
                        "placeholder":"Enter the text here",
                        "label": "Problem Statement",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Business Value",
                        "fieldType": "MultiLineTextInput",
                        "label": "Busines Value",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Desired Output",
                        "fieldType": "MultiLineTextInput",
                        "label": "Desired Output",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Use Cases",
                        "fieldType": "MultiLineTextInput",
                        "label": "Use Cases",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Success Criteria",
                        "fieldType": "MultiLineTextInput",
                        "label": "Success Criteria",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Business Rules",
                        "fieldType": "MultiLineTextInput",
                        "label": "Business Rules",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Output Frequency",
                        "fieldType": "MultiLineTextInput",
                        "label": "Output Frequency",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Data Definition",
                        "fieldType": "MultiLineTextInput",
                        "label": "Data Definition",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Request Maturity",
                        "fieldType": "MultiLineTextInput",
                        "label": "Request Maturity",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Requested Completion Date",
                        "fieldType": "DateInput",
                        "label": "Requested Completion Date",
                        "placeholder":"Select the date",
                        "className": "gdcGridCol gdcGridCol6",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "Custom.RequestedCompletionDate"
                    },
                    {
                        "field": "Please provide attachments or screenshots to support your request",
                        "fieldType": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "placeholder":"Add attachment",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "Attachments"
                    }
                ],
                "active": false
            },
            {
                "option": "Support Needed",
                "fields": [
                    {
                        "field": "Request Title",
                        "fieldType": "SingleLineTextInput",
                        "label": "Request Title",
                   "placeholder":"Enter the text here",
                        "helperText": "TextInput",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Title is required",
                        "devopsName": "System.Title"
                    },
                    {
                        "field": "Description of issue",
                        "fieldType": "MultiLineTextInput",
                        "label": "Description of issue",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Business Impact",
                        "fieldType": "MultiLineTextInput",
                        "label": "Business Impact",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Expected Results",
                        "fieldType": "MultiLineTextInput",
                        "label": "Expected Results",
                        "placeholder":"Enter the text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Is this Request Urgent",
                        "fieldType": "SwitchInput",
                        "label": "Is this Request Urgent",
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
                        "field": "Requested Completion Date",
                        "fieldType": "DateInput",
                        "label": "Requested Completion Date",
                        "className": "gdcGridCol gdcGridCol6",
                        "placeholder":"Select the date",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "Custom.RequestedCompletionDate"
                    },
                    {
                        "field": "Please provide attachments or screenshots to support your request",
                        "fieldType": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "placeholder":"Add attachment",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "Attachments"
                    }
                ],
                "active": false
            }
        ]
    }
    
];

const BusinessIntelligencemetaData = [
    {
        "field": "Request Title",
        "fieldType": "SingleLineTextInput",
        "label": "Request Title",
        "placeholder": "",
        "helperText": "TextInput",
        "className": "ms-Grid-col ms-sm6",
        "value": "",
        "required": true,
        "errorMessage": "Title is required",
        "devopsName": "System.Title"
    },
    {
        "field": "Objective",
        "fieldType": "MultiLineTextInput",
        "label": "Objective",
        "placeholder": "",
        "helperText": "TextInput",
        "className": "ms-Grid-col ms-sm12",
        "value": "",
        "required": false,
        "errorMessage": "",
        "devopsName": "System.Description"
    },
    {
        "field": "Need By Date",
        "fieldType": "DateInput",
        "label": "Need By Date",
        "placeholder":"Select the date",
        "className": "ms-Grid-col ms-sm6",
        "helperText": "DateInput",
        "value": "",
        "required": false,
        "errorMessage": "",
        "devopsName": "Custom.NeedByDate"
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
