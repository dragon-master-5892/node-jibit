"use strict";
// محمد شبیری FuDev, [11/19/22 2:24 PM]
// استعلام شبا از شماره کارت
// استعلام هم خوانی اطلاعات ثبت احوال
// استعلام شبا
// استعلام همخوانی شماره کارت و کد ملی
// استعلام اطلاعات کارت
// استعلام آدرس از کد پستی
// استعلام هم خوانی شماره موبایل و کد ملی
Object.defineProperty(exports, "__esModule", { value: true });
exports.JibitIdenticatorClient = void 0;
const base_jibit_client_1 = require("./base-jibit-client");
class JibitIdenticatorClient extends base_jibit_client_1.BaseJibitClient {
    constructor(apiKey, secretKey, options) {
        super(apiKey, secretKey, options);
        this.endPoints = {
            matching: '/v1/services/matching',
            availability: '/v1/services/availability',
            cards: '/v1/cards',
            ibans: '/v1/ibans',
            deposits: '/v1/deposits',
            postal: '/v1/services/postal',
            identitySimilarity: '/v1/services/identity/similarity',
        };
    }
    normalizeIBAN(iban) {
        if (!iban) {
            throw 'invalid IBAN value';
        }
        let normalizedIBAN = iban.toUpperCase().trim();
        if (!normalizedIBAN.startsWith('IR')) {
            normalizedIBAN = `IR${iban}`;
        }
        return normalizedIBAN;
    }
    async accountToIBAN(bankName, accountNumber) {
        return this.get(this.endPoints.deposits, {
            bank: bankName,
            number: accountNumber,
            iban: true,
        });
    }
    async inquiryIBAN(iban) {
        return this.get(this.endPoints.ibans, {
            value: iban,
        });
    }
    async inquiryCard(cardNumber) {
        return this.get(this.endPoints.cards, {
            number: cardNumber,
        });
    }
    async cardToAccount(card) {
        return this.get(this.endPoints.cards, {
            number: card,
            deposit: true,
        });
    }
    async cardToIBAN(cardNumber) {
        return this.get(this.endPoints.cards, {
            number: cardNumber,
            iban: true,
        });
    }
    async isCardToIBANAccessible() {
        var _a;
        return (_a = (await this.get(this.endPoints.availability, { cardToIBAN: true }))) === null || _a === void 0 ? void 0 : _a.availabilityReport;
    }
    async matchingIBANWithNationalCode(iban, nationalCode, birthDate) {
        iban = this.normalizeIBAN(iban);
        if (birthDate.indexOf('/') > -1) {
            birthDate = birthDate.replace(/\//g, '');
        }
        return (await this.get(this.endPoints.matching, {
            iban,
            nationalCode,
            birthDate,
        })).matched;
    }
    async matchingIBANWithFirstLastName(iban, fullName) {
        const result = await this.get(this.endPoints.matching, {
            iban,
            name: fullName,
        });
        return result.matched;
    }
    async matchingCardWithFirstLastName(cardNumber, fullName) {
        const result = await this.get(this.endPoints.matching, {
            cardNumber,
            name: fullName,
        });
        return result.matched;
    }
    async matchingAccountWithFirstLastName(depositNumber, bank, fullName) {
        const result = await this.get(this.endPoints.matching, {
            bank,
            depositNumber,
            name: fullName,
        });
        return result.matched;
    }
    async matchingCardWithNationalCode(cardNumber, nationalCode, birthDate) {
        const result = await this.get(this.endPoints.matching, {
            cardNumber,
            nationalCode,
            birthDate,
        });
        return result.matched;
    }
    async matchingNationalCodeWithMobileNo(mobileNumber, nationalCode) {
        const result = await this.get(this.endPoints.matching, {
            mobileNumber,
            nationalCode,
        });
        return result.matched;
    }
    async inqueryPostalCode(postalCode) {
        return this.get(this.endPoints.postal, {
            code: postalCode,
        });
    }
    async identitySimilarity(nationalCode, birthDate, firstName, lastName, fullName, fatherName) {
        return this.get(this.endPoints.identitySimilarity, {
            nationalCode,
            birthDate,
            firstName,
            lastName,
            fullName,
            fatherName,
        });
    }
}
exports.JibitIdenticatorClient = JibitIdenticatorClient;
//# sourceMappingURL=jibit-identicator-client.js.map