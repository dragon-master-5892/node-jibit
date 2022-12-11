// JIBIT_API_KEY=XiPw_sOvy6
// JIBIT_SECRET_KEY=Ff2DocHUddQ0OKwRlX6GzXSfd

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

import axios from 'axios';

export default class JibitClient {
  apiKey: string;
  secretKey: string;

  accessToken: string = '';
  refreshToken: string = '';
  constructor(apiKey: string, secretKey: string) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  private async getToken() {
    const response = await axios.post(
      'https://napi.jibit.ir/ide/v1/tokens/generate',
      {
        apiKey: this.apiKey,
        secretKey: this.secretKey,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      this.accessToken = response.data.accessToken;
      this.refreshToken = response.data.refreshToken;
      return true;
    } else {
      return false;
    }
  }

  private async tryRefreshToken() {
    const response = await axios.post(
      'https://napi.jibit.ir/ide/v1/tokens/refresh',
      {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      this.accessToken = response.data.accessToken;
      this.refreshToken = response.data.refreshToken;
      return true;
    } else {
      return false;
    }
  }

  private getBearerToken() {
    return `Bearer ${this.accessToken}`;
  }

  private post() {}
  private get() {}
  private put() {}
  private delete() {}

  public async ibansStatusCheck(ibans: string) {
    const response = await axios.get(
      `https://napi.jibit.ir/ide/v1/ibans?value=${ibans}`,
      {
        headers: {
          Authorization: this.getBearerToken(),
        },
      }
    );
    if (response.status === 200) {
      return {
        success: true,
        value: response.data.value,
        ibanInfo: response.data.ibanInfo,
      };
    } else {
      return {success: false};
    }
  }

  public async cardStatusCheck(card: string) {
    const response = await axios.get(
      `https://napi.jibit.ir/ide/v1/cards?number=${card}`,
      {
        headers: {
          Authorization: this.getBearerToken(),
        },
      }
    );
    if (response.status === 200) {
      return {
        success: true,
        value: response.data.value,
        ibanInfo: response.data.ibanInfo,
      };
    } else {
      return {success: false};
    }
  }

  public async mobileAndNationalCodeCheck(
    mobile: string,
    nationalCode: string
  ) {
    const response = await axios.get(
      `https://napi.jibit.ir/ide/v1/services/matching?nationalCode=${nationalCode.trim()}&mobileNumber=${mobile}`,
      {
        headers: {
          Authorization: this.getBearerToken(),
        },
      }
    );
    if (response.status === 200) {
      return {
        success: true,
        value: response.data.value,
        ibanInfo: response.data.ibanInfo,
      };
    } else {
      return {success: false};
    }
  }
}
