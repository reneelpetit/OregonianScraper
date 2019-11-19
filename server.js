var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/unit1Populater", { useNewUrlParser: true });

app.get("/articles", function(req , res) {
  axios.get("https://www.oregonlive.com/").then(function(response) {
    var $ = cheerio.load(response.data);
    var result = [];
    console.log("var $ is ", $);
    $("article h2").each(function(i, element) {
      articleTitle = $(this)
        .children("a")
        .text();
      articleLink = $(this)
        .children("a") 
        .attr("href");

       result.push(articleTitle, articleLink);

        db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
      });
    });
    return result;
  });
});

// app.get("/articles", function(req, res) {
//   console.log("route /articles request is ", req);
//     db.Article.find({})
//       .then(function(dbArticle) {
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         res.json(err);
//       });
//   });
  
//   app.get("/articles/:id", function(req, res) {
//     db.Article.findOne({ _id: req.params.id })
//       .populate("note")
//       .then(function(dbArticle) {
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         res.json(err);
//       });
//   });
  
//   app.post("/articles/:id", function(req, res) {
//     db.Note.create(req.body)
//       .then(function(dbNote) {
//         return db.Article.findOneAndUpdate({ _id: req.params.id }, { articleNote: dbNote._id }, { new: true });
//       })
//       .then(function(dbArticle) {
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         res.json(err);
//       });
//   });
  

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });