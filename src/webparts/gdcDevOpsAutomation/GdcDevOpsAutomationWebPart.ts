import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp/presets/all";
import { graph } from "@pnp/graph";

import { initializeIcons } from '@fluentui/font-icons-mdl2';

// import '@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss';
// 'office-ui-fabric-react/dist/css/fabric.min.css';

import styles from './components/GdcDevOpsAutomation.module.scss';

import * as strings from 'GdcDevOpsAutomationWebPartStrings';
import GdcDevOpsAutomation from './components/GdcDevOpsAutomation';
import { IGdcDevOpsAutomationProps } from './components/IGdcDevOpsAutomationProps';
import { IDevOpsService } from '../../Services/IDevOpsService';
import { DevOpsService } from '../../Services/DevOpsService';
import { ISPService } from '../../Services/ISPService';
import { SPService } from '../../Services/SPService';


initializeIcons();

export interface IDevOpsProps {
  devOpsService: IDevOpsService;
}

export interface IGdcDevOpsAutomationWebPartProps {
  description: string;
}

export default class GdcDevOpsAutomationWebPart extends BaseClientSideWebPart<IGdcDevOpsAutomationWebPartProps> {

  private devOpsService: IDevOpsService;
  private spService: ISPService;

  public onInit(): Promise<void> {
    const serviceScope = this.context.serviceScope;
    this.devOpsService = serviceScope.consume(DevOpsService.serviceKey);
    // return Promise.resolve();
    this.spService = new SPService(this.context.pageContext, this.context.msGraphClientFactory,this.context);

    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
      graph.setup({
        spfxContext: this.context
      });
    });
    
  }

  public render(): void {
    const element: React.ReactElement<IGdcDevOpsAutomationProps> = React.createElement(
      GdcDevOpsAutomation,
      {
        devOpsService: this.devOpsService,
        spService : this.spService,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
