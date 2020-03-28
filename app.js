const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

require('./server/config/mongoose');

//Models
require('./server/models/cop');
require('./server/models/request');

//Routes
var copRouter = require('./server/routes/cop');
var civilianRouter = require('./server/routes/civilian');
var apiRouter = require('./server/routes/api');

// Socket Events
const socketEvents = require('./server/socket/events');

const app = express();

// Configure template engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

// app.set('views', 'views'); // Set the folder-name from where you serve the html page.
app.use(express.static('./public')); // setting the folder name (public) where all the static files like css, js, images etc are made available

app.use('/', copRouter);
app.use('/cops', apiRouter);
app.use('/', civilianRouter);

const server = http.Server(app);

server.listen(process.env.PORT || 5000, () => {
    console.log('app running on port', process.env.PORT || 5000)
    socketEvents.initialize(server);
});