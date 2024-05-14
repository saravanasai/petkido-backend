import dotEnv from "dotenv";
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import { rateLimit } from "express-rate-limit";
import requestIp from "request-ip";
import cors from "cors";
dotEnv.config();
import connectDB from "./src/db/index.js";
const app = express();
const port = process.env.APP_PORT;
app.use(morgan(":method :url :status - :response-time ms"));
app.use(requestIp.mw());
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*" // This might give CORS error for some origins due to credentials set to true
        : process.env.CORS_ORIGIN?.split(","), // For multiple cors origin for production. Refer https://github.com/hiteshchoudhary/apihub/blob/a846abd7a0795054f48c7eb3e71f3af36478fa96/.env.sample#L12C1-L12C12
  })
);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 60, // Limit each IP to 60 requests per `window`
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
app.use(limiter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import healthcheckRouter from "./src/routes/healthcheck.routes.js";

// * healthcheck
app.use("/api/v1/healthcheck", healthcheckRouter);

app.get("/", (req, res) => {
  res.send("Hello Worldsssss!");
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server started on port: ${port}`);
});
