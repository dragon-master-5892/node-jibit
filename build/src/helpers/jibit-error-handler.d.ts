export declare class JibitErrorHandler extends Error {
    private error;
    constructor(error: any);
    getErrorDetails(): {
        code: string;
        message: string;
    };
    getRequestURL(): {
        code: string;
        message: string;
    };
}
