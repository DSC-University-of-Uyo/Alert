const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

require('./server/config/mongoose');

//Models
const Cop = require('./server/models/cop');
const Request = require('./server/models/request');

//Routes
var copRouter = require('./server/routes/cop');
var civilianRouter = require('./server/routes/civilian');
var apiRouter = require('./server/routes/api');

// Socket Events
const socketEvents = require('./server/socket/events');

const app = express();



AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    // databases: [],
    rootPath: '/admin',
    resources: [Cop, Request],
    branding: {
        companyName: 'Alert.',
    },
})

const router = AdminBroExpress.buildRouter(adminBro)

// Configure template engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
}).addGlobal('GOOGLE_MAP_KEY', process.env.GOOGLE_MAP_KEY);

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
app.use(adminBro.options.rootPath, router)

const server = http.Server(app);

server.listen(process.env.PORT || 5000, () => {
    console.log('app running on port', process.env.PORT || 5000)
    socketEvents.initialize(server);
});