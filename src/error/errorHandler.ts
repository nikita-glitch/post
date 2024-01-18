interface ErrorInterface {
  message: string;
  status: number;
}

enum StatusCodes {
  BAD_REQUEST = 400,
  UNAUTORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

class CustomError extends Error implements ErrorInterface {
  status: number;
  constructor(status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  static invalidToken(message: string) {
    return new CustomError(StatusCodes.BAD_REQUEST, message);
  }
  static existingEntity(message: string) {
    return new CustomError(StatusCodes.BAD_REQUEST, message);
  }
  static wrongLogPass(message: string) {
    return new CustomError(StatusCodes.BAD_REQUEST, message);
  }
  static forbidden(message: string) {
    return new CustomError(StatusCodes.FORBIDDEN, message);
  }
  static unautorized(message: string) {
    return new CustomError(StatusCodes.UNAUTORIZED, message);
  }
  static notFound(message: string) {
    return new CustomError(StatusCodes.NOT_FOUND, message);
  }
  static emptyRequest(message: string) {
    return new CustomError(StatusCodes.NOT_FOUND, message);
  }
}

export default CustomError;
