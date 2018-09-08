const express = require('express');
const app = express();
const bodyParser = require('body-parser');


let birds = [
    {bird: 'macaw', color: ['red', 'green', 'yellow']}
]


let goHome = (req, res) => {
    // res.end for text
    res.end('this is the homepage');
}

let birdFeatherColors = (req, res) => {

    // res.send json from js object
    res.send(birds)
}

let postColors = (req, res) => {
    birds.push(req.body);
    res.send(birds);
}

// app.use for middleware

app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/test', goHome);
app.get('/colors', birdFeatherColors);
app.post('/colors', postColors);

// @end
app.listen(3000);