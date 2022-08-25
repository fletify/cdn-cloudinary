const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('X-Frame-Options', 'SAMEORIGIN')
    next();
});

app.get('/', async(req, res) => {
  res.status(403).send('<body style="background: #212121;color:white;font-family:monospace;">Forbidden</body>')
});

const uploadRoute = require('./routes/upload');

app.use('/upload', uploadRoute);

app.use(function(req,res){
    res.status(404).render('404');
});

app.listen(3000, () => console.log('[^] | App Launched'));
