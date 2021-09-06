export interface MetaDataType {
    id: string;
    fieldType: string;
    label: string;
    placeholder: string;
    className: string;
    helperText: any;
    options: any;
    value: string;
    personName: string;
    required: boolean;
    selectedKeys: string[];
    checked: boolean;
    errorMessage: string;
    devopsName: string;
    showError: boolean;
    subFields: Array<subFieldsObjectType>;
    cascadingField: string;
    files: any;
    defaultValue: string;
    hasDependency: boolean;
    dependentField: string;
    dependentFieldValue: any;
    textToAppend: string;
  }
  
  export interface subFieldsObjectType {
    option: string;
    fields: Array<MetaDataType>;
    active: boolean;
  }