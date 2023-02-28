/// <reference types="node" />
import { AxiosRequestConfig } from 'axios';
import { JibitClientOptions } from './common';
import events = require('events');
export declare class BaseJibitClient extends events.EventEmitter {
    private readonly apiKey;
    private readonly secretKey;
    private readonly options?;
    private readonly BASE_URL;
    private readonly client;
    private accessToken;
    private refreshToken;
    private lastLogin;
    constructor(apiKey: string, secretKey: string, options?: JibitClientOptions | undefined);
    private getBearerToken;
    private login;
    private loginByRefreshToken;
    private loginIfNeed;
    protected emitError(error: Error, throwErr?: boolean): void;
    protected post<T>(endPoint: string, data?: any, config?: AxiosRequestConfig<T> | undefined): Promise<T>;
    protected get<T>(endPoint: string, params?: any, config?: AxiosRequestConfig<any> | undefined): Promise<T>;
}
