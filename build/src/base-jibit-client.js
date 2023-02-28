"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseJibitClient = void 0;
const axios_1 = require("axios");
const moment = require("moment");
const events = require("events");
class BaseJibitClient extends events.EventEmitter {
    constructor(apiKey, secretKey, options) {
        super();
        this.apiKey = apiKey;
        this.secretKey = secretKey;
        this.options = options;
        this.BASE_URL = 'https://napi.jibit.ir/ide';
        this.accessToken = '';
        this.refreshToken = '';
        this.lastLogin = moment();
        this.client = axios_1.default.create({
            baseURL: (options === null || options === void 0 ? void 0 : options.baseUrl) || this.BASE_URL,
            timeout: (options === null || options === void 0 ? void 0 : options.timeout) || 5000,
        });
        this.client.interceptors.request.use(config => {
            if (config.headers === undefined) {
                config.headers = { Authorization: this.getBearerToken() };
            }
            else {
                config.headers.Authorization = this.getBearerToken();
            }
            return config;
        });
        this.on('error', () => { });
        this.on('login', () => { });
    }
    getBearerToken() {
        return `Bearer ${this.accessToken}`;
    }
    async login() {
        var _a, _b;
        try {
            const resp = await this.client.post('/v1/tokens/generate', {
                apiKey: this.apiKey,
                secretKey: this.secretKey,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (resp.status === 200) {
                this.lastLogin = moment(new Date());
                this.accessToken = (_a = resp.data) === null || _a === void 0 ? void 0 : _a.accessToken;
                this.refreshToken = (_b = resp.data) === null || _b === void 0 ? void 0 : _b.refreshToken;
                this.emit('login', this.accessToken, this.refreshToken, 'LOGIN SUCCESS 💚');
                return true;
            }
            else {
                this.emit('login-failed', resp.statusText);
                return false;
            }
        }
        catch (err) {
            this.emit('login-failed', err);
            return false;
        }
    }
    async loginByRefreshToken() {
        try {
            const reqBody = {
                accessToken: this.accessToken,
                refreshToken: this.refreshToken,
            };
            const resp = await this.client.post('/v1/tokens/refresh', reqBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (resp.status === 200) {
                this.lastLogin = moment(new Date());
                this.accessToken = resp.data.accessToken;
                this.refreshToken = resp.data.refreshToken;
                this.emit('token-refreshed', this.accessToken, this.refreshToken, new Date());
                return true;
            }
            else {
                console.error(resp.statusText);
                return false;
            }
        }
        catch (err) {
            console.debug(err);
            return false;
        }
    }
    async loginIfNeed(cb) {
        var _a, _b;
        // login for first time
        if (!this.accessToken) {
            const loggedIn = await this.login();
            if (!loggedIn) {
                throw new Error('can not login to jibit payment server');
            }
        }
        else if (this.lastLogin.diff(new Date(), 'minutes') >
            (((_a = this.options) === null || _a === void 0 ? void 0 : _a.jwtValidityDurationMinutes) || 30)) {
            //refresh token can be used if last login less than 24 houre another else must login again
            if (this.lastLogin.diff(new Date(), 'hours') <
                (((_b = this.options) === null || _b === void 0 ? void 0 : _b.rtValidityDurationHours) || 24)) {
                const loggedIn = await this.login();
                if (!loggedIn) {
                    throw new Error('can not login to jibit payment server');
                }
            }
            else {
                const loggedIn = await this.loginByRefreshToken();
                if (!loggedIn) {
                    throw new Error('can not login to jibit payment server');
                }
            }
        }
        return await cb();
    }
    emitError(error, throwErr = false) {
        this.emit('error', error);
        if (throwErr)
            throw error;
    }
    emitLog(data) {
        this.emit('log', data || 'no log data!!');
        return this;
    }
    async post(endPoint, data, config) {
        return this.loginIfNeed(() => new Promise((resolve, reject) => {
            this.client
                .post(endPoint, data, config)
                .then(resp => {
                resolve(resp.data);
            })
                .catch(err => {
                this.emitError(err);
                reject(err);
            });
        }));
    }
    async get(endPoint, params, config) {
        return this.loginIfNeed(() => new Promise((resolve, reject) => {
            this.client
                .get(endPoint, {
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
        }));
    }
}
exports.BaseJibitClient = BaseJibitClient;
//# sourceMappingURL=base-jibit-client.js.map