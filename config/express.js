const hbs = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser');
const databse = require('./database');
const init = require('../config_controlers/storage');
const initAuth = require('../config_controlers/auth');
const router = require('./router');


module.exports = async (app) => {
    app.engine('hbs', hbs({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.use(express.static('static'));
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    await databse(app);
    app.use(await init());
    app.use(await initAuth());




    app.use(router);
}