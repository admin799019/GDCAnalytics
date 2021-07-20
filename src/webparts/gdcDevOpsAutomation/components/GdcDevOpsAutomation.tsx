import * as React from 'react';
import styles from './GdcDevOpsAutomation.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField, ITextFieldProps } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { DatePicker } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';
import * as _ from 'lodash';
import { Label } from '@fluentui/react/lib/Label';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { IStackTokens, Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';


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
  subFields: Array<subFieldsObjectType>;
  cascadingField: string;
}

interface subFieldsObjectType {
  option: string;
  fields: Array<MetaDataType>;
  active: boolean;
}

var DescriptionData = "";
const Area = {
  "title": "Analytics Area",
  "type": "SingleSelectInput",
  "label": "GDC Data & Analytics Area",
  "placeholder": "",
  "className": "fields",
  "helperText": "",
  "options": [
    { "key": "Data Services", "text": "Data Services" },
    { "key": "Channel Analytics", "text": "Channel Analytics" },
    { "key": "Marketing Engagement & Innovation", "text": "Marketing Engagement & Innovation" },
    { "key": "Targeting Enablement & Business Health", "text": "Targeting Enablement & Business Health" }
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
  // DescriptionData: string;
}

export default class GdcDevOpsAutomation extends React.Component<IDevOpsProps, IDevOpsState> {
  requiredHasValues : boolean = true;
  public constructor(props) {
    super(props);

    this.state = {
      projects: [],
      text: "",
      // DescriptionData: "",
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
    this.UpdateRichText = this.UpdateRichText.bind(this);
    this.UpdateRichTextFields = this.UpdateRichTextFields.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateFormFields = this.updateFormFields.bind(this);
    this.appendValues = this.appendValues.bind(this);
    this.appendAPI = this.appendAPI.bind(this);
    this.getCascadingFieldValue = this.getCascadingFieldValue.bind(this);
  }

  public componentDidMount() {
    var projects: [];
    this.setState({
      projects: projects
    });
    // this.props.devOpsService.getLatestVer(44).then((data) => { console.log(data); });
    // this.props.devOpsService.FilterWorkItems();
  }

  public handleChange(value: any, name) {
    var stateValues = _.cloneDeep(this.state.formFields);
    stateValues = this.appendValues(stateValues, value, name);

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

  public UpdateRichTextFields(fields): Promise<any> {
    fields.map(async (f) => {
      if (f.type == "MultiLineTextInput") {
        await this.UpdateRichText(f.value).then(mlt => {
          f.value = mlt;
        });
      }
      if (f.subFields != null && f.subFields.length > 0) {
        if (f.subFields.filter(sfo => sfo.active == true).length > 0) {
          f.subFields.filter(sfo => sfo.active == true)[0].fields.map(async (sf) => {
            if (sf.type == "MultiLineTextInput") {
              await this.UpdateRichText(sf.value).then(smlt => {
                sf.value = smlt;
              });
            }
          });
        }
      }
    });
    return Promise.all(fields).then(d => {
      console.log("rich text",fields);
      return fields;
    });
  }

  public UpdateRichText(data): Promise<any> {
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
      // console.log("element - ", element);
      // this.props.devOpsService.updatefeature(element.innerHTML);
      return element.innerHTML;
    });
  }

  public async submitForm(addorupdate: string) {
    DescriptionData = "";
    var parentFieldsRequiredHasValues: boolean = true;
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

    this.UpdateRichTextFields(formFields).then(updatedformFields => {
      var dataReturned = this.appendAPI(_.cloneDeep(updatedformFields), APIData);
      if (this.requiredHasValues && parentFieldsRequiredHasValues) {
        APIData = dataReturned.APIData;
        // APIData.push({
        //   "op": "add",
        //   "path": "/fields/System.AreaPath",
        //   "from": null,
        //   "value": `Operational Framework\\` + Area.value
        // });
        //addorupdate == "add" ? this.props.devOpsService.addfeature(APIData) : this.props.devOpsService.updatefeature(APIData);
        APIData.push({
          "op": "add",
          "path": "/fields/System.Description",
          "from": null,
          "value": DescriptionData
        });
        this.props.devOpsService.addfeature(APIData).then(data => {
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

  public appendAPI(Fields: MetaDataType[], APIData) {
    var requiredHasValues: boolean = true;
    var subFields;

    for (let field of Fields) {
      if (field.devopsName == "System.Description") {
        var tempDesc = "";
        tempDesc = tempDesc.concat("<div><b>", field.title, "</b></div><div>", field.value, "</div></br>");
        DescriptionData = DescriptionData.concat(tempDesc);
      }
      // else if(field.devopsName=="System.AreaPath")
      // {
      //   APIData.push({
      //     "op": "add",
      //     "path": "/fields/" + field.devopsName,
      //     "from": null,
      //     "value": field.value
      //   });
      // }
      if (field.devopsName != "System.Description") {
        APIData.push({
          "op": "add",
          "path": "/fields/" + field.devopsName,
          "from": null,
          "value": field.value
        });
      }
      if (field.subFields != null && field.subFields.length > 0 && field.subFields.filter(f => f.option == field.value).length > 0) {
        subFields = field.subFields.filter(f => f.option == field.value)[0].fields;

        if (subFields.filter(fv => fv.required == true && (fv.value == "" || fv.value == "<p><br></p>")).length > 0) {
          var stateCopy = [...subFields];
          stateCopy.map(scv => {
            if (scv.required == true && (scv.value == "" || scv.value == "<p><br></p>")) {
              scv.showError = true;
              this.requiredHasValues = false;
            }
          });
          // return { "APIData": APIData, "Fields": Fields, "requiredHasValues": requiredHasValues };
        }
        var data = this.appendAPI(subFields, APIData);
        // requiredHasValues = data.requiredHasValues;
        // return { "APIData": APIData, "Fields": Fields, "requiredHasValues": requiredHasValues };
      }
    }
    return { "APIData": APIData, "Fields": Fields, "requiredHasValues": requiredHasValues };
  }

  public updateFormFields(option) {
    Area.value = option;
    this.props.spService.getFormMetadata(option).then((data) => {
      var jsonData = JSON.parse(data.JSON);
      this.setState({
        formFields: jsonData,
        showMessage: false,
        showAddButton: true
      });
    });
  }

  public getCascadingFieldValue(fieldName) {
    var value = "";
    this.state.formFields.map(f => {
      if (f.title == fieldName) {
        value = f.value;
      }
      else if (f.subFields != null && f.subFields.length > 0) {
        if (f.subFields.filter(sfo => sfo.active == true).length > 0) {
          f.subFields.filter(sfo => sfo.active == true)[0].fields.map(sf => {
            if (sf.title == fieldName) {
              value = sf.value;
            }
          });
        }
      }
    });
    return value;
  }

  public render(): JSX.Element {
    return (
      <div className="gdcBorder">
        <div className="">
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
        <Panel
          headerText="GDC Intake Form"
          isOpen={true}
          type={PanelType.extraLarge}
          closeButtonAriaLabel="Close"
        >
          <div className="ms-Grid">
            <div className="ms-Grid-row gdcPaddingBottom15">
              <div className="ms-Grid-col ms-sm12">
                {
                  Area.options.map(area => {
                    return (<DefaultButton text={area.text}
                      onClick={e => this.updateFormFields(area.text)}
                    />);
                  })
                }
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
        </Panel>
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
                value={ele.value} name={ele.title} required={ele.required} onRenderLabel={onWrapDefaultLabelRenderer} />
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
      case "SingleSelectCascadingInput":
        var cascadingField = ele.cascadingField;
        var cascadingFieldValue = this.getCascadingFieldValue(cascadingField);
        var options = cascadingFieldValue != ""
          ? ele.options.filter(opt => opt.cascadingOption == cascadingFieldValue)
          : ele.options;
        return (
          <React.Fragment>
            <div className={ele.className + " gdcColumn6"}>
              <Dropdown
                placeholder="Select an option"
                label={ele.label}
                options={options}
                onChange={(e, o) => this.handleChange(o.key, ele.title)}
                required={ele.required}
              //styles={dropdownStyles}
              />
              {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
            </div>
          </React.Fragment>
        );
      case "RadioButtonInput":
        return (
          <React.Fragment>
            <div className={ele.className + " gdcColumn6"}>
              <ChoiceGroup options={ele.options}
                onChange={(e, o) => this.handleChange(o.key, ele.title)}
                label={ele.label} required={ele.required} />
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
