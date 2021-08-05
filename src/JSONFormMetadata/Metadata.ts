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
        "field": "What area of Business Analytics & Insights is your request for?",
        "fieldType": "SingleSelectInput",
        "label": "What area of Business Analytics & Insights is the request for?",
        "placeholder": "Select an option",
        "className": "gdcGridCol gdcGridCol6 gdcFieldSeperateRow",
        "options": [
            {
                "key": "Functional / Engine Teams within BA&I",
                "text": "Functional / Engine Teams within BA&I"
            },
            {
                "key": "Business Analytics & Insights",
                "text": "Business Analytics & Insights"
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
                "key": "Events & Skilling Analytics",
                "text": "Events & Skilling Analytics"
            },
            {
                "key": "Lead Flow Analytics",
                "text": "Lead Flow Analytics"
            },
            {
                "key": "Digital Cloud Acquisition Analytics",
                "text": "Digital Cloud Acquisition Analytics"
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
        "required": true,
        "errorMessage": "Please select area",
        "devopsName": "System.AreaPath",
        "subFields": [
            {
                "option": "Relationship Marketing Analytics",
                "fields": [
                    {
                        "field": "POD Category",
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
                        "required": false,
                        "errorMessage": "",
                        "devopsName": "Custom.RMPODCategory"
                    },
                    {
                        "field": "POD Name",
                        "fieldType": "SingleSelectCascadingInput",
                        "cascadingField": "POD Category",
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
                                "key": "Commercial_All",
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
        "field": "Request Title",
        "fieldType": "SingleLineTextInput",
        "label": "Request Title",
        "placeholder": "Enter your text here",
        "className": "gdcGridCol gdcGridCol12",
        "value": "",
        "required": true,
        "helperText": "Please enter the title of your request",
        "errorMessage": "Field is required",
        "devopsName": "System.Title"
    },
    {
        "field": "Please provide detailed requirements for this request.",
        "fieldType": "MultiLineTextInput",
        "placeholder": "Enter your text here",
        "label": "Please provide detailed requirements for this request.",
        "className": "gdcGridCol gdcGridCol12",
        "value": "<b>Please supply the business/strategic question(s) you are seeking to answer with this request. (what questions are you trying to answer)</b></br></br><b>Objective: What will the output of this analysis, metrics, or report enable you to do/understand better or differently?</b></br></br><b>Hypothesis: If applicable, please provide a hypothesis statement to ground the analytics exploration and help provide the analyst with a point to work from.</b></br></br><b>What is the reach or surface area of this request? (How many people might consume this information/report)</b></br></br><b>What do we need to consider to support this request: data (fields, dimensions); time horizon (e.g. last 6, 12, or 18 months; trailing 12 months); what is the frequency you need this available for: 1x, weekly, monthly, quarterly</b></br><p> </p>",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Description"
    },
    {
        "field": "What is the business impact if this work is not done?",
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
        "field": "What business objective are you trying to achieve?",
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
        "field": "If this request is related to an existing report, please provide link to that report here",
        "fieldType": "SingleLineTextInput",
        "placeholder": "Enter your text here",
        "label": "If this request is related to an existing report, please provide link to that report here",
        "className": "gdcGridCol gdcGridCol6",
        "value": "",
        "required": false,
        "helperText": "Provide links to relevant reports",
        "errorMessage": "Field is required",
        "devopsName": "Custom.ReportRequestType"
    },
    {
        "field": "Need By Date",
        "fieldType": "DateInput",
        "label": "Need By Date",
        "className": "gdcGridCol gdcGridCol6",
        "placeholder": "Select the date",
        "value": "",
        "required": true,
        "errorMessage": "Field is required",
        "devopsName": "System.Description"
    },
    {
        "field": "Please attach any supporting artifacts here",
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
        "field": "What fieldType of request is this?",
        "fieldType": "RadioButtonInput",
        "label": "What fieldType of request is this?",
        "placeholder": "Select an option",
        "className": "gdcGridCol gdcGridCol6 gdcFieldSeperateRow",
        "helperText": "",
        "options": [
            { "key": "Data Platform Development Request", "text": "Data Platform Development Request" },
            { "key": "Support Needed", "text": "Support Needed" }
        ],
        "value": "",
        "required": true,
        "errorMessage": "Please choose request fieldType",
        "devopsName": "Custom.WhatTypeOfRequestIsThis",
        "subFields": [
            {
                "option": "Data Platform Development Request",
                "fields": [
                    {
                        "field": "Request Title",
                        "fieldType": "SingleLineTextInput",
                        "label": "Request Title",
                        "placeholder": "Enter your text here",
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
                        "helperText": "Please enter Objectives",
                        "placeholder": "Enter your text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Problem Statement",
                        "fieldType": "MultiLineTextInput",
                        "placeholder": "Enter your text here",
                        "label": "Problem Statement",
                        "helperText": "Please enter Problem Statement",
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
                        "placeholder": "Enter your text here",
                        "helperText": "Please enter Business Value ",
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
                        "placeholder": "Enter your text here",
                        "helperText": "Please enter Desired Output",
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
                        "placeholder": "Enter your text here",
                        "helperText": "Please enter Use Case",
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
                        "placeholder": "Enter your text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "helperText": "Please enter Success Criteria",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Business Rules",
                        "fieldType": "MultiLineTextInput",
                        "label": "Business Rules",
                        "helperText": "Please enter Business Rule",
                        "placeholder": "Enter your text here",
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
                        "placeholder": "Enter your text here",
                        "helperText": "Please enter Output Frequency",
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
                        "placeholder": "Enter your text here",
                        "helperText": "Please enter Data definition",
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
                        "placeholder": "Enter your text here",
                        "helperText": "Please enter Request Maturity",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "required": false,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Need By Date",
                        "fieldType": "DateInput",
                        "label": "Need By Date",
                        "placeholder": "Select the date",
                        "className": "gdcGridCol gdcGridCol6",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Please provide attachments or screenshots to support your request",
                        "fieldType": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "placeholder": "Implementation Guidance(Attachments)",
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
                        "field": "Request Title",
                        "fieldType": "SingleLineTextInput",
                        "label": "Request Title",
                        "placeholder": "Enter your text here",
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
                        "helperText": "Please enter Description of issue",
                        "placeholder": "Enter your text here",
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
                        "placeholder": "Enter your text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "helperText": "Please enter Business Impact",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Expected Results",
                        "fieldType": "MultiLineTextInput",
                        "label": "Expected Results",
                        "placeholder": "Enter your text here",
                        "className": "gdcGridCol gdcGridCol12",
                        "helperText": "Please enter Expected Result",
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
                        "field": "Need By Date",
                        "fieldType": "DateInput",
                        "label": "Need By Date",
                        "className": "gdcGridCol gdcGridCol6",
                        "placeholder": "Select the date",
                        "value": "",
                        "required": true,
                        "errorMessage": "Field is required",
                        "devopsName": "System.Description"
                    },
                    {
                        "field": "Please provide attachments or screenshots to support your request",
                        "fieldType": "FileInput",
                        "label": "Please provide attachments or screenshots to support your request",
                        "className": "gdcGridCol gdcGridCol12",
                        "value": "",
                        "placeholder": "Implementation Guidance(Attachments)",
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
        "placeholder": "Select the date",
        "className": "ms-Grid-col ms-sm6",
        "helperText": "DateInput",
        "value": "",
        "required": false,
        "errorMessage": "",
        "devopsName": "System.Description"
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
