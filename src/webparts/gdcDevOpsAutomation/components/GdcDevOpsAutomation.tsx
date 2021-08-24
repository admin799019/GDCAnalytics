import * as React from 'react';
import styles from './GdcDevOpsAutomation.module.scss';
import CustomStyles from './GdcDevOpsAutomation.module.scss';
import { TextField, ITextFieldProps } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption, IDropdownProps } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { DatePicker } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { TooltipHost, ITooltipHostStyles, ITooltipProps } from '@fluentui/react/lib/Tooltip';
import * as _ from 'lodash';
//import Logo from './../GDCLogo.jsx';
import ReactHtmlParser from 'react-html-parser';
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
import { OrganizationConfig } from '../../../JSONFormMetadata/OrgConfig';
import { SPService } from '../../../Services/SPService';
import { containsInvalidFileFolderChars } from '@pnp/sp';

interface MetaDataType {
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

interface subFieldsObjectType {
  option: string;
  fields: Array<MetaDataType>;
  active: boolean;
}
//virendra

const iconStyle =
{
  cursor: 'pointer',
  marginLeft: '2px',
};

const stackTokens: IStackTokens = {
  childrenGap: 2,
  maxWidth: 300,
};

const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
const onWrapDefaultLabelRenderer = (
  props: any,
  defaultRender: IRenderFunction<any>,
): JSX.Element => {

  return (
    <>
      <Stack horizontal verticalAlign="center" tokens={stackTokens}>
        <span className="questionspan">{defaultRender(props)}</span>
        {(props.name != "" && props.name != undefined) || (props.title != "" && props.title != undefined) ?
          <TooltipHost
            tooltipProps={{
              onRenderContent: () => (ReactHtmlParser(props.name != "" ? props.name : props.title))
            }}
            // content={props.name || props.title}
            styles={hostStyles}
          >
            <Icon iconName="Info"
              style={iconStyle}
              // title={props.name || props.title}
              className="tooltip" ariaLabel="value required" />
          </TooltipHost>
          : ""}
      </Stack>
    </>
  );
};

const handleClick = event => {
  const { target = {} } = event || {};
  target.value = "";
};
export interface IDevOpsProps {
  devOpsService: IDevOpsService;
  spService: ISPService;
  context: any;
}
export interface IDevOpsState {
  projects: [];
  text: any;
  formData: any;
  formFields: MetaDataType[];
  formSuccessMessage: string;
  showMessage: boolean;
  showAddButton: boolean;
  multiSelectedKeys: string[];
  openPanel: boolean;
  selectedButton: string;
  disableSubmitButton: boolean;
  showErrorMessage: boolean;
  panelHasScroll: boolean;
  AreaButtons: any;
  Area: any;
}

const iconStyles = { marginRight: '8px' };
export default class GdcDevOpsAutomation extends React.Component<IDevOpsProps, IDevOpsState> {
  public requiredHasValues: boolean = true;
  public DescriptionData = "";
  public AttachmentAPI: any = [];
  public panelRef;
  public dependentField: MetaDataType;
  public emailFormData = [];
  public urls:any=[];
  public richTextFieldCalls: number = 0;
  public constructor(props) {
    super(props);
    this.panelRef = React.createRef();
    let tempVar: any = [];
    this.props.spService.getAreasList().then((data) => {
      data.map((x) => {
        tempVar.push({ key: x.Title, text: x.Title });
      });
    });
    this.state = {
      projects: [],
      text: "",
      formData: [],
      formFields: metaData,
      formSuccessMessage: "",
      showMessage: false,
      showAddButton: false,
      multiSelectedKeys: [],
      openPanel: false,
      selectedButton: "",
      disableSubmitButton: false,
      showErrorMessage: false,
      panelHasScroll: false,
      AreaButtons: [],
      Area: {
        "field": "Analytics Area",
        "label": "GDC Data & Analytics Area",
        "className": "fields",
        "options": tempVar,
        "value": ""
      }
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
    this.onFileDelete = this.onFileDelete.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
  }

  public componentDidMount() {
    var projects: [];
    this.setState({
      projects: projects
    });
  }

  public handleChange(value: any, name) {
    var stateValues = _.cloneDeep(this.state.formFields);
    stateValues = this.appendValues(stateValues, value, name);
    this.setState({
      formFields: stateValues,
    });
  }

  public appendValues(stateValues, value: any, name) {
    const parser = new DOMParser();
    var subFieldsObject;
    var i = 0;
    stateValues.map((field: MetaDataType, index) => {
      if (field.id == name) {
        i = index;
        if ((value == "" || value == " " || value == "<p><br></p>") && field.required == true) {
          field.showError = true;
        }
        else if (value != "" || value != "<p><br></p>") {
          field.showError = false;
        }

        if (field.fieldType == "SingleLineTextInput") {
          if (value.length >= 255) {
            field.value = field.value;
          }
          else {
            if (value.trim().length == 0 || value.trim() == "") {
              field.showError = true;
            }
            field.value = value;
          }
        }

        if (field.fieldType == "SwitchInput") {
          field.checked = value == true ? true : false;
          field.value = value;
        }

        if (field.fieldType == "MultiLineTextInput") {
          var contentAdded: boolean = false;
          var ele = parser.parseFromString(value, 'text/html');
          var eleValue = ele.body.innerText.replace(/  +/g, ' ');
          if (field.defaultValue != null && field.defaultValue != "") {
            var defaultele = parser.parseFromString(field.defaultValue, 'text/html');
            if (eleValue != defaultele.body.innerText) {
              contentAdded = true;
            }
          }
          else if (field.defaultValue == null) {
            if (eleValue.trim().length != 0) {
              contentAdded = true;
            }
          }
          let imgsLenth = ele.querySelectorAll('img').length;

          if (contentAdded == false && imgsLenth == 0 && field.required == true) {
            field.showError = true;

          }
          field.value = value;
        }

        if (field.fieldType == "FileInput") {
          field.files = field.files.concat(value);
          console.log(field.files);
        }

        else {
          if (field.fieldType != "MultiSelectInput")
            field.value = value;
        }
        if (field.fieldType == "MultiSelectInput") {
          if (value) {
            field.selectedKeys = (value.selected ? [...field.selectedKeys, value.key] : field.selectedKeys.filter(key => key !== value.key));
          }
          field.value = "";
          field.selectedKeys.map((x) => {

            field.value += x as string + ";";
          });
        }

        if (field.fieldType == "PeoplePickerInput") {
          field.value = value.secondaryText;
          field.personName = value.text;
        }

        if (field.subFields != null && field.subFields.length > 0) {
          field.subFields.map(sfoption => {
            sfoption.option == value ? sfoption.active = true : sfoption.active = false;
          });
        }
      }
      else if (field.id != name && field.subFields != null && field.subFields.length > 0) {
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
      if (f.id == name) {
        f.checked = value;
        f.value = value;
      }
    });
    this.setState({
      formFields: stateValues
    });
  }

  public async UpdateRichTextFields(): Promise<any> {
    var fields = _.cloneDeep(this.state.formFields);

    fields.map(async (f) => {
      if (f.fieldType == "MultiLineTextInput") {
        this.richTextFieldCalls = this.richTextFieldCalls + 1;
        await this.UpdateRichText(f.value).then(mlt => {
          f.value = mlt;
          this.richTextFieldCalls = this.richTextFieldCalls - 1;
          if (this.richTextFieldCalls == 0) {
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
            if (sf.fieldType == "MultiLineTextInput") {
              this.richTextFieldCalls = this.richTextFieldCalls + 1;
              await this.UpdateRichText(sf.value).then(smlt => {
                sf.value = smlt;
                this.richTextFieldCalls = this.richTextFieldCalls - 1;

                if (this.richTextFieldCalls == 0) {
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
      this.setState({
        formFields: fields
      });
      this.addUserStory();
    }
  }

  public async UpdateRichText(data): Promise<any> {
    const parser = new DOMParser();
    let element = parser.parseFromString(data, 'text/html');
    var imgsLenth = element.querySelectorAll('img').length;

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
      return element.body.innerHTML;
    });
  }

  public addUserStory() {
    var APIData = _.cloneDeep(this.state.formData);
    var parentFieldsRequiredHasValues: boolean = true;
    var teamDetails: any;

    if (this.state.formFields.filter(fv => fv.required == true && (fv.value == "" || fv.value == "<p><br></p>")).length > 0) {
      var stateCopy = [...this.state.formFields];
      stateCopy.map(scv => {
        if (scv.required == true && (scv.value == "" || scv.value == "<p><br></p>")) {
          scv.showError = true;
          parentFieldsRequiredHasValues = false;
        }
      });
    }

    this.appendAPI(this.state.formFields, APIData).then(async dataReturned => {
      let Team = "";
      let Area = "";
      let PODCategory = "";

      if (this.requiredHasValues && parentFieldsRequiredHasValues) {
        APIData = dataReturned.APIData;
        let pathPrefix;

        if (APIData.filter(d => d.path == "/fields/System.AreaPath").length == 0) {
          APIData.push(
            {
              "op": "add",
              "path": "/fields/System.AreaPath",
              "from": null,
              "value": OrganizationConfig.ProjectName + `\\` + this.state.Area.value
            });
        }
        else {
          pathPrefix = OrganizationConfig.ProjectName + `\\` + this.state.Area.value + `\\`;
          Area = APIData.filter(d => d.path == "/fields/System.AreaPath")[0].value;
          APIData.filter(d => d.path == "/fields/System.AreaPath")[0].value = (pathPrefix.concat(APIData.filter(d => d.path == "/fields/System.AreaPath")[0].value));
        }
        Team = this.state.Area.value;

        if (Area != "") {
          this.dependentField = metaData[0];
          this.getField("PODCategory", this.state.formFields);
          PODCategory = this.dependentField != null ? this.dependentField.value : "";
        }

        APIData.push({
          "op": "add",
          "path": "/fields/System.Description",
          "from": null,
          "value": this.DescriptionData
        });
console.log(this.AttachmentAPI,"beforecall")
// this.emailFormData.push(this.AttachmentAPI);
// this.AttachmentAPI.map((x)=>{
// var url="<a href='"+x.value.url+"'>"+x.value.name
//   //var x:any={id:"Attachments" ,value:}
// })
this.emailFormData.push({id:"Attachments",value:this.urls})
        APIData = [...APIData, ...this.AttachmentAPI];

        this.props.devOpsService.addfeature(APIData).then((data) => {
          if (data.id != null) {
            this.setState({
              formFields: metaData,
              formSuccessMessage: "New User Story has been created successfully with ID " + data.id,
              showMessage: true,
              showAddButton: false,
              openPanel: false,
              disableSubmitButton: false,
              showErrorMessage: false,
              panelHasScroll: false,
              selectedButton: ""
            });
          
            console.log(APIData,"18thaaug");
            this.AttachmentAPI = [];
            let apiArea: string = APIData.filter(d => d.path == "/fields/System.AreaPath")[0].value;
            setTimeout(function () {
              this.setState({ showMessage: false });
            }.bind(this), 5000);

            let url = { "id": "Link", "value": "<a href='" + OrganizationConfig.ProjectUrl + "/_workitems/edit/" + data.id + "'>Link</a>" };
            this.emailFormData.push(url);

            let id = { "id": "Id", "value": data.id };
            this.emailFormData.push(id);

            if (!(this.emailFormData.filter(ed => ed.id == "Area") != null && this.emailFormData.filter(ed => ed.id == "Area").length > 0)) {
              let area = { "id": "Area", "value": apiArea };
              this.emailFormData.push(area);
            }
            else if (this.emailFormData.filter(ed => ed.id == "Area") != null && this.emailFormData.filter(ed => ed.id == "Area").length > 0) {
              this.emailFormData.filter(ed => ed.id == "Area")[0].value = APIData.filter(a => a.path == "/fields/System.AreaPath")[0].value;
            }

            this.props.spService.getEmailData(Team, Area, PODCategory).then(emaildata => {

              if (emaildata != null) {
                console.log(this.AttachmentAPI,"attachment api")
               // this.props.spService.sendEmail(emaildata, this.emailFormData);
               console.log(this.emailFormData,"emailformdata",emaildata,"emaildata");
               this.props.spService.sendEmailUsingPowerAutomate(this.emailFormData,emaildata).then((data)=>{
                console.log("working")
              })
              }

              this.emailFormData = [];
            });
            this.state.Area.value = "";
          }
          else {
            this.setState({
              formFields: metaData,
              formSuccessMessage: "Error occured while processing your request. Please try again.",
              showMessage: true,
              showAddButton: false,
              openPanel: false,
              disableSubmitButton: false,
              showErrorMessage: false,
              panelHasScroll: false,
              selectedButton: ""
            });
            this.AttachmentAPI = [];
            this.emailFormData = [];
            setTimeout(function () {
              this.setState({ showMessage: false });
            }.bind(this), 5000);
            this.state.Area.value = "";
          }
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
    this.AttachFiles();
  }

  public onMultiSelectChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    if (item) {
      var x: any = this.state.multiSelectedKeys;
      x.push(item.key);
      this.setState({
        multiSelectedKeys:
          item.selected ? x : this.state.multiSelectedKeys.filter(key => key !== item.key),
      });
    }
    this.handleChange(this.state.multiSelectedKeys, "RequestedPriority");
  }

  public getField(fieldName, fields): any {
    fields.forEach(f => {
      if (f.id == fieldName) {
        this.dependentField = f;
        // return f;
      }
      else if (f.subFields != null && f.subFields.length > 0) {
        var sfj = f.subFields.filter(sf => sf.active == true);
        if (sfj != null && sfj.length > 0) {
          this.getField(fieldName, sfj[0].fields);
        }
      }
    });
  }

  public async appendAPI(Fields: MetaDataType[], APIData) {
    const parser = new DOMParser();
    var requiredHasValues: boolean = true;
    var subFields;
    var mlt = [];

    for (let field of Fields) {
      if (field.hasDependency == true) {
        this.getField(field.dependentField, this.state.formFields);
        if (this.dependentField != undefined && this.dependentField != null && this.dependentField.id == field.dependentField && this.dependentField.value == field.dependentFieldValue) {
          field.value = field.textToAppend.concat(field.value);
        }
      }
      if (field.devopsName == "System.Description") {
        var tempDesc = "";
        tempDesc = tempDesc.concat("<div><b>", field.label, "</b></div><div>", field.value, "</div></br>");
        this.DescriptionData = this.DescriptionData.concat(tempDesc);
      }
      if (field.devopsName != "System.Description" && field.devopsName != "Attachments") {
        APIData.push({
          "op": "add",
          "path": "/fields/" + field.devopsName,
          "from": null,
          "value": field.value
        });
      }

      var emailField = _.cloneDeep(field);
      if (emailField.fieldType == "MultiLineTextInput") {
        emailField.value = parser.parseFromString(emailField.value, 'text/html').body.innerHTML;
      }
      if (emailField.fieldType == "PeoplePickerInput") {
        emailField.value = emailField.personName;
      }
      if(field.devopsName != "Attachments"){
      this.emailFormData.push(emailField);
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
    this.state.Area.value = option;
    this.props.spService.getFormMetadata(option).then((data) => {
      if (data != null) {
        var jsonData = JSON.parse(data.JSON);
        this.setState({
          formFields: jsonData,
          showMessage: false,
          showAddButton: true,
          selectedButton: option,
          panelHasScroll: true,
          showErrorMessage: false,
        });
      }
      else {
        this.setState({
          formFields: metaData,
          showMessage: false,
          showAddButton: false,
          selectedButton: option,
          panelHasScroll: true,
          showErrorMessage: false
        });
      }
    });
  }

  public onFileUpload(e, name) {
    e.preventDefault();
    var files: any = [];
    for (let f = 0; f < e.target.files.length; f++) {
      files.push(e.target.files[f]);
    }
    var stateValues = _.cloneDeep(this.state.formFields);
    stateValues = this.appendValues(stateValues, files, name);
    this.setState({
      formFields: stateValues
    });
  }

  public onFileDelete(name) {
    var AttachmentJson;
    this.state.formFields.map(f => {
      if (f.fieldType == "FileInput") {
        AttachmentJson = f;
        AttachmentJson.files = AttachmentJson.files.filter(file => file.name != name);
        f = AttachmentJson;
      }
      if (f.subFields != null && f.subFields.length != 0) {
        var subFields = f.subFields.filter(sfs => sfs.active == true);
        if (subFields.length > 0) {
          subFields[0].fields.map(sf => {
            if (sf.fieldType == "FileInput") {
              AttachmentJson = sf;
              AttachmentJson.files = AttachmentJson.files.filter(file => file.name != name);
              sf = AttachmentJson;
            }
          });
        }
      }
    });
    this.setState({
      formFields: this.state.formFields
    });
    return;
  }

  public async AttachFiles(): Promise<any> {
    let count: number = 0;
    var richTextCallSent: boolean = false;
    var AttachmentFiles;

    this.state.formFields.map(async (field: MetaDataType, index) => {
      if (field.fieldType == "FileInput") {
        AttachmentFiles = field.files;
      }
      if (field.subFields != null && field.subFields.length > 0) {
        if (field.subFields.filter(sfo => sfo.active == true).length > 0) {
          field.subFields.filter(sfo => sfo.active == true)[0].fields.map(async (sf) => {
            if (sf.fieldType == "FileInput") {
              AttachmentFiles = sf.files;
            }
          });
        }
      }
    });

    if (AttachmentFiles != null && AttachmentFiles.length > 0) {
      AttachmentFiles.map((file: any) => {
        count = count + 1;
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

          this.props.devOpsService.uploadImage(blob, file.name).then(d => {
            var url="<a href='"+d+"'>"+file.name+"</a></b>";
            console.log(url,"ahref");
            this.urls.push(url);
            this.AttachmentAPI.push(
              {
                "op": "add",
                "path": "/relations/-",
                "value": {
                  "rel": "AttachedFile",
                  "url": d,
                  "attributes": {
                    "comment": ""
                  }
                }
              });
            count = count - 1;
            if (count == 0 && !richTextCallSent) {
              this.UpdateRichTextFields();
              richTextCallSent = true;
            }
          });
        };
      });
    }

    if ((count == 0 && !richTextCallSent) || (AttachmentFiles != null && AttachmentFiles.length == 0)) {
      this.UpdateRichTextFields();
      richTextCallSent = true;
    }
  }

  public getCascadingFieldValue(fieldName) {
    var value = "";
    this.state.formFields.map(f => {
      if (f.id == fieldName) {
        value = f.value;
      }
      else if (f.subFields != null && f.subFields.length > 0) {
        if (f.subFields.filter(sfo => sfo.active == true).length > 0) {
          f.subFields.filter(sfo => sfo.active == true)[0].fields.map(sf => {
            if (sf.id == fieldName) {
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
      <React.Fragment>
        <div className={this.state.panelHasScroll ? "gdcScrollPanelHeader" : "gdcPanelHeader"}>
          {/* <Logo /> */}
          {/* <div id="gdclogoId"></div> */}
          {/* <img src="https://m365x799019.sharepoint.com/:u:/s/GEPAnalyticsTest/ETT3OS8K81lHitMeA61_ElQBmlAHsdliUFoh5W5gnz7eZg?e=YrzMLQ" alt="My Happy SVG" /> */}
          <div className={this.state.panelHasScroll ? "gdcScrollPanelHeaderText" : "gdcPanelHeaderText"}> GDC Intake Form </div>
          <div className={this.state.panelHasScroll ? "gdcScrollPanelHeaderEllipses1" : "gdcPanelHeaderEllipses1"}></div>
          <div className={this.state.panelHasScroll ? "gdcScrollPanelHeaderEllipses2" : "gdcPanelHeaderEllipses2"}></div>

          <div className={this.state.panelHasScroll ? "gdcPanelCloseButton" : "gdcScrollPanelCloseButton"}>
            <Link onClick={(e) => { this.setState({ panelHasScroll: false, openPanel: false, formFields: metaData, showAddButton: false, showErrorMessage: false, selectedButton: "" }); }} underline={false}  >
              <Icon iconName="Cancel" style={iconStyle} className="gdcCloseIcon" /> Close
            </Link>
          </div>
        </div>
        {this.state.showErrorMessage
          ? <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}
            dismissButtonAriaLabel="Close"
            onDismiss={(e) => this.setState({ showErrorMessage: false })}
          >Please complete the required fields.
          </MessageBar>
          : <div></div>}
      </React.Fragment>
    );
  }

  private onRenderOption(option: any): JSX.Element {
    return (
      <div>
        {(
          <Icon style={{ marginRight: '8px', color: option.color }} iconName={"CircleFill"} aria-hidden="true" title={option.color} />
        )}
        <span>{option.text}</span>
      </div>
    );
  }

  private onRenderTitle(options: any[]): JSX.Element {
    const option = options[0];
    return (
      <div>
        {(
          <Icon style={{ marginRight: '8px', color: option.color }} iconName={"CircleFill"} aria-hidden="true" title={option.color} />
        )}
        <span>{option.text}</span>
      </div>
    );
  }

  public onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        {/* <Icon style={iconStyles} iconName={'MessageFill'} aria-hidden="true" />  */}
        <span>{props.placeholder}</span>
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <div className="gdcBorder ">
        <div className="gdcMessage">
          {this.state.showMessage
            ?
            <MessageBar
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

                  this.state.Area.options.map(area => {

                    return (<DefaultButton
                      text={area.text}
                      className={this.state.selectedButton == area.text ? "gdcSelectedButton" : "gdcHeaderButton"}
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
              <div className={this.state.showAddButton ? "gdcGridCol gdcGridCol12 " : "gdcGridCol gdcGridCol12 gdcDisplayNone "}>
                <PrimaryButton text="Submit" disabled={this.state.disableSubmitButton} className="gdcAddButton"
                  onClick={(e) => {
                    this.setState({ disableSubmitButton: true, showErrorMessage: false });
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
    switch (ele.fieldType) {
      case "SingleLineTextInput":
        return (
          <React.Fragment>
            <div className={ele.className}>
            <Label  className="textfieldlabel">{ele.label} {ele.required ? <span className="gdcStar">*</span> : ""}</Label>
           
              <TextField 
              //label={ele.label}
                autoComplete="off"
                onChange={(e, value) => this.handleChange(value, ele.id)}
                {...ele.showError == true ? { className: "gdcTextField requiredreddrop" } : { className: "gdcTextField" }}
                placeholder={ele.placeholder}
                value={ele.value}
                 name={ele.helperText} 
               ariaLabel="something"
                //required={ele.required} 
               // onRenderLabel={onWrapDefaultTextLabelRenderer} 
               />
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
            <Label   className="textfieldlabel">{ele.label} {ele.required ? <span className="gdcStar">*</span> : ""}</Label>
              <Dropdown
                placeholder={ele.placeholder}
               // label={ele.label}
                className="gdcDropDown"
                title={ele.helperText}
                //onRenderLabel={onWrapDefaultLabelRenderer}
                {...ele.showError == true ? { className: "gdcDropDown requiredreddrop" } : { className: "gdcDropDown" }}
                defaultSelectedKey={ele.options.filter(e => e.key == ele.value).length > 0 ? ele.options.filter(e => e.key == ele.value)[0].key : -1}

                options={ele.options}
                {...ele.options[0].color != null || ele.options[0].color != undefined ?
                  {
                    onRenderOption: this.onRenderOption,
                    onRenderTitle: this.onRenderTitle,
                    onRenderPlaceholder: this.onRenderPlaceholder
                  } : {}}
                onChange={(e, o) => this.handleChange(o.key, ele.id)}
               // required={ele.required}
              />
              {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
            </div>
            {(ele.subFields != null) && (ele.subFields.length > 0) && (ele.subFields.filter(fi => fi.option == ele.value).length > 0)
              ? ele.subFields.filter(fi => fi.option == ele.value)[0].fields.map(se => this.renderFields(se))
              : null
            }
          </React.Fragment>
        );
      case "MultiSelectInput":
        return (
          <React.Fragment>
            <div className={ele.className}>
    
              <Dropdown
                placeholder={ele.placeholder}
                label={ele.label}
                ariaLabel="something"
                multiSelect
                //defaultSelectedKeys={['Priority 1', 'Priority 2']}
                className="gdcDropDown"
                title={ele.helperText}
                onRenderLabel={onWrapDefaultLabelRenderer}
                {...ele.showError == true ? { className: "gdcDropDown requiredreddrop" } : { className: "gdcDropDown" }}
                //defaultSelectedKey={ele.options.filter(e => e.key == ele.value).length > 0 ? ele.options.filter(e => e.key == ele.value)[0].key : -1}
                defaultSelectedKeys={ele.selectedKeys}
                selectedKeys={ele.selectedKeys}
                options={ele.options}
                {...ele.options[0].color != null || ele.options[0].color != undefined ?
                  {
                    onRenderOption: this.onRenderOption,
                    onRenderTitle: this.onRenderTitle,
                    onRenderPlaceholder: this.onRenderPlaceholder
                  } : {}}
                onChange={(e, o) => this.handleChange(o, ele.id)}
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
          : [];

        return (
          <React.Fragment>
            <div className={ele.className}>
              <Dropdown
                placeholder={ele.placeholder}
                label={ele.label}
                options={options}
                {...ele.showError == true ? { className: "gdcDropDown requiredreddrop" } : { className: "gdcDropDown" }}
                //className="gdcDropDown"
                onChange={(e, o) => this.handleChange(o.key, ele.id)}
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
                {...ele.showError == true ? { className: "gdcRadioButton requiredred" } : { className: "gdcRadioButton" }}
                // className="gdcRadioButton"
                onChange={(e, o) => this.handleChange(o.key, ele.id)}
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
            {ele.helperText != null && ele.helperText != ""
              ? <TooltipHost
                tooltipProps={{
                  onRenderContent: () => (ReactHtmlParser(ele.helperText))
                }}
                //  {...ele.helperTextList ? 
                // {onRenderContent:
                //content={ele.helperText}
                styles={hostStyles}
              > <Icon iconName="Info" style={iconStyle} className="tooltip" ariaLabel="value required" />
              </TooltipHost>
              : <div></div>}
            <DatePicker
              allowTextInput
              //onBlur={elog('blur',this)}
              isMonthPickerVisible={false} showMonthPickerAsOverlay={true}
              placeholder={ele.placeholder}
              ariaLabel="Select a date"
              minDate={new Date(Date.now())}
              {...ele.showError == true ? { className: "requiredreddrop" } : { className: "" }}
              onSelectDate={(e) => this.handleChange(e.toLocaleDateString(), ele.id)}

            />
            {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
          </div>
        );
      case "SwitchInput":
        return (
          <React.Fragment>
            <div className={ele.className}>
              <Toggle
                {...ele.checked ? { className: "gdcSwitchInput black" } : { className: "gdcSwitchInput" }}
                //className="gdcSwitchInput"
                label={ele.label} onText={ele.options.onText} offText={ele.options.offText}
                onChange={(e, c) => this.handleChange(c, ele.id)}
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
        var firstCall = true;
        return (
          <div className="" >
            <div className={ele.className + " gdcColumnBlock"} >
            <Label  className="textfieldlabel">{ele.label} {ele.required ? <span className="gdcStar">*</span> : ""}
                {ele.helperText ?
                  <TooltipHost
                    tooltipProps={{
                      // onRenderContent :() => (<div>{ele.helperText}<ul><li>test</li></ul></div>)
                      onRenderContent: () => (ReactHtmlParser(ele.helperText))
                    }}
                    //  {...ele.helperTextList ? 
                    // {onRenderContent:
                    // content={tooltipcontent}
                    styles={hostStyles}
                  >
                    <Icon iconName="Info" className="tooltip" style={iconStyle} ariaLabel="value required" />
                  </TooltipHost>
                  : ""}
              </Label>
              <div key={ele.defaultValue}>
                <ReactQuill
                  defaultValue={ele.defaultValue}
                  preserveWhitespace={true}
                  {...ele.showError == true ? { className: "gdcMultiLine requiredred" } : { className: "gdcMultiLine" }}
                  placeholder={ele.placeholder}
                  onChange={(data, delta, source) => {
                    if (source != "api") {
                      this.handleChange(data, ele.id);
                    }
                  }}
                />
              </div>
              <div className="requireddiv">
                {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
              </div>
            </div>
          </div >
        );
      case "PeoplePickerInput":
        return (
          <div className={ele.className}>
            <div className="peoplepicker">
              <CustomPeoplePicker
                required={ele.required} spService={this.props.spService} pickerFieldName={ele.id} handlePeopleChange={this.handleChange} />
              {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
            </div>
          </div>
        );
      case "FileInput":
        return (
          <React.Fragment>
            <div className={ele.className + " filepicker"}>
              <p> {ele.placeholder}</p>
              <div className="fileInput" >
                <Label htmlFor="file-upload" className="custom-file-upload">
                  <Icon iconName="Attach" style={iconStyle} className="gdcAttachIcon" /> Add attachment
                </Label>
                <input type="file"
                  id="file-upload"
                  multiple
                  max-size={2000000}
                  
                  nv-file-select
                  onClick={handleClick}
                  onChange={e => this.onFileUpload(e, ele.id)} />
              </div>
              <p className="filenote">Accepts only less than 50mb </p>
              <div className="attachmentNames">{
                ele.files.map((n: any) => {
                  return (
                    <div className="gdcAttachmentsname">{n.name}
                      <Icon iconName="Cancel" onClick={e => { this.onFileDelete(n.name); }} />
                    </div>
                  );
                })}</div>
               
            </div>
            
          </React.Fragment>
        );
    }
  }
}
