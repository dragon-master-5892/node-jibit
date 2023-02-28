// محمد شبیری FuDev, [11/19/22 2:24 PM]
// استعلام شبا از شماره کارت
// استعلام هم خوانی اطلاعات ثبت احوال
// استعلام شبا
// استعلام همخوانی شماره کارت و کد ملی
// استعلام اطلاعات کارت
// استعلام آدرس از کد پستی
// استعلام هم خوانی شماره موبایل و کد ملی

import axios, {AxiosInstance} from 'axios';
import {
  TokenDto,
  JibitClientOptions,
  Bank,
  AccountToIBANResponse,
  RefreshTokenDto,
  InquiryIBANResponse,
  InquiryCardResponse,
  CardToAccountResponse,
} from './common';
import moment = require('moment');
import events = require('events');
import {
  AvailabilityReport,
  CardToIBANResponse,
  IdentitySimilarityResponse,
  InqueryPostalCodeResponse,
  IsCardToIBANAccessibleResponse,
  MatchingResponse,
} from './common/interfaces';
import {BaseJibitClient} from './base-jibit-client';

export class JibitIdenticatorClient extends BaseJibitClient {
  private readonly endPoints = {
    matching: '/v1/services/matching',
    availability: '/v1/services/availability',
    cards: '/v1/cards',
    ibans: '/v1/ibans',
    deposits: '/v1/deposits',
    postal: '/v1/services/postal',
    identitySimilarity: '/v1/services/identity/similarity',
  };

  constructor(apiKey: string, secretKey: string, options?: JibitClientOptions) {
    super(apiKey, secretKey, options);
  }

  private normalizeIBAN(iban: string): string {
    if (!iban) {
      throw 'invalid IBAN value';
    }
    let normalizedIBAN = iban.toUpperCase().trim();
    if (!normalizedIBAN.startsWith('IR')) {
      normalizedIBAN = `IR${iban}`;
    }
    return normalizedIBAN;
  }

  public async accountToIBAN(
    bankName: Bank,
    accountNumber: string
  ): Promise<AccountToIBANResponse> {
    return this.get<AccountToIBANResponse>(this.endPoints.deposits, {
      bank: bankName,
      number: accountNumber,
      iban: true,
    });
  }

  public async inquiryIBAN(iban: string) {
    return this.get<InquiryIBANResponse>(this.endPoints.ibans, {
      value: iban,
    });
  }

  public async inquiryCard(cardNumber: string) {
    return this.get<InquiryCardResponse>(this.endPoints.cards, {
      number: cardNumber,
    });
  }

  public async cardToAccount(card: string) {
    return this.get<CardToAccountResponse>(this.endPoints.cards, {
      number: card,
      deposit: true,
    });
  }

  public async cardToIBAN(cardNumber: string) {
    return this.get<CardToIBANResponse>(this.endPoints.cards, {
      number: cardNumber,
      iban: true,
    });
  }

  public async isCardToIBANAccessible(): Promise<AvailabilityReport> {
    return (
      await this.get<IsCardToIBANAccessibleResponse>(
        this.endPoints.availability,
        {cardToIBAN: true}
      )
    )?.availabilityReport;
  }

  public async matchingIBANWithNationalCode(
    iban: string,
    nationalCode: string,
    birthDate: string
  ): Promise<boolean> {
    iban = this.normalizeIBAN(iban);

    if (birthDate.indexOf('/') > -1) {
      birthDate = birthDate.replace(/\//g, '');
    }
    return (
      await this.get<MatchingResponse>(this.endPoints.matching, {
        iban,
        nationalCode,
        birthDate,
      })
    ).matched;
  }

  public async matchingIBANWithFirstLastName(
    iban: string,
    fullName: string
  ): Promise<boolean> {
    const result = await this.get<MatchingResponse>(this.endPoints.matching, {
      iban,
      name: fullName,
    });
    return result.matched;
  }

  public async matchingCardWithFirstLastName(
    cardNumber: string,
    fullName: string
  ): Promise<boolean> {
    const result = await this.get<MatchingResponse>(this.endPoints.matching, {
      cardNumber,
      name: fullName,
    });
    return result.matched;
  }

  public async matchingAccountWithFirstLastName(
    depositNumber: string,
    bank: Bank,
    fullName: string
  ): Promise<boolean> {
    const result = await this.get<MatchingResponse>(this.endPoints.matching, {
      bank,
      depositNumber,
      name: fullName,
    });
    return result.matched;
  }

  public async matchingCardWithNationalCode(
    cardNumber: string,
    nationalCode: string,
    birthDate: string
  ): Promise<boolean> {
    const result = await this.get<MatchingResponse>(this.endPoints.matching, {
      cardNumber,
      nationalCode,
      birthDate,
    });
    return result.matched;
  }

  public async matchingNationalCodeWithMobileNo(
    mobileNumber: string,
    nationalCode: string
  ): Promise<boolean> {
    const result = await this.get<MatchingResponse>(this.endPoints.matching, {
      mobileNumber,
      nationalCode,
    });
    return result.matched;
  }

  public async inqueryPostalCode(postalCode: string) {
    return this.get<InqueryPostalCodeResponse>(this.endPoints.postal, {
      code: postalCode,
    });
  }

  public async identitySimilarity(
    nationalCode: string,
    birthDate: string,
    firstName?: string,
    lastName?: string,
    fullName?: string,
    fatherName?: string
  ) {
    return this.get<IdentitySimilarityResponse>(
      this.endPoints.identitySimilarity,
      {
        nationalCode,
        birthDate,
        firstName,
        lastName,
        fullName,
        fatherName,
      }
    );
  }
}
