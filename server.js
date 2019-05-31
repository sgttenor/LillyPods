require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const unirest = require("unirest");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.get("/songs", async function(req, res) {
  const response = await unirest
  .get(
      'https://listen-api.listennotes.com/api/v2/search?q=star%20wars&sort_by_date=1')
  .header('X-ListenAPI-Key', 'dbb72be8f67f44a1869d4db98e80bf90');
  res.json({
      results : response.toJSON().body.results
  });
});


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
