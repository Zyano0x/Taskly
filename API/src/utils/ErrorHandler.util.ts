export enum ErrorType {
  VALIDATION = "ValidationError",
  UNAUTHORIZED = "UnauthorizedError",
  FORBIDDEN = "ForbiddenError",
  NOT_FOUND = "NotFoundError",
  CONFLICT = "ConflictError",
  INTERNAL_SERVER = "InternalServerError",
  BAD_REQUEST = "BadRequestError",
  RATE_LIMIT = "RateLimitError",
}

export class AppError extends Error {
  statusCode: number;
  status: "error" | "fail";
  isOperational: boolean;
  errorType: ErrorType;
  details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    errorType: ErrorType = ErrorType.INTERNAL_SERVER,
    details?: any,
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.errorType = errorType;
    this.details = details;

    // Ensures the error stack trace is captured correctly
    Error.captureStackTrace(this, this.constructor);
  }
}
