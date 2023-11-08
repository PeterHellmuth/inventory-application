const express = require("express");
const path = require("path");

const router = express.Router();
const buildPath = path.normalize(path.join(__dirname, "../client/dist"));
/* GET home page. */
console.log(path.join(buildPath, "index.html"));
router.get("/", (req, res, next) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

module.exports = router;
