var db = require("../models");
const passport = require("passport");

const unirest = require("unirest");
var http = require("http");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.send("/");
  });

  app.post("/api/signup", async function (req, res) {
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
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    data.podcasts.destroy({ where: { id: req.params.id } }).then(function (
      
    ) {
      res.json(dbPodcast);
    });
  });

  // Get podcasts
  app.get("/podcasts/:search?", async function (req, res) {
    const search = req.params.search || "star wars";
    const response = await unirest
      .get(
        'https://listen-api.listennotes.com/api/v2/search?q=' + search + '&sort_by_date=1')
      .header('X-ListenAPI-Key', 'dbb72be8f67f44a1869d4db98e80bf90');
    /*    console.log("resultados : ", response);
        res.render("index", response);  */
    var results = response.toJSON().body.results;
    /* console.log("resultados: ", results) */
    var data = {
      podcasts: [],
      name: search
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
    console.log("objeto data :", data);
    /*  var obj =
      {results: response.toJSON().body.results
      }
      console.log("nuestro objeto: ", obj) */;
    res.render("podcast", data);
    /*    res = data;
       return; */

    /*     res.json({
          results: response.toJSON().body.results
        }); */
  });



  app.get("/api/podcasts/:search?", async function (req, res) {
    // var userSearch = "#podcast-search";
    // console.log(userSearch);
    var search = req.params.search || "game of thrones";
    search = search.replace(/ /g,"%20");
    var test = search;
    test = test.replace(/ /g,"%20");
    console.log("new string search: ",test);

    console.log("old string search:", search);

    const response = await unirest
      .get(
        'https://listen-api.listennotes.com/api/v2/search?q=' + test + '&sort_by_date=1')
      .header('X-ListenAPI-Key', 'dbb72be8f67f44a1869d4db98e80bf90');
    // console.log("resultados : ", response);
    //    res.render("index", response);
    var results = response.toJSON().body.results;
    /* console.log("resultados: ", results) */
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
    console.log("objeto data :", data);
  /*  var obj =
    {results: response.toJSON().body.results
    }
    console.log("nuestro objeto: ", obj) */;
    res.json(data);
    
    /*    res = data;
     return; */

    /*     res.json({
        results: response.toJSON().body.results
      }); */
  });


  app.get('/playlist', async function(req, res) {
    /* console.log("resultados: ", results) */
    const response = await unirest
    .get(
      'https://listen-api.listennotes.com/api/v2/search?q='  + '&sort_by_date=1')
    .header('X-ListenAPI-Key', 'dbb72be8f67f44a1869d4db98e80bf90');
  // console.log("resultados : ", response);
  //    res.render("index", response);
  var results = response.toJSON().body.results;
  /* console.log("resultados: ", results) */
  var data = {
    podcasts: []
  };
    
    res.render("/playlist", data);
    });

    
 

};