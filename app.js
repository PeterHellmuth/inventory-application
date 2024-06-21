const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

// Set up mongoose connection
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.set("debug", true);
const mongoDB = `mongodb+srv://peterhellmuth:${process.env.MONGOOSE_PASS}@cluster0.kterel9.mongodb.net/inventory_application?retryWrites=true&w=majority`;

console.log(
  `mongodb+srv://peterhellmuth:${process.env.MONGOOSE_PASS}@cluster0.kterel9.mongodb.net/inventory_application?retryWrites=true&w=majority`
);

async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB");
}
main().catch((err) => console.log(err));

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
const helmet = require("helmet");

const cors = require("cors");
const indexRouter = require("./routes/index");
const inventoryRouter = require("./routes/inventory");

const app = express();
// Apply rate limiter to all requests
app.use(limiter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
      "connect-src": ["'self'", "https://www.peterhellmuth.com"],
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const buildPath = path.normalize(path.join(__dirname, "./client/dist"));
app.use(express.static(buildPath));
app.use(
  cors({
    origin: ["https://www.peterhellmuth.com", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/inventory-application", indexRouter);
app.use("/inventory-application/inventory", inventoryRouter);

module.exports = app;
