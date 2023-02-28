export declare class JibitClient {
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
    setToken(token: string): void;
    ibansStatusCheck(ibans: string): Promise<any>;
    cardStatusCheck(card: string): Promise<any>;
    mobileAndNationalCodeCheck(mobile: string, nationalCode: string): Promise<any>;
    connect(): Promise<boolean>;
}
