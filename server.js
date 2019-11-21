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

mongoose.connect("mongodb://localhost/oregonianScraper", { useNewUrlParser: true });

app.get("/articles", function(req , res) {
  axios.get("https://www.oregonlive.com/#top_stories").then(function(urlData) {
    var $ = cheerio.load(urlData.data);
    var result = [];
    $(".article__details").each(function(i, element) {
      articleTitle = $(this)
        .children("div")
        .text();
      articleLink = $(this)
        .children("h3")
        .children("a") 
        .attr("href");
      articleContent = $(this)
        .children("h3")
        .text();
      articleDate = $(this)
        .children("time")
        .text();

        console.log("article link & title & content & date ", articleLink, articleTitle || articleContent, articleDate);
        var record = {articleTitle: articleTitle || articleContent, articleDate: articleDate, articleLink: articleLink}
       result.push(record);

        db.Article.create(record)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
      });
    });
    res.json(result);
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