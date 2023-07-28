import { Product } from "../model/product";
import { validateProduct } from "../validator/productValidator";

const axios = require('axios');

module.exports.getProducts = async function (token: string): Promise<Product[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/products', { params: { token: token }});
        return response.data;
    } catch (e) {
        throw new Error('Could not get products');
    }
}

module.exports.getProductById = async function (id: number, token: string): Promise<Product> {
    try {
        const response = await axios.get('http://localhost:8080/api/products/' + id, { params: { token: token}});

        return response.data;
    } catch (e) {
        throw new Error('Could not get product with the given id = ' + id)
    }
}

module.exports.createProduct = async function (product: Product, token: string): Promise<number> {
    const error: string = validateProduct(product);

    if (error) {
        throw new Error(error);
    }
    try {
        const response = await axios.post('http://localhost:8080/api/product', product, { params: { token: token}});

        return response.data;
    } catch (e) {
        console.error(e.response);
        throw new Error('Could not create product');
    }
}