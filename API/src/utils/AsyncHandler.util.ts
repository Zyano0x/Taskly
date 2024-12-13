import { Request, Response, NextFunction } from "express";

interface AsyncFunction {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

const AsyncHandler =
  (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };

export default AsyncHandler;
