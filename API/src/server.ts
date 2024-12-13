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
import prisma from "./configs/database.config";

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
  })
);
app.use(cors());
app.use(cookieParser());

logger.info("================================================================");
logger.info("Define Controller Routing");
logger.info("================================================================");
app.use("/api/v1/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

logger.info("================================================================");
logger.info("Define Routing Error");
logger.info("================================================================");
app.use(handleNotFound);
app.use(globalErrorHandler);

logger.info("================================================================");
logger.info("Start Server");
logger.info("================================================================");
const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info("Database connected successfully");

    // Start the server
    const server = app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received. Shutting down gracefully");
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
