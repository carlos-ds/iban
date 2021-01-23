const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";

const app = express();

app.use(requireHTTPS);
app.use(express.static(__dirname + "/dist/iban"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log(req.header("accept-language"));
  res.redirect("/en/");
});

app.listen(PORT, () => console.log(`App started on ${PORT}!`));

// https://stackoverflow.com/questions/8605720/how-to-force-ssl-https-in-express-js
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
