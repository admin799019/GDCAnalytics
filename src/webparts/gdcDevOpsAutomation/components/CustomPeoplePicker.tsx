import * as React from "react";
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { IBasePickerSuggestionsProps, NormalPeoplePicker } from '@fluentui/react/lib/Pickers';
import { Label } from '@fluentui/react/lib/Label';

import { ISPService } from '../../../Services/ISPService';


interface ICustomPeoplePickerProps {
    spService: ISPService;
    pickerFieldName: string;
    handlePeopleChange: any;
    required: boolean;
}

interface ICustomPeoplePickerState {
    selectedPeople: IPersonaProps[];
}

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
                <Label>{this.props.pickerFieldName} {this.props.required ? <span className="gdcStar">*</span> : ""}</Label>
                <NormalPeoplePicker
                    onResolveSuggestions={(t) => this.onFilterChanged(t)}
                    pickerSuggestionsProps={suggestionProps}
                    className={'ms-PeoplePicker'}
                    key={'normal'}
                    
                    selectionAriaLabel={'Selected contacts'}
                    removeButtonAriaLabel={'Remove'}
                    onInputChange={(i) => this.onInputChange(i)}
                    resolveDelay={300}
                    disabled={false}
                    itemLimit={1}

                    onChange={(si) => {
                        si.length > 0 ? this.props.handlePeopleChange(si[0].secondaryText, this.props.pickerFieldName)
                            : this.props.handlePeopleChange("", this.props.pickerFieldName);
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
                console.log("users", data);
                filteredPersonas = data.value.map((v, i) => {
                    return { Key: i, text: v.displayName, secondaryText: v.mail };
                });
                return filteredPersonas;
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