import { Customer } from "../model/customer";

const axios = require('axios');

module.exports.getCustomers = async function(token: string) {
    try {
        const response = await axios.get('http://localhost:8080/api/customers', {params: {token: token}});
        return response.data;
    } catch (e) {
        return new Error('Could not get customers');
    }
}