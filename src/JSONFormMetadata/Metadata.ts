
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

const AnalyticsmetaData = [
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
        "title": "Business Sponsor",
        "type": "PeoplePickerInput",
        "label": "Business Sponsor",
        "placeholder": "",
        "helperText": "TextInput",
        "className": "ms-Grid-col ms-sm6",
        "value": "",
        "required": true,
        "errorMessage": "Business sponsor is required",
        "devopsName": "Custom.BusinessSponsor"
    },
    {
        "title": "Objective",
        "type": "MultiLineTextInput",
        "label": "Objective",
        "placeholder": "",
        "helperText": "TextInput",
        "className": "ms-Grid-col ms-sm12 gdcColumn12",
        "value": "",
        "required": true,
        "errorMessage": "Objective is required",
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
        "required": true,
        "errorMessage": "Need By Date is required",
        "devopsName": "Custom.NeedByDate"
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

const DataServicesmetaData = [
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
        "title": "Data Services Request Type",
        "type": "SingleSelectInput",
        "label": "Data Services Request Type",
        "placeholder": "",
        "className": "ms-Grid-col ms-sm6",
        "helperText": "",
        "options": [
            { "key": "Data Platform Development Request", "text": "Data Platform Development Request" },
            { "key": "Report a Bug/Issue", "text": "Report a Bug/Issue" }
        ],
        "value": "",
        "required": false,
        "errorMessage": "",
        "devopsName": "Custom.DataServicesRequestType",
        "subFields": [
            {
                "option": "Data Platform Development Request",
                "fields": [
                    {
                        "title": "Is this Request Urgent",
                        "type": "SwitchInput",
                        "label": "Is this Request Urgent",
                        "placeholder": "",
                        "className": "ms-Grid-col ms-sm6",
                        "helperText": "MuSwitchInput",
                        "options": [
                            { "onText": "Urgent" },
                            { "offText": "Not Urgent" }
                        ],
                        "value": "false",
                        "required": false,
                        "errorMessage": "",
                        "checked": false,
                        "devopsName": "Custom.IsThisRequestUrgent",
                        "subFields": [
                            {
                                "option": true,
                                "fields": [
                                    {
                                        "title": "Need By Date",
                                        "type": "DateInput",
                                        "label": "Need By Date",
                                        "placeholder": "",
                                        "className": "ms-Grid-col ms-sm6",
                                        "helperText": "DateInput",
                                        "value": "",
                                        "required": true,
                                        "errorMessage": "Need by Date required",
                                        "devopsName": "Custom.NeedByDate"
                                    }
                                ],
                                "active": false
                            }
                        ]
                    },
                    {
                        "title": "Stakeholders",
                        "type": "PeoplePickerInput",
                        "label": "Stakeholders",
                        "placeholder": "",
                        "helperText": "TextInput",
                        "className": "ms-Grid-col ms-sm6",
                        "value": "",
                        "required": true,
                        "errorMessage": "Stakeholders is required",
                        "devopsName": "Custom.Stakeholders"
                    }
                ],
                "active": false
            },
            {
                "option": "Report a Bug/Issue",
                "fields": [
                    {
                        "title": "Is this Request Urgent",
                        "type": "SwitchInput",
                        "label": "Is this Request Urgent",
                        "placeholder": "",
                        "className": "ms-Grid-col ms-sm6",
                        "helperText": "MuSwitchInput",
                        "options": [
                            { "onText": "Urgent" },
                            { "offText": "Not Urgent" }
                        ],
                        "value": "false",
                        "required": false,
                        "errorMessage": "",
                        "checked": false,
                        "devopsName": "Custom.IsThisRequestUrgent",
                        "subFields": [
                            {
                                "option": true,
                                "fields": [
                                    {
                                        "title": "Need By Date",
                                        "type": "DateInput",
                                        "label": "Need By Date",
                                        "placeholder": "",
                                        "className": "ms-Grid-col ms-sm6",
                                        "helperText": "DateInput",
                                        "value": "",
                                        "required": true,
                                        "errorMessage": "Need by Date required",
                                        "devopsName": "Custom.NeedByDate"
                                    }
                                ],
                                "active": false
                            }
                        ]
                    }
                ],
                "active": false
            }
        ]
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
        "title": "Problem Statement",
        "type": "MultiLineTextInput",
        "label": "Problem Statement",
        "placeholder": "",
        "helperText": "TextInput",
        "className": "ms-Grid-col ms-sm12",
        "value": "",
        "required": false,
        "errorMessage": "",
        "devopsName": "Custom.ProblemStatement"
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
