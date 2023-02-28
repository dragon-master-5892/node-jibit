import { JibitClientOptions, Bank, AccountToIBANResponse, InquiryIBANResponse, InquiryCardResponse, CardToAccountResponse } from './common';
import { AvailabilityReport, CardToIBANResponse, IdentitySimilarityResponse, InqueryPostalCodeResponse } from './common/interfaces';
import { BaseJibitClient } from './base-jibit-client';
export declare class JibitIdenticatorClient extends BaseJibitClient {
    private readonly endPoints;
    constructor(apiKey: string, secretKey: string, options?: JibitClientOptions);
    private normalizeIBAN;
    accountToIBAN(bankName: Bank, accountNumber: string): Promise<AccountToIBANResponse>;
    inquiryIBAN(iban: string): Promise<InquiryIBANResponse>;
    inquiryCard(cardNumber: string): Promise<InquiryCardResponse>;
    cardToAccount(card: string): Promise<CardToAccountResponse>;
    cardToIBAN(cardNumber: string): Promise<CardToIBANResponse>;
    isCardToIBANAccessible(): Promise<AvailabilityReport>;
    matchingIBANWithNationalCode(iban: string, nationalCode: string, birthDate: string): Promise<boolean>;
    matchingIBANWithFirstLastName(iban: string, fullName: string): Promise<boolean>;
    matchingCardWithFirstLastName(cardNumber: string, fullName: string): Promise<boolean>;
    matchingAccountWithFirstLastName(depositNumber: string, bank: Bank, fullName: string): Promise<boolean>;
    matchingCardWithNationalCode(cardNumber: string, nationalCode: string, birthDate: string): Promise<boolean>;
    matchingNationalCodeWithMobileNo(mobileNumber: string, nationalCode: string): Promise<boolean>;
    inqueryPostalCode(postalCode: string): Promise<InqueryPostalCodeResponse>;
    identitySimilarity(nationalCode: string, birthDate: string, firstName?: string, lastName?: string, fullName?: string, fatherName?: string): Promise<IdentitySimilarityResponse>;
}
