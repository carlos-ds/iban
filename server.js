const express = require("express");
const path = require("path");

const app = express();

app.use(requireHTTPS);
app.use(express.static(__dirname + "/dist/iban"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/<name-of-app>/index.html"));
});

app.listen(process.env.PORT || 8080, () => console.log("App started!"));

// https://stackoverflow.com/questions/8605720/how-to-force-ssl-https-in-express-js
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
