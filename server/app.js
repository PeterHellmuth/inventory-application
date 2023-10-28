const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

// Set up mongoose connection
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://peterhellmuth:${process.env.MONGOOSE_PASS}@cluster0.kterel9.mongodb.net/local_library?retryWrites=true&w=majority`;

async function main() {
  await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

const cors = require("cors");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
// Apply rate limiter to all requests
app.use(limiter);

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
const helmet = require("helmet");

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
