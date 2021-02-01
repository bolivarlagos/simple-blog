require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongodb = process.env.MONGO;
const Blog = require('./models/blogs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(express.static('assets'));

mongoose.connect(mongodb)
.then(() => {
    console.log('connected to the database');
    app.listen(3000);
    console.log('listening on port 3000');
})
.catch((error) => {
    console.log(error);
});

app.get('/', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((blogs) => {
        res.render('index', {title: "Home", blogs});
    })
    .catch((error) => {
        console.log(error);
    });
});
app.get('/about', (req, res) => {
    res.render('about', {title: "About"});
});
app.get('/contact', (req, res) => {
    res.render('contact', {title: "Create"});
});
app.get('/blog/:id', (req, res) => {
    Blog.findById(req.params.id)
    .then(blog => {
        res.render('single', {title: 'Single Blog', blog});
    })
    .catch(error => {
        console.log(error);
    });
});
app.delete('/remove/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
    .then(result => {
        res.json({redirect: '/'});
    })
    .catch(error => {
        console.log(error);
    });
});
app.post('/register', (req, res) => {
    let personData = new Blog(req.body);
    personData.save()
    .then(() => {
        res.redirect('/');
    })
    .catch((error) => {
        console.log(error);
    });
});
app.use((req, res) => {
    res.render('error', {title: "Error"});
});