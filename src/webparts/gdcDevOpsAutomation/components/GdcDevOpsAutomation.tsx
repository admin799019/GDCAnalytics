import * as React from 'react';
import styles from './GdcDevOpsAutomation.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField, ITextFieldProps } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { DatePicker, DayOfWeek, mergeStyles, IDatePickerProps, MonthOfYear, ICalendarStrings, IDatePickerStrings } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';
import * as _ from 'lodash';
import { Label } from '@fluentui/react/lib/Label';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { IStackTokens, Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import "./GdcDevOpsAutomationCustom.css";

import { IDevOpsService } from '../../../Services/IDevOpsService';
import { ISPService } from '../../../Services/ISPService';

import { metaData } from '../../../JSONFormMetadata/Metadata';

import CustomPeoplePicker from "./CustomPeoplePicker";

interface MetaDataType {
  title: string;
  type: string;
  label: string;
  placeholder: string;
  className: string;
  helperText: string;
  options: any;
  value: string;
  required: boolean;
  checked: boolean;
  errorMessage: string;
  devopsName: string;
  showError: boolean;
  //displayOptions?: any;
  displayField: boolean;
  subFields: Array<subFieldsObjectType>;
}

interface subFieldsObjectType {
  option: string;
  fields: Array<MetaDataType>;
  active: boolean;
}

const Area = {
  "title": "Analytics Area",
  "type": "SingleSelectInput",
  "label": "GDC Data & Analytics Area",
  "placeholder": "",
  "className": "fields",
  "helperText": "",
  "options": [
    { "key": "GEP Analytics", "text": "GEP Analytics" },
    { "key": "GDC Business Intelligence", "text": "GDC Business Intelligence" },
    { "key": "Data Services", "text": "Data Services" }
  ],
  "value": ""
};

const stackTokens: IStackTokens = {
  childrenGap: 2,
  maxWidth: 300,
};

const onWrapDefaultLabelRenderer = (
  props: ITextFieldProps,
  defaultRender: IRenderFunction<ITextFieldProps>,
): JSX.Element => {
  return (
    <>
      <Stack horizontal verticalAlign="center" tokens={stackTokens}>
        <span>{defaultRender(props)}</span>
        <Icon iconName="Info" title={props.name + " required"} ariaLabel="value required" />
      </Stack>
    </>
  );
};

export interface IDevOpsProps {
  devOpsService: IDevOpsService;
  spService: ISPService;
  context: any;
}

export interface IDevOpsState {
  projects: [];
  text: any;
  elements: any;
  formData: any;
  formFields: MetaDataType[];
  formSuccessMessage: string;
  showMessage: boolean;
  showAddButton: boolean;
}

export default class GdcDevOpsAutomation extends React.Component<IDevOpsProps, IDevOpsState> {

  public constructor(props) {
    super(props);

    this.state = {
      projects: [],
      text: "",
      elements: [
        { id: 'Request Title' },
        { id: 'Analytics Area' },
        { id: 'Objective' },
        { id: 'Need By Date' }
      ],
      formData: [],
      formFields: metaData,
      formSuccessMessage: "",
      showMessage: false,
      showAddButton: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateFormFields = this.updateFormFields.bind(this);
    this.appendValues = this.appendValues.bind(this);
    this.appendAPI = this.appendAPI.bind(this);
  }

  public componentDidMount() {
    var projects: [];
    this.setState({
      projects: projects
    });
    this.props.devOpsService.FilterWorkItems();
  }

  public handleChange(value: any, name) {
    var stateValues = _.cloneDeep(this.state.formFields);
    var subFields = Array<MetaDataType>();
    var subFieldsObject;
    var i = 0;
    stateValues = this.appendValues(stateValues, value, name);

    console.log("state value", stateValues);
    this.setState({
      formFields: stateValues
    });
  }

  public appendValues(stateValues, value: any, name) {
    var subFieldsObject;
    var i = 0;
    stateValues.map((field, index) => {
      if (field.title == name) {
        i = index;
        if ((value == "" || value == "<p><br></p>") && field.required == true) {
          field.showError = true;
        } else if (value != "" || value != "<p><br></p>") {
          field.showError = false;
        }
        field.value = value;
        field.type == "SwitchInput" ? field.checked = value : field.value = value;

        if (field.subFields != null && field.subFields.length > 0) {
          field.subFields.map(sfoption => {
            sfoption.option == value ? sfoption.active = true : sfoption.active = false;
          });
        }
      }
      else if (field.title != name && field.subFields != null && field.subFields.length > 0) {
        subFieldsObject = field.subFields.filter(f => f.active == true);
        if (subFieldsObject.length > 0) {
          subFieldsObject[0].fields = this.appendValues(subFieldsObject[0].fields, value, name);
        }
      }
    });

    return stateValues;
  }

  public handleToggleChange(value: any, name) {
    var stateValues = this.state.formFields;
    stateValues.map((f) => {
      if (f.title == name) {
        f.checked = value;
        f.value = value;
      }
    });
    this.setState({
      formFields: stateValues
    });
  }

  public onUpdateClick(data): Promise<any> {
    let element = document.createElement('div');
    element.innerHTML = data;
    let imgsLenth = element.querySelectorAll('img').length;
    var imageCalls = [];
    element.querySelectorAll('img').forEach((ele) => {
      if (ele.src.indexOf('base64,') != 0) {
        let base64 = ele.src.substring(ele.src.indexOf('base64,') + 7);

        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/png" });

        imageCalls.push(this.props.devOpsService.uploadImage(blob, "image.png"));
      }
    });
    return Promise.all(imageCalls).then((d) => {
      element.querySelectorAll('img').forEach((ele, i) => {
        ele.src = d[i];
      });
      console.log("element - ", element);
      // this.props.devOpsService.updatefeature(element.innerHTML);
      return element.innerHTML;
    });
  }

  public async submitForm(addorupdate: string) {
    var parentFieldsRequiredHasValues: boolean = true;
    var subFields;
    if (this.state.formFields.filter(fv => fv.required == true && (fv.value == "" || fv.value == "<p><br></p>")).length > 0) {
      var stateCopy = [...this.state.formFields];
      stateCopy.map(scv => {
        if (scv.required == true && (scv.value == "" || scv.value == "<p><br></p>")) {
          scv.showError = true;
          parentFieldsRequiredHasValues = false;
        }
      });
    }
    var APIData = _.cloneDeep(this.state.formData);
    var mlt: string;
    var formFields = _.cloneDeep(this.state.formFields);
    this.appendAPI(formFields, APIData).then(async (dataReturned) => {
      if (dataReturned.requiredHasValues && parentFieldsRequiredHasValues) {
        APIData = dataReturned.APIData;
        APIData.push({
          "op": "add",
          "path": "/fields/System.AreaPath",
          "from": null,
          "value": `test proj\\` + Area.value
        });
        //addorupdate == "add" ? this.props.devOpsService.addfeature(APIData) : this.props.devOpsService.updatefeature(APIData);

        await this.props.devOpsService.addfeature(APIData).then(data => {
          Area.value = "";
          this.setState({
            formFields: metaData,
            formSuccessMessage: "New Ojective has been created successfully with ID " + data.id,
            showMessage: true,
            showAddButton: false
          });
        });
      }
      else {
        stateCopy = dataReturned.Fields;
        this.setState({
          formFields: stateCopy
        });
      }
    });
  }

  public async appendAPI(Fields, APIData) {
    var requiredHasValues: boolean = true;
    var subFields;
    var mlt: string;

    for (let field of Fields) {
      if (field.type == "MultiLineTextInput") {
        mlt = await this.onUpdateClick(field.value);
        field.value = mlt;
      }
      //var DevOpsTitle = MetaDataMpping.filter(f => f.FormTitle == field.title)[0].DevOpsName;
      APIData.push({
        "op": "add",
        "path": "/fields/" + field.devopsName,
        "from": null,
        "value": field.value
      });

      if (field.subFields != null && field.subFields.length > 0 && field.subFields.filter(f => f.option == field.value).length > 0) {
        subFields = field.subFields.filter(f => f.option == field.value)[0].fields;

        if (subFields.filter(fv => fv.required == true && (fv.value == "" || fv.value == "<p><br></p>")).length > 0) {
          var stateCopy = [...subFields];
          stateCopy.map(scv => {
            if (scv.required == true && (scv.value == "" || scv.value == "<p><br></p>")) {
              scv.showError = true;
              requiredHasValues = false;
            }
          });

          // return { "APIData": APIData, "Fields": Fields, "requiredHasValues": requiredHasValues };
        }
        this.appendAPI(subFields, APIData).then(data => {
          requiredHasValues = data.requiredHasValues;
          return { "APIData": APIData, "Fields": Fields, "requiredHasValues": requiredHasValues };
        });
      }
    }
    return { "APIData": APIData, "Fields": Fields, "requiredHasValues": requiredHasValues };
  }

  public updateFormFields(option) {
    Area.value = option.text;
    this.props.spService.getFormMetadata(option.text).then((data) => {
      var jsonData = JSON.parse(data.JSON);
      this.setState({
        formFields: jsonData,
        showMessage: false,
        showAddButton: true
      });
    });
    // call devops service for filter
    // map the json data using title and devops name
    // append values from devops in value property
  }

  public render(): JSX.Element {
    return (
      <div className="ms-Grid gdcBorder">
        <div className="ms-Grid-row">
          {this.state.showMessage
            ? <MessageBar
              messageBarType={MessageBarType.success}
              isMultiline={false}
            >
              {this.state.formSuccessMessage}
            </MessageBar>
            : <div></div>
          }
        </div>
        <div className="ms-Grid-row gdcPaddingBottom15">
          <div className="ms-Grid-col ms-sm8">
            <Dropdown
              placeholder="Select an option"
              label={Area.label}
              options={Area.options}
              onChange={(e, o) => this.updateFormFields(o)}
              className="ms-sm6"
              selectedKey={Area.value}
            //styles={dropdownStyles}
            />
          </div>
          <div className={this.state.showAddButton ? "ms-Grid-col ms-sm4 " : "ms-Grid-col ms-sm4 gdcDisplayNone "}>
            <PrimaryButton text="Add" className="gdcAddButton" onClick={() => this.submitForm("add")} />
            {/* <PrimaryButton text="Update" onClick={() => this.submitForm("update")} /> */}
          </div>
        </div>
        <div className="ms-Grid-row">
          {
            this.state.formFields.map((ele) => {
              return this.renderFields(ele);
            })
          }
        </div>
      </div>
    );
  }

  public renderFields(ele: MetaDataType) {
    switch (ele.type) {
      case "SingleLineTextInput":
        return (
          <React.Fragment>
            <div className={ele.className + " gdcColumn6"}>
              <TextField label={ele.label} onChange={(e, value) => this.handleChange(value, ele.title)}
                value={ele.value} name={ele.title} required={ele.required} onRenderLabel={onWrapDefaultLabelRenderer}/>
              {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
            </div>
            {(ele.subFields != null) && (ele.subFields.length > 0) && (ele.subFields.filter(fi => fi.option == ele.value).length > 0)
              ? ele.subFields.filter(fi => fi.option == ele.value)[0].fields.map(se => this.renderFields(se))
              : null
            }
          </React.Fragment>
        );
      case "SingleSelectInput":
        return (
          <React.Fragment>
            <div className={ele.className + " gdcColumn6"}>
              <Dropdown
                placeholder="Select an option"
                label={ele.label}
                options={ele.options}
                onChange={(e, o) => this.handleChange(o.key, ele.title)}
                required={ele.required}
              //styles={dropdownStyles}
              />
              {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
            </div>
            {(ele.subFields != null) && (ele.subFields.length > 0) && (ele.subFields.filter(fi => fi.option == ele.value).length > 0)
              ? ele.subFields.filter(fi => fi.option == ele.value)[0].fields.map(se => this.renderFields(se))
              : null
            }
          </React.Fragment>
        );
      case "DateInput":
        return (
          <div className={ele.className + " gdcColumn6"}>
            <Label>{ele.label} {ele.required ? <span className="gdcStar">*</span> : ""}</Label>
            <DatePicker placeholder="Select a date..." ariaLabel="Select a date"
              onSelectDate={(e) => this.handleChange(e.toLocaleDateString(), ele.title)}
            />
            {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
          </div>
        );
      case "SwitchInput":
        return (
          <React.Fragment>
            <div>
              <div className={ele.className + " gdcColumn6"}>
                <Toggle label={ele.label} onText={ele.options.onText} offText={ele.options.offText}
                  onChange={(e, c) => this.handleChange(c, ele.title)}
                  checked={ele.checked}
                />
              </div>
            </div>
            {(ele.subFields != null) && (ele.subFields.length > 0) && (ele.subFields.filter(fi => fi.option == ele.value).length > 0)
              ? ele.subFields.filter(fi => fi.option == ele.value)[0].fields.map(se => this.renderFields(se))
              : null
            }
          </React.Fragment>
        );
      case "MultiLineTextInput":
        return (
          <div className={ele.className + " gdcColumn12"}>
            <Label>{ele.label} {ele.required ? <span className="gdcStar">*</span> : ""}</Label>
            <ReactQuill style={{ minHeight: 100 }} onChange={(data) => this.handleChange(data, ele.title)} />
            {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
          </div>
        );
      case "PeoplePickerInput":
        return (
          <div className={ele.className + " gdcColumn6"}>
            {/* <PeoplePicker
            context={this.props.context}
            titleText="People Picker"
            personSelectionLimit={1}
            groupName={""} // Leave this blank in case you want to filter from all users
            showtooltip={true}
            required={false}
            disabled={false}
            onChange={(items) => this.handleChange(items[0].secondaryText, ele.title)}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} /> */}

            <CustomPeoplePicker required={ele.required} spService={this.props.spService} pickerFieldName={ele.title} handlePeopleChange={this.handleChange} />
            {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
          </div>
        );
    }
  }
}
