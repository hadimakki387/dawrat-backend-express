import bodyParser from "body-parser";
import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";
import compression from "compression"
import { ApiError, errorConverter, errorHandler } from "./modules/errors";
import httpStatus from "http-status";
import router from "./routes";

const app: Express = express();

// set security HTTP headers
app.use(helmet());

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// parse json request body
app.use(express.json());

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(ExpressMongoSanitize())

// gzip compression
app.use(compression())

// api routes
app.use('/',router)

//return 404 for any unknown api
app.use((_req, _res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert errors to ApiErrors, if needed
app.use(errorConverter)

//handle error
app.use(errorHandler)

export default app;