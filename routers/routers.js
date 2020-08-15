const db = require('../models');
const https = require('https');
const axios = require('axios');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport')
const path = require("path")
const jwt = require('jsonwebtoken')



require('dotenv').config();



let attempts = 0;
const maxAttempts = 3;

function allPlantDetailRequest(resultList) {

    return Promise.allSettled(resultList.map((item) => {
        attempts = 0;
        return plantDetailRequest(item)
    }))

}


function plantDetailRequest(item) {
    let request;
    const TOKEN = process.env.TOKEN;

    request = axios.get(`https://trefle.io/api/v1/plants/${item.id}?token=${TOKEN}`)
        .then(response => {
            if (response.status == 200) {
                return response.data.data;
            }

        })
        .catch((error) => {
            attempts++;
            if (maxAttempts <= attempts) {
                return;

            } else {
                setTimeout(() => { request = plantDetailRequest(item) }, 1000);
            }

        })
    return request;
}

function createPlantObject(item) {
    return {
        id: item.id,
        name: item.common_name,
        scientificName: item.scientific_name,
        image: item.image_url,
    }
}



module.exports = function (app) {

    const MONGOD_URI = process.env.MONGODB_URI;

    mongoose.connect(MONGOD_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

    app.post('/api/getPlantInformation', (req, res) => {
        const TOKEN = process.env.TOKEN;

        const params = req.body.params
        const request = https.get(`https://trefle.io/api/v1/plants/search?token=${TOKEN}&q=` + params, (trefleRequest) => {
            let data = '';
            trefleRequest.on('data', (chunk) => {
                data += chunk;
            })
            trefleRequest.on('end', async () => {
                const resultListFull = JSON.parse(data);
                const resultList = resultListFull.data.slice(0, 9);
                let allData = [];
                const idSet = new Set();
                for (let counter = 0; counter < resultList.length; counter++) {
                    let item = resultList[counter];
                    const response = await axios.get(`https://trefle.io/api/v1/plants/${item.id}?token=${TOKEN}`)
                        .then(response => {
                            if (response.status == 200) {
                                return response.data.data;
                            } else {
                                return {};
                            }
                        })

                        .catch((error) => {
                            return {};
                        })
                    if (response.id && !idSet.has(response.id)) {
                        allData.push(createPlantObject(response))
                        idSet.add(response.id)
                    }
                }
                const filteredData = allData.filter((element) => {
                    return element.image !== null && element.name !== null;
                })
                res.json(filteredData);

            })
        })
        request.on('error', (err) => {
            res.json(err)
        })
        request.end()
    })


    app.post('/api/createuser', async (req, res) => {
        const hashedpassport = await bcrypt.hash(req.body.password, 10)
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedpassport,
        }

        db.User.findOne({ 'user.name': req.body.name },
            (error, data) => {
                if (data) {
                    res.status(400).json({
                        error: "username already exists"
                    })
                } else {
                    db.User.create({
                        user: newUser
                    }).then((user) => {
                        res.redirect(307, "/api/login")
                    }).catch((error) => {
                        res.json(err);
                    })
                }
            }
        )


    })

    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        //create and assgin a token
        const pendingUser = req.user
        const accessToken = jwt.sign(pendingUser, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            user: req.user.name,
            authorID: req._id,
            accessToken: accessToken,
            message: 'Login sucessfully!'
        })
    })

    app.get('/api/getAllPosts', passport.authenticate('jwt'), (req, res) => {
        db.Article.find()
        .populate([{ path: 'author', model:'User' }, { path: 'comments', populate: { path: 'user', model: 'User' }}])
        .exec()
        .then(dbArticle => {
            const responseData = dbArticle.map((article) => {
                let author = '';
                if (article.author) author = article.author.user.name;
                return {
                    "_id": article._id,
                    coverImg: article.coverImg,
                    postStory: article.postStory,
                    comments: article.comments,
                    author: author,
                }
            })
            res.json(responseData);
            })
            .catch(err => {
                res.json(err);
            });

    })



    app.get('/api/getMyPosts', passport.authenticate('jwt'), (req, res) => {
        db.Article.find({ author: req.user.id })
             .populate([{ path: 'author', model:'User' }, { path: 'comments', populate: { path: 'user', model: 'User' }}])
            .exec()
            .then(dbArticle => {
                const responseData = dbArticle.map((article) => {
                    let author = '';
                    if (article.author) author = article.author.user.name;
                    return {
                        "_id": article._id,
                        coverImg: article.coverImg,
                        postStory: article.postStory,
                        comments: article.comments,
                        author: author
                    }
                })
                res.json(responseData);
            })
            .catch(err => {
                res.json(err);
            });
    })


    app.post('/api/posts', passport.authenticate('jwt'), (req, res) => {
        req.body.author = req.user.id
        db.Article.create(req.body)
            .then(({ _id }) => db.User.findOneAndUpdate({ _id: body.author }, { $push: { "posts": _id } }, { new: true }))
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post('/api/comment', passport.authenticate('jwt'), (req, res) => {
        db.Article.findOneAndUpdate({ _id: req.body._id }, { $push: { "comments": { user:req.user.id, singleComment: req.body.singleComment } } })

            .then(() => {
                res.end();
            })
            .catch((error) => {
                res.json(err);
            })
    })

    app.post('/api/delete', passport.authenticate('jwt'), (req, res) => {
        db.Article.deleteOne({ _id: req.body._id })
            .then(() => {
                res.end();
            })
            .catch((error) => {
                res.json(err);
            })
    })

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "happyplant/build/index.html"))
    })

}
