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
exports.JibitClient = void 0;
const axios_1 = require("axios");
class JibitClient {
    constructor(apiKey, secretKey) {
        this.accessToken = '';
        this.refreshToken = '';
        this.apiKey = apiKey;
        this.secretKey = secretKey;
    }
    async getToken() {
        const response = await axios_1.default.post('https://napi.jibit.ir/ide/v1/tokens/generate', {
            apiKey: this.apiKey,
            secretKey: this.secretKey,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            this.accessToken = response.data.accessToken;
            this.refreshToken = response.data.refreshToken;
            return true;
        }
        else {
            return false;
        }
    }
    async tryRefreshToken() {
        const response = await axios_1.default.post('https://napi.jibit.ir/ide/v1/tokens/refresh', {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            this.accessToken = response.data.accessToken;
            this.refreshToken = response.data.refreshToken;
            return true;
        }
        else {
            return false;
        }
    }
    getBearerToken() {
        return `Bearer ${this.accessToken}`;
    }
    post() { }
    get() { }
    put() { }
    delete() { }
    setToken(token) {
        this.accessToken = token;
    }
    async ibansStatusCheck(ibans) {
        const response = await axios_1.default.get(`https://napi.jibit.ir/ide/v1/ibans?value=${ibans}`, {
            headers: {
                Authorization: this.getBearerToken(),
            },
        });
        return {
            success: response.status === 200,
            ...response.data,
        };
    }
    async cardStatusCheck(card) {
        const response = await axios_1.default.get(`https://napi.jibit.ir/ide/v1/cards?number=${card}`, {
            headers: {
                Authorization: this.getBearerToken(),
            },
        });
        return {
            success: response.status === 200,
            ...response.data,
            // value: response.data.value,
            // ibanInfo: response.data.ibanInfo,
            // cardNumber:response.data.number,
            // cardInfo:response.data.
            // respData: response.data,
        };
    }
    async mobileAndNationalCodeCheck(mobile, nationalCode) {
        const response = await axios_1.default.get(`https://napi.jibit.ir/ide/v1/services/matching?nationalCode=${nationalCode.trim()}&mobileNumber=${mobile}`, {
            headers: {
                Authorization: this.getBearerToken(),
            },
        });
        return {
            success: response.status === 200,
            ...response.data,
        };
    }
    async connect() {
        return this.getToken();
    }
}
exports.JibitClient = JibitClient;
//# sourceMappingURL=jibit.js.map