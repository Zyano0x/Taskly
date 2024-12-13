import { PrismaClient } from "@prisma/client";

import config from "./app.config";

const prisma = new PrismaClient({
  log:
    config.ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

export default prisma;
