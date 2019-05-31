var db = require("../models");
const passport = require("passport");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.send("/");
  });

  app.post("/api/signup", async function(req, res) {
    console.log(req.body);
    // destructuring
    const { email, password } = req.body;

    // Old way
    // const email = req.body.email;
    // const password = req.body.password;
    const user = await db.User.findOne({
      where: {
        email
      }
    });
    console.log("USER", user);
    if (user) {
      return res.json({
        message: "user already exists"
      });
    } else {
      try {
        await db.User.create({
          email,
          password
        });
        res.redirect(307, "/api/login");
      } catch (e) {
        res.json({
          message: "Error creating user"
        });
      }
    }
  });
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
