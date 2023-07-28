"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var orderProduct_1 = require("../model/orderProduct");
var orderService_1 = require("../service/orderService");
var cookieParser = require("cookie-parser");
var dayjs = require('dayjs');
var customerService = require('../service/customerService');
var productService = require('../service/productService');
module.exports = function (app) {
    var _this = this;
    app.use('/orders', cookieParser());
    app.get('/orders', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Cookie: ', req.cookies);
                    console.log('Cookies: ', req.signedCookies);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, orderService_1.default.getOrders(req.session.token)];
                case 2:
                    data = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 4:
                    res.render('list-orders', { orders: data });
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/orders/details/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var data, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, orderService_1.default.getOrderDetails(Number.parseInt(req.params.id), req.session.token)];
                case 1:
                    data = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.error(e_2);
                    return [3 /*break*/, 3];
                case 3:
                    res.render('product-details', { prod_details: data });
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/add-order', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var customers, date, products, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, customerService.getCustomers()];
                case 1:
                    customers = _a.sent();
                    date = dayjs().format("YYYY-MM-DD");
                    return [4 /*yield*/, productService.getProducts()];
                case 2:
                    products = _a.sent();
                    res.render('add-order', { customers: customers, date: date, products: products });
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log(e_3);
                    res.locals.errormessage = e_3.message;
                    res.render('add-order');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.post('/add-order', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var data, prodId, q, id, orderResult, orderProduct, e_4, customers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = req.body;
                    prodId = req.body.productId;
                    q = req.body.quantity;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 6]);
                    return [4 /*yield*/, orderService_1.default.createOrder(data, req.session.token)];
                case 2:
                    id = _a.sent();
                    orderProduct = new orderProduct_1.OrderProduct(id, prodId, q);
                    return [4 /*yield*/, orderService_1.default.createOrderProduct(orderProduct, req.session.token)];
                case 3:
                    orderResult = _a.sent();
                    res.redirect('/orders/details/' + id);
                    return [3 /*break*/, 6];
                case 4:
                    e_4 = _a.sent();
                    console.error(e_4);
                    res.locals.errormessage = e_4.message;
                    return [4 /*yield*/, customerService.getCustomers()];
                case 5:
                    customers = _a.sent();
                    res.render('add-order', { data: data, customers: customers });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    app.get('/add-order-product-customer', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var customers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.session.orderProduct) {
                        req.session.orderProduct = {};
                    }
                    if (!req.session.order) {
                        req.session.order = {};
                    }
                    return [4 /*yield*/, customerService.getCustomers(req.session.token)];
                case 1:
                    customers = _a.sent();
                    res.render('add-order-product-customer', { customers: customers });
                    return [2 /*return*/];
            }
        });
    }); });
    app.post('/add-order-product-customer', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            req.session.order["customerId"] = req.body.customerId;
            req.session.orderProduct = {};
            res.redirect('/add-order-product-product');
            return [2 /*return*/];
        });
    }); });
    app.get('/add-order-product-product', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productService.getProducts(req.session.token)];
                case 1:
                    products = _a.sent();
                    res.render('add-order-product-product', { products: products });
                    return [2 /*return*/];
            }
        });
    }); });
    app.post('/add-order-product-product', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            req.session.orderProduct["productId"] = req.body.productId;
            res.redirect('/add-order-product-quantity');
            return [2 /*return*/];
        });
    }); });
    app.get('/add-order-product-quantity', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.render('add-order-product-quantity');
            return [2 /*return*/];
        });
    }); });
    app.post('/add-order-product-quantity', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            req.session.orderProduct["quantity"] = req.body.quantity;
            res.redirect('/add-order-product-date');
            return [2 /*return*/];
        });
    }); });
    app.get('/add-order-product-date', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.render('add-order-product-date');
            return [2 /*return*/];
        });
    }); });
    app.post('/add-order-product-date', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            req.session.order["orderDate"] = req.body.orderDate;
            res.redirect('add-order-product-confirmation');
            return [2 /*return*/];
        });
    }); });
    app.get('/add-order-product-confirmation', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var data1, data2;
        return __generator(this, function (_a) {
            data1 = req.session.order;
            data2 = req.session.orderProduct;
            res.render('add-order-product-confirmation', { data1: data1, data2: data2 });
            return [2 /*return*/];
        });
    }); });
    app.post('/add-order-product-confirmation', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var orderData, orderProductData, id, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderData = req.session.order;
                    orderProductData = req.session.orderProduct;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, orderService_1.default.createOrder(orderData, req.session.token)];
                case 2:
                    id = _a.sent();
                    orderProductData.orderId = id;
                    return [4 /*yield*/, orderService_1.default.createOrderProduct(orderProductData, req.session.token)];
                case 3:
                    _a.sent();
                    res.redirect('/orders/details/' + id);
                    return [3 /*break*/, 5];
                case 4:
                    e_5 = _a.sent();
                    console.error(e_5);
                    res.locals.errormessage = e_5.message;
                    res.render('add-order-product-confirmation', { data1: req.session.order, data2: req.session.orderProduct });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
//# sourceMappingURL=orderController.js.map