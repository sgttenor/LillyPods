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
  //post Podcast query
  app.post("/", function(req, res) {
    db.Podcast.findAll({}).then(function(dbPodcast) {
      res.json(dbPodcast).req.body.audio;
    });
  });
  
 

  // Create a new example
  app.post("/api/podcasts", function(req, res) {
    db.Podcast.create(req.body).then(function(dbPodcast) {
      res.json(dbPodcast);
      console.log(results.listennotes_url);
      console.log(results.description_original);
    });
  });

  // Delete an example by id
  app.delete("/api/podcasts/:id", function(req, res) {
    db.Podcast.destroy({ where: { id: req.params.id } }).then(function(
      dbPodcast
    ) {
      res.json(dbPodcast);
    });
  });
};

// Get podcasts
app.get("/podcasts", async function (req, res) {
  const response = await unirest
    .get(
      'https://listen-api.listennotes.com/api/v2/search?q=star%20wars&sort_by_date=1')
    .header('X-ListenAPI-Key', 'dbb72be8f67f44a1869d4db98e80bf90');
/*    console.log("resultados : ", response);
   res.render("index", response);  */
   var results = response.toJSON().body.results;
   /* console.log("resultados: ", results) */
      var data = {
       podcasts : []
      };

   for (var i=0; i < results.length; i++){
    var currentPodcast = results[i];
    data.podcasts.push({
      id :      currentPodcast.id, 
      audio :   currentPodcast.audio, 
      title :   currentPodcast.podcast_title_original,
      imageurl :currentPodcast.image})
   };
   console.log("objeto data :",data);
  /*  var obj =
    {results: response.toJSON().body.results
    }
    console.log("nuestro objeto: ", obj) */;
  res.render("index",data);
/*    res = data;
 return; */