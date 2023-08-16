import { allCountries, CountryData, Region } from 'country-region-data';
import { FORM_ERROR } from 'final-form';


export interface PaymentWidgetInterface {
    [key: string]: any;
    billingCountry: string;
    billingAddressLine1: string;
    billingAddressLine2: string;
    billingZipCode: string;
    billingCity: string;
    billingState: string;
}

export class PaymentWidgetFormFields implements PaymentWidgetInterface {
    [key: string]: any;
    billingCountry = '';
    billingAddressLine1 = '';
    billingAddressLine2 = '';
    billingZipCode = "";
    billingCity = "";
    billingState = "";
}

export interface Option {
    value: string;
    label: string;
}

const parseCountryToOptions = (items: CountryData[]): Option[] => {

    let data = items.map(item => {
        return { label: item[0], value: item[1] };
    });

    return data;
}

const filterStateByCountry = (countryCode: string, countries: CountryData[]): Option[] => {
    //console.log('filterStateByCountry countryCode ==>', countryCode)
    const stateData = countries.find(item => (item[1] === countryCode))


    //console.log('filterStateByCountry ==>', stateData, ' stateData[0] ==>', stateData?.[2])

    let data: Option[] = [];

    if (stateData) {
        data = stateData[2].map((item: Region) => {
            return (<Option>({ label: item[0], value: item[1] }));
        });
    }

    return data;
}


export interface FormError {
    guest?: string;
    payment?: string;
}

export interface ValidationErrors {
    // TODO these are just the FormFields property names but nullable---can we be DRY?
    cardName?: string;
    cardNumber?: string;
    cardExpirationMonth?: string;
    cardExpirationYear?: string;
    cardCVV?: string;
    cardCVVError?: string;
    billingCountry?: string;
    billingAddressLine1?: string;
    billingAddressLine2?: string;
    billingCity?: string;
    billingState?: string;
    billingZipCode?: string;
    [FORM_ERROR]?: FormError;
}


export const countries: Option[] = parseCountryToOptions(allCountries);

export const getStateByCountry = (countryCode: string) => filterStateByCountry(countryCode, allCountries);