import * as React from "react";
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { IBasePickerSuggestionsProps, NormalPeoplePicker, IInputProps } from '@fluentui/react/lib/Pickers';
import { Label } from '@fluentui/react/lib/Label';
import { TooltipHost, ITooltipHostStyles, ITooltipProps } from '@fluentui/react/lib/Tooltip';
import { ISPService } from '../../../Services/ISPService';
import ReactHtmlParser from 'react-html-parser';
import { Icon } from '@fluentui/react/lib/Icon';

import { MetaDataType } from "./JSONInterface";


interface ICustomPeoplePickerProps {
    spService: ISPService;
    pickerField: MetaDataType;
    handlePeopleChange: any;
}

interface ICustomPeoplePickerState {
    selectedPeople: IPersonaProps[];
}
const iconStyle =
{
    cursor: 'pointer',
    marginLeft: '2px',
};

const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
const suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested People',
    mostRecentlyUsedHeaderText: 'Suggested Contacts',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading',
    showRemoveButtons: true,
    suggestionsAvailableAlertText: 'People Picker Suggestions available',
    suggestionsContainerAriaLabel: 'Suggested contacts'
};

export default class CustomPeoplePicker extends React.Component<ICustomPeoplePickerProps, ICustomPeoplePickerState> {
    public constructor(props) {
        super(props);
        this.state = {
            selectedPeople: []
        };
    }

    public render(): JSX.Element {
        return (
            <div>
                <Label>{this.props.pickerField.label} {this.props.pickerField.required ? <span className="gdcStar">*</span> : ""} {this.props.pickerField.helperText ?
                    <TooltipHost
                        tooltipProps={{
                            onRenderContent: () => (ReactHtmlParser(this.props.pickerField.helperText))
                        }}
                        styles={hostStyles}
                    >
                        <Icon iconName="Info" className="gdctooltip" style={iconStyle} ariaLabel="value required" />
                    </TooltipHost>
                    : ""}</Label>
                <NormalPeoplePicker
                    onResolveSuggestions={(t) => this.onFilterChanged(t)}
                    pickerSuggestionsProps={suggestionProps}
                    inputProps={
                        { placeholder: this.props.pickerField.placeholder }
                    }
                    className={this.props.pickerField.showError ? 'ms-PeoplePicker gdcrequiredred' : 'ms-PeoplePicker'}
                    key={'normal'}
                    selectionAriaLabel={'Selected contacts'}
                    removeButtonAriaLabel={'Remove'}
                    onInputChange={(i) => this.onInputChange(i)}
                    resolveDelay={300}
                    disabled={false}
                    itemLimit={1}
                    onChange={(si) => {
                        si.length > 0 ? this.props.handlePeopleChange(si[0], this.props.pickerField.id)
                            : this.props.handlePeopleChange("", this.props.pickerField.id);
                    }}
                />
            </div>
        );
    }

    public onFilterChanged(
        filterText: string
    ): IPersonaProps[] | Promise<IPersonaProps[]> {
        var filteredPersonas: IPersonaProps[];
        if (filterText && filterText.length >= 3) {
            this.props.spService.getOfficeUsers(filterText).then((data) => {
                if (data.length == 0) {
                    this.props.spService.getOfficeUsersAlt(filterText).then((dataFromEmail) => {
                        filteredPersonas = dataFromEmail.map((v, i) => {
                            console.log(i, "i");
                            return { Key: i, text: v.Title, secondaryText: v.Email };
                        });
                    });
                }
                else {
                    filteredPersonas = data.map((v, i) => {
                        return { Key: i, text: v.Title, secondaryText: v.Email };
                    });
                }
                return data;
            });
            return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(filteredPersonas), 2000));
        } else {
            return [];
        }
    }

    // /**
    //  * Takes in the picker input and modifies it in whichever way
    //  * the caller wants, i.e. parsing entries copied from Outlook (sample
    //  * input: "Aaron Reid <aaron>").
    //  *
    //  * @param input The text entered into the picker.
    //  */
    public onInputChange(input: string): string {
        const outlookRegEx = /<.*>/g;
        const emailAddress = outlookRegEx.exec(input);

        if (emailAddress && emailAddress[0]) {
            return emailAddress[0].substring(1, emailAddress[0].length - 1);
        }
        return input;
    }
}