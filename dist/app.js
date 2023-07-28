"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session = require("express-session");
var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');
var app = express();
// configure Nunjucks
var appViews = path.join(__dirname, '/views/');
var nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};
nunjucksConfig.express = app;
nunjucks.configure(appViews, nunjucksConfig);
// configure Express
app.set('view engine', 'html');
app.set('views', appViews);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'NOT HARDCODED SECRET', cookie: { maxAge: 60000 } }));
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
// Express Routes
app.get('/', function (req, res) {
    res.render('pizza', {
        title: 'Rafal Pizza Time',
        menu_opt1: "MEXICAN PIZZA",
        location1: 'Washington'
    });
});
require('./controller/authController')(app);
var authMiddleware = require('./middleware/auth');
app.use(authMiddleware);
require('./controller/productController')(app);
require('./controller/orderController')(app);
//# sourceMappingURL=app.js.map