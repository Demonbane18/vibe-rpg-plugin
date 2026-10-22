export class AppError extends Error {
  constructor(status, code, message, field) {
    super(message);
    this.status = status;
    this.code = code;
    this.field = field;
  }
}

export const notFound = (what) => new AppError(404, 'not_found', `${what} not found`);
export const invalid = (field, message) => new AppError(400, 'invalid_request', message, field);
