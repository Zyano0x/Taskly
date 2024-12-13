import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const config = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3005,
  HOST: process.env.HOST || "localhost",
  ENV: process.env.NODE_ENV || "development",
};

export default config;
