export class JibitErrorHandler extends Error {
  constructor(private error: any) {
    super(
      error?.response?.data?.code +
        '(' +
        error?.response?.data?.message +
        ')' || error.message
    );
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, JibitErrorHandler.prototype);
  }

  public getErrorDetails(): {code: string; message: string} {
    return (
      this.error?.response?.data || {
        code: this.error.code,
        message: this.error.message,
      }
    );
  }

  public getRequestURL(): {code: string; message: string} {
    return this.error.request.path;
  }
}
