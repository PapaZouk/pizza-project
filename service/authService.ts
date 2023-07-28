import axios, { AxiosResponse } from 'axios';
import { Login } from '../model/login';
import { validateUser } from '../validator/userValidator';
import e = require('express');

async function login(login: Login): Promise<string> {
    try {
        const response = await axios.post('http://localhost:8080/api/login', login);

        return response.data;
    } catch(e) {
        throw new Error('Could not login');
    };
}

async function register(login:Login): Promise<number> {
    const error: string = validateUser(login);

    if (error) {
        throw new Error(error);
    }

    try {
        const response = await axios.post('http://localhost:8080/api/register', login);

        return response.data;
    } catch (e) {
        throw new Error('Could not register user');
    }
}

export default {
    login,
    register
}