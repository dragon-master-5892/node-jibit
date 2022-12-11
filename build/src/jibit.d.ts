export default class JibitClient {
    apiKey: string;
    secretKey: string;
    accessToken: string;
    refreshToken: string;
    constructor(apiKey: string, secretKey: string);
    private getToken;
    private tryRefreshToken;
    private getBearerToken;
    private post;
    private get;
    private put;
    private delete;
    ibansStatusCheck(ibans: string): Promise<{
        success: boolean;
        value: any;
        ibanInfo: any;
    } | {
        success: boolean;
        value?: undefined;
        ibanInfo?: undefined;
    }>;
    cardStatusCheck(card: string): Promise<{
        success: boolean;
        value: any;
        ibanInfo: any;
    } | {
        success: boolean;
        value?: undefined;
        ibanInfo?: undefined;
    }>;
    mobileAndNationalCodeCheck(mobile: string, nationalCode: string): Promise<{
        success: boolean;
        value: any;
        ibanInfo: any;
    } | {
        success: boolean;
        value?: undefined;
        ibanInfo?: undefined;
    }>;
}
