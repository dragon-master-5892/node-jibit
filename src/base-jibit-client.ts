import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {TokenDto, JibitClientOptions, RefreshTokenDto} from './common';
import moment = require('moment');
import events = require('events');

export class BaseJibitClient extends events.EventEmitter {
  private readonly BASE_URL = 'https://napi.jibit.ir/ide';
  private readonly client: AxiosInstance;
  private accessToken = '';
  private refreshToken = '';
  private lastLogin = moment();

  constructor(
    private readonly apiKey: string,
    private readonly secretKey: string,
    private readonly options?: JibitClientOptions
  ) {
    super();

    this.client = axios.create({
      baseURL: options?.baseUrl || this.BASE_URL,
      timeout: options?.timeout || 5000,
    });

    this.client.interceptors.request.use(config => {
      if (config.headers === undefined) {
        config.headers = {Authorization: this.getBearerToken()};
      } else {
        config.headers.Authorization = this.getBearerToken();
      }
      return config;
    });
  }

  private getBearerToken() {
    return `Bearer ${this.accessToken}`;
  }

  private async login(): Promise<boolean> {
    try {
      const resp = await this.client.post<TokenDto>(
        '/v1/tokens/generate',
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
      if (resp.status === 200) {
        this.lastLogin = moment(new Date());
        this.accessToken = resp.data?.accessToken;
        this.refreshToken = resp.data?.refreshToken;
        this.emit(
          'login',
          this.accessToken,
          this.refreshToken,
          'LOGIN SUCCESS 💚'
        );
        return true;
      } else {
        this.emit('login-failed', resp.statusText);
        return false;
      }
    } catch (err) {
      this.emit('login-failed', err);
      return false;
    }
  }

  private async loginByRefreshToken(): Promise<boolean> {
    try {
      const reqBody: RefreshTokenDto = {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
      };
      const resp = await this.client.post<TokenDto>(
        '/v1/tokens/refresh',
        reqBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (resp.status === 200) {
        this.lastLogin = moment(new Date());
        this.accessToken = resp.data.accessToken;
        this.refreshToken = resp.data.refreshToken;
        this.emit(
          'token-refreshed',
          this.accessToken,
          this.refreshToken,
          new Date()
        );
        return true;
      } else {
        console.error(resp.statusText);
        return false;
      }
    } catch (err) {
      console.debug(err);
      return false;
    }
  }

  private async loginIfNeed<T>(cb: () => Promise<T>): Promise<T> {
    // login for first time
    if (!this.accessToken) {
      const loggedIn = await this.login();
      if (!loggedIn) {
        throw new Error('can not login to jibit payment server');
      }
    } else if (
      this.lastLogin.diff(new Date(), 'minutes') >
      (this.options?.jwtValidityDurationMinutes || 30)
    ) {
      //refresh token can be used if last login less than 24 houre another else must login again
      if (
        this.lastLogin.diff(new Date(), 'hours') <
        (this.options?.rtValidityDurationHours || 24)
      ) {
        const loggedIn = await this.login();
        if (!loggedIn) {
          throw new Error('can not login to jibit payment server');
        }
      } else {
        const loggedIn = await this.loginByRefreshToken();
        if (!loggedIn) {
          throw new Error('can not login to jibit payment server');
        }
      }
    }

    return await cb();
  }

  protected emitError(error: Error, throwErr = false) {
    this.emit('error', error);
    if (throwErr) throw error;
  }

  protected emitLog(data: any) {
    this.emit('log', data || 'no log data!!');
    return this;
  }

  protected async post<T>(
    endPoint: string,
    data?: any,
    config?: AxiosRequestConfig<T> | undefined
  ): Promise<T> {
    return this.loginIfNeed(
      () =>
        new Promise((resolve, reject) => {
          this.client
            .post<T>(endPoint, data, config)
            .then(resp => {
              resolve(resp.data);
            })
            .catch(err => {
              this.emitError(err);
              reject(err);
            });
        })
    );
  }

  protected async get<T>(
    endPoint: string,
    params?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<T> {
    return this.loginIfNeed(
      () =>
        new Promise((resolve, reject) => {
          this.client
            .get<T>(endPoint, {
              ...config,
              params,
            })
            .then(resp => {
              resolve(resp.data);
            })
            .catch(err => {
              this.emitError(err);
              reject(err);
            });
        })
    );
  }
}
