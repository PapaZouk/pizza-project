import { Product } from "../model/product";

export function validateProduct (product: Product): string {
    if (product.name.length > 50) {
        return "Name grater than 50 characters";
    }

    if (product.description.length > 500) {
        return "Description greater than 500 characters";
    }

    if (product.price < 10) {
        return "Price less than $10";
    }

    return null;
}