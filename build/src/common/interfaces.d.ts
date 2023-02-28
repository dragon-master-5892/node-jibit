import { Bank, BankAccountStatus, BankAvailability, CardType } from './types';
export interface TokenDto {
    accessToken: string;
    refreshToken: string;
}
export interface RefreshTokenDto {
    accessToken?: string;
    refreshToken: string;
}
export interface JibitClientOptions {
    baseUrl?: string;
    timeout?: number;
    jwtValidityDurationMinutes?: number;
    rtValidityDurationHours?: number;
}
export interface DepositToIBANInfo {
    bank: Bank;
    iban: string;
}
export interface Owner {
    firstName: string;
    lastName: string;
}
export interface IbanInfo {
    bank: Bank;
    depositNumber: string;
    iban: string;
    status: BankAccountStatus;
    owners: Owner[];
}
export interface AccountToIBANResponse {
    number: string;
    depositToIBANInfo: DepositToIBANInfo;
    ibanInfo: IbanInfo;
}
export interface InquiryIBANResponse {
    value: string;
    ibanInfo: IbanInfo;
}
export interface CardInfo {
    bank: Bank;
    type: CardType;
    ownerName: string;
    depositNumber: string;
}
export interface InquiryCardResponse {
    number: string;
    cardInfo: CardInfo;
}
export interface DepositInfo {
    bank: Bank;
    depositNumber: string;
}
export interface CardToAccountResponse {
    number: string;
    type: CardType;
    depositInfo: DepositInfo;
}
export interface CardToIBANResponse {
    number: string;
    type: CardType;
    ibanInfo: IbanInfo;
}
export declare type AvailabilityReport = Record<Bank, BankAvailability>;
export interface IsCardToIBANAccessibleResponse {
    availabilityReport: AvailabilityReport;
}
export interface MatchingResponse {
    matched: boolean;
}
export interface AddressInfo {
    postalCode: string;
    address: string;
    Province: string;
    district: string;
    street: string;
    floor: string;
    no: string;
}
export interface InqueryPostalCodeResponse {
    code: string;
    addressInfo: AddressInfo;
}
export interface IdentitySimilarityResponse {
    firstNameSimilarityPercentage: number;
    lastNameSimilarityPercentage: number;
    fullNameSimilarityPercentage: number;
    fatherNameSimilarityPercentage: number;
}
