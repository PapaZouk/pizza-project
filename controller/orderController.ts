import { Application } from "express";
import { Request, Response, NextFunction } from "express";
import { Order } from "../model/order";
import { OrderProduct } from "../model/orderProduct";
import orderService from "../service/orderService";
import cookieParser = require("cookie-parser");

const dayjs = require('dayjs');

const customerService = require('../service/customerService');
const productService = require('../service/productService');

module.exports = function (app: Application) {
    

    app.use('/orders', cookieParser())

    app.get('/orders', async (req: Request, res: Response) => {
        let data: Order[];
        try {
            data = await orderService.getOrders(req.session.token);
        } catch (e) {
            console.error(e);
        }

        res.render('list-orders', { orders: data });
    });

    app.get('/orders/details/:id', async (req: Request, res: Response) => {
        let data: Order;

        try {
            data = await orderService.getOrderDetails(Number.parseInt(req.params.id), req.session.token);
        } catch (e) {
            console.error(e);
        }

        res.render('product-details', { prod_details: data });
    });

    app.get('/add-order', async (req: Request, res: Response) => {
        try {
            const customers = await customerService.getCustomers();
            const date = dayjs().format("YYYY-MM-DD");
            const products = await productService.getProducts();
            res.render('add-order', { customers, date, products });
        } catch (e) {
            console.log(e);

            res.locals.errormessage = e.message;
            res.render('add-order');
        }
    });

    app.post('/add-order', async (req: Request, res: Response) => {
        let data: Order = req.body;
        let prodId: Number = req.body.productId;
        let q: Number = req.body.quantity;
        let id: Number;
        let orderResult: Number;

        try {
            id = await orderService.createOrder(data, req.session.token);
            const orderProduct = new OrderProduct(id, prodId, q);
            orderResult = await orderService.createOrderProduct(orderProduct, req.session.token);
            res.redirect('/orders/details/' + id);
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message;
            const customers = await customerService.getCustomers();

            res.render('add-order', { data, customers });
        }
    })

    app.get('/add-order-product-customer',async (req:Request, res: Response) => {
        if (!req.session.orderProduct) {
            req.session.orderProduct = {};
        }
        if (!req.session.order) {
            req.session.order = {};
        }
        const customers = await customerService.getCustomers(req.session.token);
        res.render('add-order-product-customer', { customers });
    })

    app.post('/add-order-product-customer',async (req:Request, res: Response) => {
        req.session.order["customerId"] = req.body.customerId;
        req.session.orderProduct = {};
        res.redirect('/add-order-product-product');
    })

    app.get('/add-order-product-product',async (req:Request, res: Response) => {
        const products = await productService.getProducts(req.session.token);
        res.render('add-order-product-product', { products });
    });

    app.post('/add-order-product-product',async (req:Request, res: Response) => {
        req.session.orderProduct["productId"] = req.body.productId

        res.redirect('/add-order-product-quantity')
    });

    app.get('/add-order-product-quantity',async (req:Request, res: Response) => {
        res.render('add-order-product-quantity');
    })

    app.post('/add-order-product-quantity',async (req:Request, res: Response) => {
        req.session.orderProduct["quantity"] = req.body.quantity;

        res.redirect('/add-order-product-date');
    })

    app.get('/add-order-product-date', async (req:Request, res: Response) => {
        res.render('add-order-product-date');
    })

    app.post('/add-order-product-date',async (req:Request, res: Response) => {
        req.session.order["orderDate"] = req.body.orderDate;

        res.redirect('add-order-product-confirmation');
    })

    app.get('/add-order-product-confirmation',async (req:Request, res: Response) => {
        let data1 = req.session.order;
        let data2 = req.session.orderProduct;
        res.render('add-order-product-confirmation', {data1, data2})
    })

    app.post('/add-order-product-confirmation',async (req:Request, res: Response) => {
        let orderData: Order = req.session.order;
        let orderProductData: OrderProduct = req.session.orderProduct;
        let id: Number;

        try {
            id = await orderService.createOrder(orderData, req.session.token);
            orderProductData.orderId = id;
            await orderService.createOrderProduct(orderProductData, req.session.token);

            res.redirect('/orders/details/' + id);
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message;

            res.render('add-order-product-confirmation', { data1: req.session.order, data2: req.session.orderProduct });
        }
    })
};