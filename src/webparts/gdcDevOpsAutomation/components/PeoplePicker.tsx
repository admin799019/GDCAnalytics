import * as React from 'react';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { IBasePickerSuggestionsProps, NormalPeoplePicker, ValidationState } from '@fluentui/react/lib/Pickers';
//import { people, mru } from '@fluentui/example-data';

import { ISPService } from '../../../Services/ISPService';

const suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested People',
    mostRecentlyUsedHeaderText: 'Suggested Contacts',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading',
    showRemoveButtons: true,
    suggestionsAvailableAlertText: 'People Picker Suggestions available',
    suggestionsContainerAriaLabel: 'Suggested contacts',
};

let people;
let mru;


const [delayResults, setDelayResults] = React.useState(false);
const [isPickerDisabled, setIsPickerDisabled] = React.useState(false);
const [mostRecentlyUsed, setMostRecentlyUsed] = React.useState<IPersonaProps[]>(mru);
const [peopleList, setPeopleList] = React.useState<IPersonaProps[]>(people);

const picker = React.useRef(null);

interface IPeoplePickerProps {
    spService: ISPService;
}

export default class CustomPeoplePicker extends React.Component<IPeoplePickerProps, any> {

    public constructor(props) {
        super(props);
    }

    public componentDidMount() {
        // this.props.spService.getOfficeUsers("user").then((data) => {
        //     console.log("users", data);
        // });
    }

    // public onFilterChanged(
    //     filterText: string,
    //     currentPersonas: IPersonaProps[],
    //     limitResults?: number,
    // ): IPersonaProps[] | Promise<IPersonaProps[]> {
    //     if (filterText) {
    //         let filteredPersonas: IPersonaProps[] = this.filterPersonasByText(filterText);

    //         filteredPersonas = this.removeDuplicates(filteredPersonas, currentPersonas);
    //         filteredPersonas = limitResults ? filteredPersonas.slice(0, limitResults) : filteredPersonas;
    //         return this.filterPromise(filteredPersonas);
    //     } else {
    //         return [];
    //     }
    // }

    // public filterPromise(personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
    //     if (delayResults) {
    //         return this.convertResultsToPromise(personasToReturn);
    //     } else {
    //         return personasToReturn;
    //     }
    // }



    // public filterPersonasByText(filterText: string): IPersonaProps[] {
    //     return peopleList.filter(item => this.doesTextStartWith(item.text as string, filterText));
    // }

    // public onRemoveSuggestion = (item: IPersonaProps): void => {
    //     const indexPeopleList: number = peopleList.indexOf(item);
    //     const indexMostRecentlyUsed: number = mostRecentlyUsed.indexOf(item);

    //     if (indexPeopleList >= 0) {
    //         const newPeople: IPersonaProps[] = peopleList
    //             .slice(0, indexPeopleList)
    //             .concat(peopleList.slice(indexPeopleList + 1));
    //         setPeopleList(newPeople);
    //     }

    //     if (indexMostRecentlyUsed >= 0) {
    //         const newSuggestedPeople: IPersonaProps[] = mostRecentlyUsed
    //             .slice(0, indexMostRecentlyUsed)
    //             .concat(mostRecentlyUsed.slice(indexMostRecentlyUsed + 1));
    //         setMostRecentlyUsed(newSuggestedPeople);
    //     }
    // }

    // public doesTextStartWith(text: string, filterText: string): boolean {
    //     return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
    // }

    // public removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    //     return personas.filter(persona => !this.listContainsPersona(persona, possibleDupes));
    // }

    // public listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    //     if (!personas || !personas.length || personas.length === 0) {
    //         return false;
    //     }
    //     return personas.filter(item => item.text === persona.text).length > 0;
    // }

    // public convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
    //     return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
    // }

    // public getTextFromItem(persona: IPersonaProps): string {
    //     return persona.text as string;
    // }

    // public validateInput(input: string): ValidationState {
    //     if (input.indexOf('@') !== -1) {
    //         return ValidationState.valid;
    //     } else if (input.length > 1) {
    //         return ValidationState.warning;
    //     } else {
    //         return ValidationState.invalid;
    //     }
    // }

    /**
     * Takes in the picker input and modifies it in whichever way
     * the caller wants, i.e. parsing entries copied from Outlook (sample
     * input: "Aaron Reid <aaron>").
     *
     * @param input The text entered into the picker.
     */
    // public onInputChange(input: string): string {
    //     const outlookRegEx = /<.*>/g;
    //     const emailAddress = outlookRegEx.exec(input);

    //     if (emailAddress && emailAddress[0]) {
    //         return emailAddress[0].substring(1, emailAddress[0].length - 1);
    //     }

    //     return input;
    // }

    public render() : JSX.Element {
        return (
            <div>test pp
                {/* <NormalPeoplePicker
                    // eslint-disable-next-line react/jsx-no-bind
                    onResolveSuggestions={this.onFilterChanged}
                    // eslint-disable-next-line react/jsx-no-bind
                    // onEmptyInputFocus={returnMostRecentlyUsed}
                    getTextFromItem={this.getTextFromItem}
                    pickerSuggestionsProps={suggestionProps}
                    className={'ms-PeoplePicker'}
                    key={'normal'}
                    // eslint-disable-next-line react/jsx-no-bind
                    onRemoveSuggestion={this.onRemoveSuggestion}
                    onValidateInput={this.validateInput}
                    selectionAriaLabel={'Selected contacts'}
                    removeButtonAriaLabel={'Remove'}
                    inputProps={{
                        onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
                        onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
                        'aria-label': 'People Picker',
                    }}
                    componentRef={picker}
                    onInputChange={this.onInputChange}
                    resolveDelay={300}
                    disabled={isPickerDisabled}
                /> */}
            </div>
        );
    }
}