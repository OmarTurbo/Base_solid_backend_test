import helmet from "helmet";
import "reflect-metadata";
import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { AppError } from "./utils";
import { globalErrorHandler } from "./middlewares";
import { authRouter } from "./modules/auth/auth.routes";
import { userRouter } from "./modules/user/user.routes";
import { messageRouter } from "./modules/message/message.routes";
import { floorRouter } from "./modules/floor/floor.routes";
import { unitRouter } from "./modules/unit/unit.routes";
import { excelRouter } from "./modules/excel/excel.routes";
import { apiLimiter } from "./config/rateLimiter";
import { env } from "./config/env";

export const app: Application = express();
const API_PREFIX = "/api/v1/kavi-mall";

app.set("trust proxy", 1);
app.use(helmet());
const allowedOrigins =
  env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) ?? [];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/user`, apiLimiter, userRouter);
app.use(`${API_PREFIX}/messages`, messageRouter);
app.use(`${API_PREFIX}/floors`, floorRouter);
app.use(`${API_PREFIX}/units`, unitRouter);
app.use(`${API_PREFIX}/excel`, apiLimiter, excelRouter);

app.all("/{*splat}", (req, _res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global error handler
app.use(globalErrorHandler);
