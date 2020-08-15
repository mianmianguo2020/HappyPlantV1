let mongoose = require("mongoose");
let db = require("../models");
require('dotenv').config();

const Schema = mongoose.Schema;



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

let SeedData = [
    {
      postStory: 'this is test data',
        coverImg: 'https://www.cheatsheet.com/wp-content/uploads/2019/04/Best-Garden-Shows-Netflix.jpg',
        commentCount: '1',
        author: {
          id: '5f29c128fed3a55acc69cdc4'
      },
    },
  
]


db.Article.deleteMany({})
  .then(() => db.Article.collection.insertMany(SeedData))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
