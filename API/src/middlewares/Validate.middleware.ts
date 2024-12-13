import { z } from "zod";
import { Request, Response, NextFunction } from "express";

import { mapZodValidationError } from "./Error.middleware";

const validate = (schema: z.AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        const validationError = mapZodValidationError(e);
        next(validationError);
      } else {
        next(e);
      }
    }
  };
};

export default validate;
