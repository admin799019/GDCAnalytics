import * as React from 'react';
import styles from './GdcDevOpsAutomation.module.scss';
import CustomStyles from './GdcDevOpsAutomation.module.scss';
//import  {useRef } from 'react'
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField, ITextFieldProps } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption, IDropdownProps } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { DatePicker } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';
import * as _ from 'lodash';
import { Label } from '@fluentui/react/lib/Label';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { IStackTokens, Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { classNamesFunction, IRenderFunction } from '@fluentui/react/lib/Utilities';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType, IPanelProps } from '@fluentui/react/lib/Panel';
import { Link } from '@fluentui/react';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import "./GdcDevOpsAutomationCustom.css";

import { IDevOpsService } from '../../../Services/IDevOpsService';
import { ISPService } from '../../../Services/ISPService';

import { metaData } from '../../../JSONFormMetadata/Metadata';

import CustomPeoplePicker from "./CustomPeoplePicker";
import { elementContains } from 'office-ui-fabric-react';

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

var base64file1;
var defvaldd: any = [];
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
        <Icon iconName="Info" title={props.name } ariaLabel="value required" />
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
  multiSelectedKeys: string[];
  files: [];
  openPanel: boolean;
  selectedButton: string;
  disableSubmitButton: boolean;
  showErrorMessage: boolean;
  panelHasScroll: boolean;
}

const iconStyles = { marginRight: '8px' };
export default class GdcDevOpsAutomation extends React.Component<IDevOpsProps, IDevOpsState> {
  public requiredHasValues: boolean = true;
  public DescriptionData = "";
  public AttachmentAPI;
  public panelRef;
  public richTextFieldCalls;
  public constructor(props) {

    super(props);
    this.panelRef = React.createRef();

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
      showAddButton: false,
      multiSelectedKeys: [],
      files: [],
      openPanel: false,
      selectedButton: "",
      disableSubmitButton: false,
      showErrorMessage: false,
      panelHasScroll: false
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
    this.onRenderNavigationContent = this.onRenderNavigationContent.bind(this);
    this.onRenderPlaceholder = this.onRenderPlaceholder.bind(this);
    this.onRenderOption = this.onRenderOption.bind(this);
    this.addUserStory = this.addUserStory.bind(this);
  }

  public componentDidMount() {
    var projects: [];
    this.setState({
      projects: projects
    });


    // this.props.devOpsService.getLatestVer(81).then((data) => { console.log(data); });
    // this.props.devOpsService.FilterWorkItems();
  }

  public handleChange(value: any, name) {
    var stateValues = _.cloneDeep(this.state.formFields);
    stateValues = this.appendValues(stateValues, value, name);
    console.log(this.panelRef.current._scrollableContent.clientHeight, this.panelRef.current._scrollableContent.scrollHeight);
    if (this.panelRef.current._scrollableContent.scrollHeight > this.panelRef.current._scrollableContent.clientHeight)
      this.setState({
        formFields: stateValues,
        panelHasScroll: true
      });
    else
      this.setState({
        formFields: stateValues,
        panelHasScroll: false
      });
  }

  public appendValues(stateValues, value: any, name) {
    var subFieldsObject;
    var i = 0;
    stateValues.map((field: MetaDataType, index) => {
      if (field.title == name) {
        i = index;
        if ((value == "" || value == " " || value == "<p><br></p>") && field.required == true) {
          field.showError = true;
        } else if (value != "" || value != "<p><br></p>") {
          field.showError = false;
        }
        if (field.type == "SingleLineTextInput" && value == " ") {
          field.value = "";
        }
        if (field.type == "SingleLineTextInput" && value.length >= 255) {
          field.value = field.value;
        }
        else if (field.type == "SwitchInput") {
          field.checked = value;
        }
        else {
          field.value = value;
        }

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

  public async UpdateRichTextFields(fields): Promise<any> {
    var fs = _.cloneDeep(fields);
    fields.map(async (f) => {
      if (f.type == "MultiLineTextInput") {
        this.richTextFieldCalls = this.richTextFieldCalls + 1;
        await this.UpdateRichText(f.value).then(mlt => {
          f.value = mlt;
          this.richTextFieldCalls = this.richTextFieldCalls - 1;
          if (this.richTextFieldCalls == 0) {
            console.log("updated state", fields);
            this.setState({
              formFields: fields
            });
            this.addUserStory();
          }
        });
      }
      if (f.subFields != null && f.subFields.length > 0) {
        if (f.subFields.filter(sfo => sfo.active == true).length > 0) {
          f.subFields.filter(sfo => sfo.active == true)[0].fields.map(async (sf) => {
            if (sf.type == "MultiLineTextInput") {
              this.richTextFieldCalls = this.richTextFieldCalls + 1;
              await this.UpdateRichText(sf.value).then(smlt => {
                sf.value = smlt;
                this.richTextFieldCalls = this.richTextFieldCalls - 1;

                if (this.richTextFieldCalls == 0) {
                  console.log("updated state", fields);
                  this.setState({
                    formFields: fields
                  });
                  this.addUserStory();
                }
              });
            }
          });
        }
      }
    });

    if (this.richTextFieldCalls == 0) {
      console.log("updated state", fields);
      this.setState({
        formFields: fields
      });
      this.addUserStory();
    }
  }

  public async UpdateRichText(data): Promise<any> {
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

  public addUserStory() {
    var APIData = _.cloneDeep(this.state.formData);
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

    this.appendAPI(this.state.formFields, APIData).then(dataReturned => {
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
          "value": this.DescriptionData
        });
        this.props.devOpsService.addfeature(APIData).then(data => {
          Area.value = "";
          this.setState({
            formFields: metaData,
            formSuccessMessage: "New User Story has been created successfully with ID " + data.id,
            showMessage: true,
            showAddButton: false,
            openPanel: false,
            disableSubmitButton: false,
            showErrorMessage: false
          });
          setTimeout(function () {
            this.setState({ showMessage: false });
          }.bind(this), 5000);
        });
      }
      else {
        stateCopy = dataReturned.Fields;
        this.setState({
          formFields: stateCopy,
          disableSubmitButton: false,
          showErrorMessage: true
        });
      }
    });
  }

  public async submitForm(addorupdate: string) {
    this.DescriptionData = "";
    var formFields = _.cloneDeep(this.state.formFields);

    this.UpdateRichTextFields(formFields);
  }

  public onMultiSelectChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    if (item) {
      console.log(item.key);
      var x: any = this.state.multiSelectedKeys;
      x.push(item.key);
      this.setState({
        multiSelectedKeys:
          item.selected ? x : this.state.multiSelectedKeys.filter(key => key !== item.key),
      });
    }
    this.handleChange(this.state.multiSelectedKeys, "RequestedPriority");
  }

  public async appendAPI(Fields: MetaDataType[], APIData) {
    var requiredHasValues: boolean = true;
    var subFields;
    var mlt = [];

    for (let field of Fields) {
      if (field.devopsName == "System.Description") {
        var tempDesc = "";
        tempDesc = tempDesc.concat("<div><b>", field.title, "</b></div><div>", field.value, "</div></br>");
        this.DescriptionData = this.DescriptionData.concat(tempDesc);
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
      if (field.devopsName != "System.Description" && field.devopsName != "Attachments") {
        APIData.push({
          "op": "add",
          "path": "/fields/" + field.devopsName,
          "from": null,
          "value": field.value
        });
      }
      if (field.devopsName == "Attachments") {

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
        this.appendAPI(subFields, APIData).then(data => {
          return { "APIData": APIData, "Fields": Fields, "requiredHasValues": requiredHasValues };
        });
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
        showAddButton: true,
        selectedButton: option
      });
    });
  }

  public onFileUpload(e) {
    e.preventDefault();
    let files;

    for (let f = 0; f < e.target.files.length; f++) {
      files.push(e.target.files[f]);
    }
    this.setState({
      files: files
    });
  }

  public async AttachFiles(): Promise<any> {
    var FileUploadCalls = [];
    this.state.files.map((file: any) => {
      // let file = files[f];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (data: any) => {
        let base64 = data.target.result.toString().substring(data.target.result.toString().indexOf('base64,') + 7);
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);
        FileUploadCalls.push(this.props.devOpsService.uploadImage(blob, file.name));
      };
    });
    return Promise.all(FileUploadCalls).then((d) => {
      console.log("files - ", d);
      return d;
    }).catch((err) => {
      console.log("err", err);
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

  public onRenderNavigationContent(props, defaultRender) {
    return (
      // <div {...this.state.panelHasScroll ? { className: "gdcScrollPanelHeader" } : { className: "gdcPanelHeader" }}>
      //   <div {...this.state.panelHasScroll ? { className: "gdcScrollPanelHeaderText" } : { className: "gdcPanelHeaderText" }}> GDC Intake Form </div>
      //   <div {...this.state.panelHasScroll ? { className: "gdcScrollPanelHeaderEllipses1" } : { className: "gdcPanelHeaderEllipses1" }}></div>
      //   <div {...this.state.panelHasScroll ? { className: "gdcScrollPanelHeaderEllipses2" } : { className: "gdcPanelHeaderEllipses2" }}></div>

      <div className="gdcPanelHeader" >
        <div className="gdcPanelHeaderText" > GDC Intake Form </div>
        <div className="gdcPanelHeaderEllipses1" ></div>
        <div className="gdcPanelHeaderEllipses2" ></div>
        <div className="gdcPanelCloseButton">
          <Link onClick={(e) => { this.setState({ openPanel: false, formFields: metaData, showAddButton: false, showErrorMessage: false, selectedButton: "" }); }} underline={false}  >
            <Icon iconName="Cancel" className="gdcCloseIcon" /> Close
          </Link>
        </div>
      </div>
    );
  }

  private onRenderOption(option: IDropdownOption): JSX.Element {
    return (
      <div>
        {(
          <Icon style={{ marginRight: '8px', color: option.data }} iconName={"CircleFill"} aria-hidden="true" title={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  }

  private onRenderTitle(options: IDropdownOption[]): JSX.Element {
    const option = options[0];

    return (
      <div>
        {(
          <Icon style={{ marginRight: '8px', color: option.data }} iconName={"CircleFill"} aria-hidden="true" title={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  }

  public onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        {/* <Icon style={iconStyles} iconName={'MessageFill'} aria-hidden="true" /> */}
        <span>{props.placeholder}</span>
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <div className="gdcBorder ">
        <div className="gdcMessage">
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
        <div>
          <Link onClick={(e) => { this.setState({ openPanel: true }); }} className="gdcNewButton" underline>
            New Intake Form
          </Link>
        </div>
        <Panel
          headerText="GDC Intake Form"
          isOpen={this.state.openPanel}
          type={PanelType.extraLarge}

          componentRef={this.panelRef}

          onRenderHeader={this.onRenderNavigationContent}
          hasCloseButton={false}
          className="gdcPanel"
        >
          <div className="gdcGrid"  >
            <div className="gdcGridRow gdcPaddingBottom15">
              <div className="gdcGridCol gdcGridCol12 questionHeader">
                <p className="questionTop">What team is your request for?</p>
                {
                  Area.options.map(area => {
                    return (<DefaultButton
                      text={area.text}
                      className={this.state.selectedButton == area.text ? "selectedButton" : "headerButton"}
                      onClick={e => this.updateFormFields(area.text)
                      }
                    />);
                  })
                }
              </div>
            </div>
            <div className="gdcGridRow">
              {
                this.state.formFields.map((ele) => {
                  return this.renderFields(ele);
                })
              }
              {this.state.showErrorMessage
                ? <MessageBar
                  messageBarType={MessageBarType.error}
                  isMultiline={false}
                >Few fields are required
                </MessageBar>
                : <div></div>}
              <div className={this.state.showAddButton ? "gdcGridCol gdcGridCol12 " : "gdcGridCol gdcGridCol12 gdcDisplayNone "}>
                <PrimaryButton text="Submit" disabled={this.state.disableSubmitButton} className="gdcAddButton"
                  onClick={() => {
                    this.setState({ disableSubmitButton: true, showErrorMessage: false, selectedButton: "" });
                    this.requiredHasValues = true; this.submitForm("add");
                  }} />
                {/* <PrimaryButton text="Update" onClick={() => this.submitForm("update")} /> */}
              </div>
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
            <div className={ele.className}>
              <TextField label={ele.label}
                autoComplete="off"
                onChange={(e, value) => this.handleChange(value, ele.title)}
                className="gdcTextField"
                value={ele.value} name={ele.helperText} required={ele.required} onRenderLabel={onWrapDefaultLabelRenderer} />
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
            <div className={ele.className}>
              <Dropdown
                placeholder="Select an option"
                label={ele.label}
                className="gdcDropDown"

                options={ele.options}
                {...ele.options[0].data != null || ele.options[0].data != undefined ?
                  {
                    onRenderOption: this.onRenderOption,
                    onRenderTitle: this.onRenderTitle,
                    onRenderPlaceholder: this.onRenderPlaceholder
                  } : {}}
                onChange={(e, o) => this.handleChange(o.key, ele.title)}
                required={ele.required}
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
            <div className={ele.className}>
              <Dropdown
                placeholder="Select an option"
                label={ele.label}
                options={options}
                className="gdcDropDown"
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
            <div className={ele.className}>
              <ChoiceGroup options={ele.options}
                className="gdcRadioButton"
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
          <div className={ele.className + " gdcDateInput"}>
            <Label>{ele.label} {ele.required ? <span className="gdcStar">*</span> : ""}</Label>
            <DatePicker placeholder="Select a date" ariaLabel="Select a date" className=""
              onSelectDate={(e) => this.handleChange(e.toLocaleDateString(), ele.title)}
            />
            {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
          </div>
        );
      case "SwitchInput":
        return (
          <React.Fragment>

            <div className={ele.className}>
              <Toggle
                className="gdcSwitchInput"
                label={ele.label} onText={ele.options.onText} offText={ele.options.offText}
                onChange={(e, c) => this.handleChange(c, ele.title)}
                checked={ele.checked}
              />
            </div>

            {(ele.subFields != null) && (ele.subFields.length > 0) && (ele.subFields.filter(fi => fi.option == ele.value).length > 0)
              ? ele.subFields.filter(fi => fi.option == ele.value)[0].fields.map(se => this.renderFields(se))
              : null
            }
          </React.Fragment>
        );
      case "MultiLineTextInput":
        return (
          <div className="">
            <div className={ele.className + " gdcColumnBlock"}>
              <Label>{ele.label + " "} {ele.required ? <span className="gdcStar">* </span> : ""}
              {ele.helperText ?
               {...  <Icon iconName="Info" title={ele.helperText} ariaLabel="value required" />
               
               }:"" }
              </Label>
            
              <ReactQuill 
              placeholder="Enter your text here"
              
              className="gdcMultiLine" onChange={(data) => this.handleChange(data, ele.title)} />
              {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
            </div>
          </div>
        );

      case "PeoplePickerInput":
        return (
          <div className={ele.className}>
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
            <div className="peoplepicker">
              <CustomPeoplePicker

                required={ele.required} spService={this.props.spService} pickerFieldName={ele.title} handlePeopleChange={this.handleChange} />
              {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
            </div>
          </div>
        );
      case "FileInput":
        return (
          <React.Fragment>
            <div className={ele.className + " filepicker"}>
            <p className="notworking">Attachments are not functional at the moment</p>
              <div className="fileInput" >
               
                <Icon iconName="Attach" className="gdcAttachIcon" />
                {/* <Attach12Regular /> */}
                Add attachment
                <input type="file"
                  style={{ display: 'none' }}
                  placeholder="Add attachment"
                  multiple onChange={e => this.onFileUpload(e)} />
              </div>
            </div>
          </React.Fragment>
        );
    }
  }
}
