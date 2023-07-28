import { Request, Response } from "express";
import e = require("express");
import session = require("express-session");
import { Product } from "./model/product";
import { Order } from "./model/order";
import { OrderProduct } from "./model/orderProduct";

const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();

// configure Nunjucks
const appViews = path.join(__dirname, '/views/');

const nunjucksConfig = {
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

app.use(session({ secret: 'NOT HARDCODED SECRET', cookie: {maxAge: 60000}}));

declare module "express-session" {
    interface SessionData {
        product: Product;
        order: Order;
        orderProduct: OrderProduct;
        token: string;
    }

}

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});



// Express Routes
app.get('/', (req: Request, res: Response) => {
    res.render('pizza', {
        title: 'Rafal Pizza Time',
        menu_opt1: "MEXICAN PIZZA",
        location1: 'Washington'
    });
});

require('./controller/authController')(app);

const authMiddleware = require('./middleware/auth');
app.use(authMiddleware);

require('./controller/productController')(app);
require('./controller/orderController')(app);