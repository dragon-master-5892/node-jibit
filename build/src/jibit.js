"use strict";
// JIBIT_API_KEY=XiPw_sOvy6
// JIBIT_SECRET_KEY=Ff2DocHUddQ0OKwRlX6GzXSfd
Object.defineProperty(exports, "__esModule", { value: true });
// محمد شبیری FuDev, [11/19/22 2:24 PM]
// API Key: XiPw_sOvy6
// Secret Key: Ff2DocHUddQ0OKwRlX6GzXSfd
// محمد شبیری FuDev, [11/19/22 2:24 PM]
// استعلام شبا از شماره کارت
// استعلام هم خوانی اطلاعات ثبت احوال
// استعلام شبا
// استعلام همخوانی شماره کارت و کد ملی
// استعلام اطلاعات کارت
// استعلام آدرس از کد پستی
// استعلام هم خوانی شماره موبایل و کد ملی
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
    async ibansStatusCheck(ibans) {
        const response = await axios_1.default.get(`https://napi.jibit.ir/ide/v1/ibans?value=${ibans}`, {
            headers: {
                Authorization: this.getBearerToken(),
            },
        });
        if (response.status === 200) {
            return {
                success: true,
                value: response.data.value,
                ibanInfo: response.data.ibanInfo,
            };
        }
        else {
            return { success: false };
        }
    }
    async cardStatusCheck(card) {
        const response = await axios_1.default.get(`https://napi.jibit.ir/ide/v1/cards?number=${card}`, {
            headers: {
                Authorization: this.getBearerToken(),
            },
        });
        if (response.status === 200) {
            return {
                success: true,
                value: response.data.value,
                ibanInfo: response.data.ibanInfo,
            };
        }
        else {
            return { success: false };
        }
    }
    async mobileAndNationalCodeCheck(mobile, nationalCode) {
        const response = await axios_1.default.get(`https://napi.jibit.ir/ide/v1/services/matching?nationalCode=${nationalCode.trim()}&mobileNumber=${mobile}`, {
            headers: {
                Authorization: this.getBearerToken(),
            },
        });
        if (response.status === 200) {
            return {
                success: true,
                value: response.data.value,
                ibanInfo: response.data.ibanInfo,
            };
        }
        else {
            return { success: false };
        }
    }
}
exports.default = JibitClient;
//# sourceMappingURL=jibit.js.map