import * as React from 'react';
import styles from './GdcDevOpsAutomation.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField, ITextFieldProps } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
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

import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';

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
  multiSelectedKeys: string[];
  files: [];
  openPanel: boolean;
}

export default class GdcDevOpsAutomation extends React.Component<IDevOpsProps, IDevOpsState> {
  public requiredHasValues: boolean = true;
  public DescriptionData = "";
  public AttachmentAPI;
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
      showAddButton: false,
      multiSelectedKeys: [],
      files: [],
      openPanel: false
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
    // this.props.devOpsService.getLatestVer(81).then((data) => { console.log(data); });
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
    var fs = _.cloneDeep(fields);
    fs.map((f) => {
      if (f.type == "MultiLineTextInput") {
        this.UpdateRichText(f.value).then(mlt => {
          f.value = mlt;
        });
      }
      if (f.subFields != null && f.subFields.length > 0) {
        if (f.subFields.filter(sfo => sfo.active == true).length > 0) {
          f.subFields.filter(sfo => sfo.active == true)[0].fields.map((sf) => {
            if (sf.type == "MultiLineTextInput") {
              this.UpdateRichText(sf.value).then(smlt => {
                sf.value = smlt;
              });
            }
          });
        }
      }
    });
    return Promise.all(fs).then(d => {
      console.log("rich text", fields);
      return fields;
    });
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

  public async submitForm(addorupdate: string) {
    this.DescriptionData = "";
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
      this.appendAPI(_.cloneDeep(updatedformFields), APIData).then(dataReturned => {
        if (this.requiredHasValues && parentFieldsRequiredHasValues) {
          APIData = dataReturned.APIData;
          console.log(dataReturned);
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
            this.AttachFiles().then(fileUrls => {
              fileUrls.forEach(url => {
                // APIData.push({
                //   'op': 'add',
                //   'path': '/relations/-',
                //   'value': {
                //     'rel': 'AttachedFile',
                //     'url': url
                //   }
                // })
              });
            });
            //this.props.devOpsService.addAttachment(this.AttachmentAPI, data.id);
            this.setState({
              formFields: metaData,
              formSuccessMessage: "New Ojective has been created successfully with ID " + data.id,
              showMessage: true,
              showAddButton: false,
              openPanel: false
            });
            setTimeout(function () {
              this.setState({ showMessage: false });
            }.bind(this), 5000);
          });
        }
        else {
          stateCopy = dataReturned.Fields;
          this.setState({
            formFields: stateCopy
          });
        }
      });
    });
  }

  public onMultiSelectChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    console.log("multi", item);
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
      if (field.devopsName != "System.Description") {
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
          // requiredHasValues = data.requiredHasValues;
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
        showAddButton: true
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
      <div className="gdcPanelHeader">
        <div className="gdcPanelHeaderText"> GDC Intake Form </div>
        <div className="gdcPanelCloseButton">
          <Link onClick={(e) => { this.setState({ openPanel: false }) }}>
            <Icon iconName="Cancel" /> Close
          </Link>
        </div>
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <div className="gdcBorder">
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
          <Link onClick={(e) => { this.setState({ openPanel: true }) }} className="" underline>
            + New Intake Form
          </Link>
        </div>
        <Panel
          headerText="GDC Intake Form"

          isOpen={this.state.openPanel}
          type={PanelType.extraLarge}
          // onRenderNavigationContent={this.onRenderNavigationContent}
          onRenderHeader={this.onRenderNavigationContent}
          hasCloseButton={false}
          // closeButtonAriaLabel="Close"
          // onDismiss={(e) => { this.setState({ openPanel: false }) }}
          // headerClassName="gdcPanelHeader"
          className="gdcPanel"
      >
           <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row gdcPaddingBottom15">
              <div className="ms-Grid-col ms-sm12">
                <p className="questionTop">What team is request for?</p>
                {
                  Area.options.map(area => {
                    return (<DefaultButton text={area.text} className="headerButton" 
                      onClick={e => this.updateFormFields(area.text)
                              }
                    />);
                  })
                }
              </div>
              
            </div>
            {/* <div className="ms-Grid-row"> */}
              {
                this.state.formFields.map((ele) => {
                  return this.renderFields(ele);
                })
              }
              <div className={this.state.showAddButton ? "ms-Grid-col ms-sm4 " : "ms-Grid-col ms-sm4 gdcDisplayNone "}>
                <PrimaryButton text="Submit" className="gdcAddButton" onClick={() => this.submitForm("add")} />
                {/* <PrimaryButton text="Update" onClick={() => this.submitForm("update")} /> */}
              </div>
            {/* </div> */}
          </div>
        </Panel>
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
            
              <div className={ele.className}>
                <TextField label={ele.label}
                  onChange={(e, value) => this.handleChange(value, ele.title)}
                 className="textField"
               
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
        
            <div className={ele.className}>
              <Dropdown
                placeholder="Select an option"
                label={ele.label}
                options={ele.options}
                className="dropDown"
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
            <div className={ele.className}>
              <Dropdown
                placeholder="Select an option"
                label={ele.label}
                options={options}
                className="dropDown"
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
            
            <div className={ele.className +" abc "+ " gdcColumn6"}>
              <ChoiceGroup options={ele.options}
              className="choiceField"
                //styles={{ flexContainer: { display: "flex", margin: "5px" }, root: { marginRight: '30px', fontWeight: "500" } }}
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
          <div className={ele.className }>
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
          <div className="ms-Grid-row">
            <div className={ele.className + " gdcColumnBlock"}>
              <Label>{ele.label} {ele.required ? <span className="gdcStar">*</span> : ""}</Label>
              <ReactQuill  onChange={(data) => this.handleChange(data, ele.title)} />
              {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
            </div>
          </div>
        );
      case "MultiSelectInput":
        return (
          <React.Fragment>
            <div className={ele.className + " gdcColumn6"}>
              <Dropdown
                placeholder="Select multi option"
                label={ele.label}
                multiSelect
                options={ele.options}
                styles={{ title: { height: '50px', lineHeight: '45px', fontweight: '500px', color: 'black' }, dropdown: { marginTop: '20px', height: '50px', class: "dd" }, caretDown: { fontWeight: '500px', marginTop: '10px' }, dropdownOptionText: { fontWeight: '500px' }, }}
                onChange={this.onMultiSelectChange}
                required={ele.required}
                defaultSelectedKeys={this.state.multiSelectedKeys}

              />
              {ele.showError == true ? <div className="gdcerror">{ele.errorMessage}</div> : <div></div>}
            </div>
            {(ele.subFields != null) && (ele.subFields.length > 0) && (ele.subFields.filter(fi => fi.option == ele.value).length > 0)
              ? ele.subFields.filter(fi => fi.option == ele.value)[0].fields.map(se => this.renderFields(se))
              : null
            }
          </React.Fragment>
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
      case "FileInput":
        return (
          <React.Fragment>
            {/* <FilePicker
              bingAPIKey="<BING API KEY>"
              buttonLabel={"Please attach a file"}
              buttonClassName={styles.button}

              accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg", ".txt"]}
              buttonIcon="Upload"
              onSave={(filePickerResult: IFilePickerResult[]) => {
                this.setState({ filePickerResult })
                // this._onFilePickerSave(this.state.filePickerResult);
              }}
              onChange={(filePickerResult: IFilePickerResult[]) => { this.onFileUpload(filePickerResult) }}
              context={this.props.context}
            /> */}
            <input type="file" multiple onChange={e => this.onFileUpload(e)}></input>
          </React.Fragment>
        );
    }
  }
}
