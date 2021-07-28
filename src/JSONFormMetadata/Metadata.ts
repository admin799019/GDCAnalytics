export const metaData = [

    // {
    //     "title": "Is this Request Urgent",
    //     "type": "SwitchInput",
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
        "title": "What area of Channel Analytics is your request for?",
        "type": "SingleSelectInput",
        "label": "What area of Channel Analytics is the request for?",
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
                        "title": "POD Category",
                        "type": "SingleSelectInput",
                        "label": "POD Category",
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
                        "title": "POD Name",
                        "type": "SingleSelectCascadingInput",
                        "cascadingField": "POD Category",
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
        "title": "What type of request is this?",
        "type": "RadioButtonInput",
        "label": "What type of request is this?",
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
        "errorMessage": "Request Type is required",
        "devopsName": "Custom.RequestType",
        "subFields": [
            {
                "option": "Ask an Expert",
                "fields": [
                    {
                        "title": "Request Title",
                        "type": "SingleLineTextInput",
                        "label": "Request Title",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "helperText":"Please Enter the Title of your Request",
                        "required": true,
                        "errorMessage": "Request Title is required",
                        "devopsName": "System.Title"
                    },
                    {
                        "title": "What is the business question you are trying to answer?",
                        "type": "MultiLineTextInput",
                        "label": "What is the business question you are trying to answer?",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "What is the priority of your request?",
                        "type": "SingleSelectInput",
                        "label": "What is the priority of your request?",
                        "className": "gdcGridCol gdcGridCol6",
                        "options": [
                            {
                                "key": "Priority 1: Urgent and important - must have ASAP",
                                "text": "Priority 1: Urgent and important - must have ASAP",
                                "data": "#ff5a5a"
                            },
                            {
                                "key": "Priority 2: Not urgent but important - must have",
                                "text": "Priority 2: Not urgent but important - must have",
                                "data": "#faaa4c"
                            },
                            {
                                "key": "Priority 3: Low priority - nice to have",
                                "text": "Priority 3: Low priority - nice to have",
                                "data": "#6ef1c2"
                            }
                        ],
                        "value": "",
                        "required": true,
                        "errorMessage": "Priority is required",
                        "devopsName": "Custom.RequestedPriority"
                    },

                    {
                        "title": "Requested Completion Date",
                        "type": "DateInput",
                        "label": "Requested Completion Date",
                        "className": "gdcGridCol gdcGridCol6",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Are there any other details or dependencies that the team should be aware of?",
                        "type": "MultiLineTextInput",
                        "label": "Are there any other details or dependencies that the team should be aware of?",
                        "className": "gdcGridCol gdcGridCol12",
                        "helperText":"You can inlcude any information,details or any dependencies for the team  ",
                        "value": "",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Please provide attachments or screenshots to support your request",
                        "type": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
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
                        "title": "Request Title",
                        "type": "SingleLineTextInput",
                        "label": "Request Title",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "helperText":"Please Enter the Title of your Request",
                        "errorMessage": "Request Title is required",
                        "devopsName": "System.Title"
                    },
                    {
                        "title": "Please provide detailed requirements for this request.",
                        "type": "MultiLineTextInput",
                        "label": "Please provide detailed requirements for this request.",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },

                    {
                        "title": "What is the business impact if this request is not committed?",
                        "type": "MultiLineTextInput",
                        "label": "What is the business impact if this request is not committed?",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "What business objective does this request map to?",
                        "type": "SingleLineTextInput",
                        "label": "What business objective does this request map to?",
                        "className": "gdcGridCol gdcGridCol6",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Is this an enhancement to an existing report or a new report request?",
                        "type": "SingleSelectInput",
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
                        "devopsName": "Custom.ReportRequestType"
                    },
                    {
                        "title": "What is the priority of your request?",
                        "type": "SingleSelectInput",
                        "label": "What is the priority of your request?",
                        "className": "gdcGridCol gdcGridCol6",
                        "options": [
                            {
                                "key": "Priority 1: Urgent and important - must have ASAP",
                                "text": "Priority 1: Urgent and important - must have ASAP",
                                "data": "#ff5a5a"
                            },
                            {
                                "key": "Priority 2: Not urgent but important - must have",
                                "text": "Priority 2: Not urgent but important - must have",
                                "data": "#faaa4c"
                            },
                            {
                                "key": "Priority 3: Low priority - nice to have",
                                "text": "Priority 3: Low priority - nice to have",
                                "data": "#6ef1c2"
                            }
                        ],
                        "value": "",
                        "required": true,
                        "errorMessage": "Priority is required",
                        "devopsName": "Custom.RequestedPriority"
                    },
                    {
                        "title": "Requested Completion Date",
                        "type": "DateInput",
                        "label": "Requested Completion Date",
                        "className": "gdcGridCol gdcGridCol6",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Are there any other details or dependencies that the team should be aware of?",
                        "type": "MultiLineTextInput",
                        "label": "Are there any other details or dependencies that the team should be aware of?",
                        "className": "gdcGridCol gdcGridCol12",
                        "helperText":"You can inlcude any information,details or any dependencies for the team  ",
                        "value": "",
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Please provide attachments or screenshots to support your request",
                        "type": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
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
        
        "title": "What type of request is this?",
        "type": "SingleSelectInput",
        "label": "What type of request is this?",
        "placeholder": "",
        "className": "gdcGridCol gdcGridCol6 gdcFieldSeperateRow",
        "helperText": "",
        "options": [
            { "key": "Data Platform Development Request", "text": "Data Platform Development Request" },
            { "key": "Support Needed", "text": "Support Needed" }
        ],
        "value": "",
        "required": true,
        "errorMessage": "Please choose request type",
        "devopsName": "Custom.WhatTypeOfRequestIsThis",
        "subFields": [
            {
                "option": "Data Platform Development Request",
                "fields": [
                    {
                        "title": "Request Title",
                        "type": "SingleLineTextInput",
                        "label": "Request Title",
                        "placeholder": "",
                        "helperText": "TextInput",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Title is required",
                        "devopsName": "System.Title"
                    },
                    {
                        "title": "Objective",
                        "type": "MultiLineTextInput",
                        "label": "Objective",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Problem Statement",
                        "type": "MultiLineTextInput",
                        "label": "Problem Statement",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Business Value",
                        "type": "MultiLineTextInput",
                        "label": "Busines Value",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Desired Output",
                        "type": "MultiLineTextInput",
                        "label": "Desired Output",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Use Cases",
                        "type": "MultiLineTextInput",
                        "label": "Use Cases",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Success Criteria",
                        "type": "MultiLineTextInput",
                        "label": "Success Criteria",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Business Rules",
                        "type": "MultiLineTextInput",
                        "label": "Business Rules",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Output Frequency",
                        "type": "MultiLineTextInput",
                        "label": "Output Frequency",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Data Definition",
                        "type": "MultiLineTextInput",
                        "label": "Data Definition",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Request Maturity",
                        "type": "MultiLineTextInput",
                        "label": "Request Maturity",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Requested Completion Date",
                        "type": "DateInput",
                        "label": "Requested Completion Date",
                        "className": "gdcGridCol gdcGridCol6",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "Custom.RequestedCompletionDate"
                    },
                    {
                        "title": "Please provide attachments or screenshots to support your request",
                        "type": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
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
                        "title": "Request Title",
                        "type": "SingleLineTextInput",
                        "label": "Request Title",
                        "placeholder": "",
                        "helperText": "TextInput",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Title is required",
                        "devopsName": "System.Title"
                    },
                    {
                        "title": "Description of issue",
                        "type": "MultiLineTextInput",
                        "label": "Description of issue",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Business Impact",
                        "type": "MultiLineTextInput",
                        "label": "Business Impact",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Expected Results",
                        "type": "MultiLineTextInput",
                        "label": "Expected Results",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "title": "Is this Request Urgent",
                        "type": "SwitchInput",
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
                        "title": "Requested Completion Date",
                        "type": "DateInput",
                        "label": "Requested Completion Date",
                        "className": "gdcGridCol gdcGridCol6",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "Custom.RequestedCompletionDate"
                    },
                    {
                        "title": "Please provide attachments or screenshots to support your request",
                        "type": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
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
        "title": "Request Title",
        "type": "SingleLineTextInput",
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
        "title": "Objective",
        "type": "MultiLineTextInput",
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
        "title": "Need By Date",
        "type": "DateInput",
        "label": "Need By Date",
        "placeholder": "",
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
        type: "MuCheckboxInput",
        label: "muCheckboxInput",
        disabled: false,
        className: "fields",
        readOnly: false,
        values: null,
        validation: "required"
    },
    muDateInput: {
        type: "MuDateInput",
        label: "muDateInput",
        helperText: "muDateInput",
        disabled: false,
        className: "fields",
        readOnly: false,
        values: null,
        validation: "required"
    },
    muDateTimeInput: {
        type: "MuDateTimeInput",
        label: "muDateTimeInput",
        className: "fields",
        helperText: "muDateTimeInput",
        values: null,
    },
    muMultipleSelectInput: {
        type: "MuMultipleSelectInput",
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
        type: "MuNumberInput",
        label: "muNumberInput",
        placeholder: "",
        className: "fields",
        helperText: "muNumberInput",
        values: null,
        validation: "required|min:18",

    },
    muRadioInput: {
        type: "MuRadioInput",
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
        type: "MuSelectInput",
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
        type: "MuSwitchInput",
        label: "muSwitchInput",
        placeholder: "",
        className: "fields",
        helperText: "MuSwitchInput",
        values: null
    },
    muTextAreaInput: {
        type: "MuTextAreaInput",
        label: "muTextAreaInput",
        placeholder: "",
        className: "fields",
        helperText: "muTextAreaInput",
        validation: "required"
    },
    muTextInput: {
        type: "MuTextInput",
        label: "muTextInput",
        placeholder: "",
        helperText: "muTextInput",
        className: "fields"
    },
    muTimeInput: {
        type: "MuTimeInput",
        label: "muTimeInput",
        placeholder: "",
        helperText: "muTimeInput",
        className: "fields"
    }
};
