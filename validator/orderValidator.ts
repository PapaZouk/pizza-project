import { Order } from "../model/order";

const dayjs = require('dayjs');

export function validateOrder(order: Order): string {
    if (dayjs(order.orderDate) < dayjs(new Date()).subtract(1, 'year')) {
         return 'Order date is older than 1 year';
        }
    return null;
}