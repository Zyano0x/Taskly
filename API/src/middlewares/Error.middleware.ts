import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import config from "../configs/app.config";
import logger from "../configs/logger.config";
import { AppError, ErrorType } from "../utils/ErrorHandler.util";

interface ErrorResponse {
  status: "error" | "fail";
  errorType: ErrorType;
  message: string;
  details?: any;
  stack?: string;
}

const mapZodValidationError = (err: z.ZodError): AppError => {
  const errors = err.errors.map((e) => ({
    field: e.path.join("."),
    message: e.message,
  }));

  return new AppError(
    "Validation Failed",
    StatusCodes.BAD_REQUEST,
    ErrorType.VALIDATION,
    { errors },
  );
};

const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Default to internal server error
  let error =
    err instanceof AppError
      ? err
      : new AppError(
          "Internal Server Error",
          StatusCodes.INTERNAL_SERVER_ERROR,
        );

  // Map specific error types
  if (err instanceof z.ZodError) {
    error = mapZodValidationError(err);
  }

  // Logging (replace with your preferred logging mechanism)
  // console.error("==> ERROR <==", error);
  logger.error(error, "==> ERROR <==");

  // Environment-specific response
  const responseBody: ErrorResponse = {
    status: error.status,
    errorType: error.errorType,
    message: error.message,
    details: error.details,
    ...(config.ENV === "development" && { stack: error.stack }),
  };

  // Send error response
  res.status(error.statusCode).json(responseBody);
};

const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    StatusCodes.NOT_FOUND,
    ErrorType.NOT_FOUND,
  );
  next(err);
};

const handleRateLimitError = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const err = new AppError(
    "Too many requests, please try again later",
    StatusCodes.TOO_MANY_REQUESTS,
    ErrorType.RATE_LIMIT,
  );
  next(err);
};

export {
  globalErrorHandler,
  handleNotFound,
  handleRateLimitError,
  mapZodValidationError,
};
