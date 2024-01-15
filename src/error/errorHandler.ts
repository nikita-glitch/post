
interface ErrorInterface {
  message: string;
  status: number;
}

class CustomError extends Error implements ErrorInterface {
  status: number;
  constructor(status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
  }

  static invalidToken(message: string) {
    return new CustomError(400, message)
  }
  
  static existingUser(message: string) {
    return new CustomError(400, message)
  }
}

export default CustomError;