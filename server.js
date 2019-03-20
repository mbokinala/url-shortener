const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const Shortlink = require('./shortlink');

const app = express();
const port = 3000

app.use(bodyParser.json());

mongoose.connect(`mongodb://api:password1234@ds117846.mlab.com:17846/url-shortener`, {
    useNewUrlParser: true
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname + '/favicon.ico'));
});

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.js'));
});

app.get('/u/:short', (req, res) => {
    console.log(req.params);
    Shortlink.findOne({code: req.params.short}, (err, document) => {
        console.log(document);
        res.redirect(301, document.url);
    });
})

app.post('/new', (req, res) => {
    console.log(req.body)
    console.log(req.body.code + ' --> ' + req.body.url)
    const shortlink = new Shortlink({
        _id: new mongoose.Types.ObjectId(),
        code: req.body.code,
        url: req.body.url
    });

    shortlink.save()
        .then((result) => {
            res.status(201).json(result);
        }).catch((err) => {
            res.status(400).json(err);
        })
});

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))