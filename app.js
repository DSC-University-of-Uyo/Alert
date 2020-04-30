const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const Mailchimp = require('mailchimp-api-v3')
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const secure = require('express-force-https');

require('./server/config/mongoose');

//Models
const Cop = require('./server/models/cop');
const Request = require('./server/models/request');
const Scam = require('./server/models/scam');

//Routes
var copRouter = require('./server/routes/cop');
var civilianRouter = require('./server/routes/civilian');
var apiRouter = require('./server/routes/api');
var homeRouter = require('./server/routes/home');

// Socket Events
const socketEvents = require('./server/socket/events');

const app = express();



AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    // databases: [],
    rootPath: '/admin',
    resources: [Cop, Request, Scam],
    branding: {
        companyName: 'Alert.',
        softwareBrothers: false,
        logo: '/images/light.svg',
    },
})

const ADMIN = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
};

// TODO: USE DYNAMIC USER

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async(email, password) => {
        if (ADMIN.password === password && ADMIN.email === email) {
            return ADMIN;
        }
        return null;
    },
    cookieName: 'adminbro',
    cookiePassword: process.env.PASSWORD_HASH_KEY,
});

// Configure template engine
nunjucks.configure(
        'views', {
            autoescape: true,
            express: app
        }).addGlobal('GOOGLE_MAP_KEY', process.env.GOOGLE_MAP_KEY)
    .addGlobal('FIREBASE_KEY', process.env.FIREBASE_KEY)
    .addGlobal('CLIENT_ID', process.env.CLIENT_ID);

// app.set('views', 'views'); // Set the folder-name from where you serve the html page.
app.use(express.static('./public')); // setting the folder name (public) where all the static files like css, js, images etc are made available

app.use('/', copRouter);
app.use('/cops', apiRouter);
app.use('/', civilianRouter);
app.use('/', homeRouter);


app.post('/subscribe', (req, res) => {
    const mailchimp = new Mailchimp(process.env.MAILCHIMP_API); // create MailChimp instance
    mailchimp.post(`lists/${process.env.MAILCHIMP_LIST_ID}`, {
        members: [{ // send a post request to create new subscription to the list
            email_address: req.body.email_address,
            status: "subscribed"
        }]
    }).then((result) => {
        return res.send(result);
    }).catch((error) => {
        return res.send(error);
    });
});

app.use(adminBro.options.rootPath, router)
app.use(secure)
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

const server = http.Server(app);

server.listen(process.env.PORT || 5000, () => {
    console.log('app running on port', process.env.PORT || 5000)
    socketEvents.initialize(server);
});