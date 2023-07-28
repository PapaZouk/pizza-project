export class OrderProduct {
    orderId?: Number;
    productId?: Number;
    quantity?: Number;

    constructor(orderId: Number, productId: Number, quantity: Number) {
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
    }
}