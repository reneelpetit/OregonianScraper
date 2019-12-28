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

app.get("/articles", function (req, res) {
  axios.get("https://www.oregonlive.com/#top_stories").then(function (urlData) {
    var $ = cheerio.load(urlData.data);
    var result = [];
    $(".article__details").each(function (i, element) {
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

      var record = { articleTitle: articleTitle || articleContent, articleDate: articleDate, articleLink: articleLink }
      result.push(record);
    });
    res.json(result);
  });
});

app.post("/save", function (req, res) {
  db.Article.create({
    articleTitle: req.body.articleTitle,
    articleDate: req.body.articleDate,
    articleLink: req.body.articleLink
  })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/save", function (req, res) {
  db.Article.find({})
  .then(function(savedArticleDB) {
    res.json(savedArticleDB);
  })
})

app.get("/notepage", function (req, res) {
    let data = {
      articleID: req.body.articleID,
      articleTitle: req.body.title
    }
    res.json(data);
  })

app.post("/note", function (req, res) {
  db.Note.create({
    noteBody: req.body.noteBody
  })
        .then(function(dbNote) {
          return db.Article.findOneAndUpdate({ _id: req.body.articleID }, { articleNote: dbNote._id }, { new: true });
        })
        .then(function(dbArticle) {
          res.json(dbArticle);
        })
        .catch(function(err) {
          res.json(err);
        });
})

app.delete("/deletearticle", function(req, res) {
  console.log("inside delete route");
  db.Article.findByIdAndDelete({
    _id: req.body.articleID 
  }).then(function(dbDelete) {
    res.json(dbDelete);
  })
  .catch(function(err) {
    res.json(err);
  });
})


// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});