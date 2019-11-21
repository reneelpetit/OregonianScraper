var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  articleTitle: {
    type: String,
    required: true
  },
  articleLink: {
    type: String,
    required: true
  },

  articleDate: {
    type: String
  },
  
  articleNote: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
