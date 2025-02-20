const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");
const { setupSwagger} = require("./app/utils/swagger")

// const corsOptions = {
//   origin: "http://example.com", // frontend domain
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

const app = express();

app.use(cors());

// setup swagger 
setupSwagger(app)

const v1 = "/api/v1/";

// setup timestampt on morgan logger
function formatWithIntl(isoString) {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-GB", options)
      .format(date)
      .replace(",", "");
  }
  
  logger.token("timestamp", () => {
    const date = new Date().toISOString();
    return formatWithIntl(date);
  });

const authRouter = require("./app/api/v1/auth/router");
const platformRouter = require("./app/api/v1/platform/router")
const brandRouter = require("./app/api/v1/brand/router")

// app.use(logger("dev"));
app.use(logger(":timestamp :method :url :status :response-time ms"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(v1, authRouter);
app.use(v1, platformRouter);
app.use(v1, brandRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);



module.exports = app;
