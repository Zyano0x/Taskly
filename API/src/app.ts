import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

import config from "./configs/app.config";
import logger from "./configs/logger.config";
import {
  globalErrorHandler,
  handleNotFound,
  handleRateLimitError,
} from "./middlewares/Error.middleware";

import taskRoutes from "./routes/Task.route";

const app = express();

logger.info("================================================================");
logger.info("Initializing API");
logger.info("================================================================");
app.use(morgan(config.ENV === "development" ? "dev" : "default"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

logger.info("================================================================");
logger.info("Configuration");
logger.info("================================================================");
app.use(helmet());
app.use(
  rateLimit({
    limit: 100,
    windowMs: 60 * 60 * 1000,
    handler: handleRateLimitError,
    validate: {
      xForwardedForHeader: false,
    },
  })
);
app.use(cors());
app.use(cookieParser());

logger.info("================================================================");
logger.info("Define Controller Routing");
logger.info("================================================================");
app.use("/api/v1/tasks", taskRoutes);

app.get("/health", (req, res) => {
  try {
    res.status(200).json({ status: "healthy", timestamp: new Date() });
  } catch (error) {
    logger.error(error, "==> ERROR <==");
    res.status(500).json({ message: "Internal Server Error" });
  }
});

logger.info("================================================================");
logger.info("Define Routing Error");
logger.info("================================================================");
app.use(handleNotFound);
app.use(globalErrorHandler);

export default app;
