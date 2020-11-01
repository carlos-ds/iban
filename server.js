const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/dist/iban"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/<name-of-app>/index.html"));
});

app.listen(process.env.PORT || 8080, () => console.log("App started!"));