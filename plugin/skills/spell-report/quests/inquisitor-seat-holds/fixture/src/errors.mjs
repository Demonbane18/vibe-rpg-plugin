// HTTP-mapped errors. The router turns `status` into the response code and `message` into { error }.
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export class BadRequest extends HttpError { constructor(field) { super(400, `Invalid ${field}`); } }
export class NotFound extends HttpError { constructor(what) { super(404, `No such ${what}`); } }
export class Gone extends HttpError { constructor(what) { super(410, `This ${what} has expired`); } }
export class SoldOut extends HttpError { constructor() { super(409, 'Not enough seats left'); } }
export class PaymentFailed extends HttpError { constructor(code) { super(402, `Payment failed: ${code}`); } }
