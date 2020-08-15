const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    // content: String,

    postStory: String,
    coverImg: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            singleComment: String
        }
    ],
})



const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

