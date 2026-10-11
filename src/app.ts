import helmet from "helmet";
import "reflect-metadata";
import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { AppError } from "./utils";
import { globalErrorHandler }  from "./middlewares";
import { authRouter } from "./modules/auth/auth.routes";
import { userRouter } from "./modules/user/user.routes";
import { messageRouter } from "./modules/message/message.routes";
import { excelRouter } from "./modules/excel/excel.routes";
import { apiLimiter } from "./config/rateLimiter";
import { env } from "./config/env";

export const app: Application = express();

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

app.use("/api/v1/test/auth", authRouter);
app.use("/api/v1/test/user", apiLimiter, userRouter);
app.use("/api/v1/test/messages", messageRouter);
app.use("/api/v1/excel", apiLimiter, excelRouter);

app.all("/{*splat}", (req, _res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global error handler
app.use(globalErrorHandler);
