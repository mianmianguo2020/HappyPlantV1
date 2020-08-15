let mongoose = require("mongoose");
let db = require("../models");
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

let userAccountSeed = [
  {
    user: {
      name: "BobChunk",
      email: 'Bob@gmail.com',
      password: "123456abc"
    },
    
  },

];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userAccountSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
