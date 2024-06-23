export class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // Establece el prototipo explícitamente para asegurar que instanceof funcione correctamente
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const errorHandler = (statusCode: number, message: string): CustomError => {
  return new CustomError(statusCode, message);
}
