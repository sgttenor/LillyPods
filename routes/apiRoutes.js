var db = require("../models");
const passport = require("passport");

const unirest = require("unirest");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.send("/");
  });

  app.post("/api/signup", async function (req, res) {
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

  app.get("/api/podcasts/:search?", async function (req, res) {

    var search = req.params.search || "game of thrones";
    search = search.replace(/ /g, "%20");

    const response = await unirest
      .get(
        'https://listen-api.listennotes.com/api/v2/search?q=' + search + '&sort_by_date=1')
      .header('X-ListenAPI-Key', 'dbb72be8f67f44a1869d4db98e80bf90');

    var results = response.toJSON().body.results;
    var data = {
      podcasts: []
    };

    for (var i = 0; i < results.length; i++) {
      var currentPodcast = results[i];
      data.podcasts.push({
        id: currentPodcast.id,
        audio: currentPodcast.audio,
        title: currentPodcast.podcast_title_original,
        imageurl: currentPodcast.image
      })
    };
    res.json(data);
  });


  app.post("/api/playlist", function (req, res) {
    const data = { ...req.body };
    data.UserId = req.user.id;
    db.Podcast.create(data).then(function () {
      res.send("podcast added to playlist");
    });
  });

  app.put("/api/playlist/:id", function (req, res) {
    var id = req.params.id;

    console.log(id);

    Podcast.updateOne(id, function () {
      res.redirect("/playlist");
    });
  });

};