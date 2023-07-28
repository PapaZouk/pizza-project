"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrder = void 0;
var dayjs = require('dayjs');
function validateOrder(order) {
    if (dayjs(order.orderDate) < dayjs(new Date()).subtract(1, 'year')) {
        return 'Order date is older than 1 year';
    }
    return null;
}
exports.validateOrder = validateOrder;
//# sourceMappingURL=orderValidator.js.map