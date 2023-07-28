import { Order } from "../model/order";
import { OrderProduct } from "../model/orderProduct";
import { validateOrder } from "../validator/orderValidator";
import axios from 'axios';

async function getOrders(token: string) {
    try {
        const response = await axios.get('http://localhost:8080/api/orders', { params: { token: token}});
        return response.data;
    } catch (e) {
        return new Error('Could not get products');
    }
}

async function getOrderDetails(id: number, token: string) {
    try {
        const response = await axios.get("http://localhost:8080/api/orders/details/" + id, { params: { token: token}});
        return response.data;
    } catch (e) {
        return new Error('Could not get order details with the given order ID number: ' + id);
    }
}

async function createOrder(order: Order, token: string): Promise<number> {
    const error: string = validateOrder(order);

    if (error) {
        throw new Error(error);
    }

    try {
        const response = await axios.post('http://localhost:8080/api/order', order, {params: {token: token}});
        return response.data;
    } catch (e) {
        console.error(e);
        throw new Error('Could not create order');
    }
}

async function createOrderProduct(orderProduct: OrderProduct, token: string): Promise<Number> {
    try {
        const response = await axios.post('http://localhost:8080/api/orders/orderproduct', orderProduct, { params: { token: token }});
        return response.data;
    } catch (e) {
        console.error(e);
        throw new Error('Could not create new order product');
    }
}

export default {
    getOrders,
    createOrderProduct,
    getOrderDetails,
    createOrder
}