const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets');
const expressJwt = require('express-jwt');


let birds = {
    'macaw': {bird: 'macaw', color: ['red', 'green', 'yellow']  }
}


let goHome = (req, res) => {
    // res.end for text
    res.end('this is the homepage');
}

let birdFeatherColors = (req, res) => {

    // res.send json from js object
    res.send(birds)
}



let postFood = (req, res) => {
    birds[req.body.name].food = req.body.food;
    res.send(birds);
}

let postColors = (req, res) => {
    console.log(req.body);
    !birds[req.body.name] && (birds[req.body.name] = {});
    birds[req.body.name].color = req.body.color 
    res.send(birds);
}

let authenticate = (req, res) => {
    let token = jwt.sign(
        {user: req.body.user},
        secrets.secret,
        {expiresIn: '7d'});
    res.send({token: token});
}

// app.use for middleware


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(expressJwt({ secret: secrets.secret, getToken: (req) => req.headers.authorization
}).unless({path: ['/authenticate']}));
app.post('/authenticate', authenticate);
app.get('/test', goHome);
app.get('/colors', birdFeatherColors);
app.post('/colors', postColors);
app.post('/food', postFood);

// @end
app.listen(3000);