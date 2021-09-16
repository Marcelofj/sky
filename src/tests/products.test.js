const request = require('supertest')
const app = require('../app')
const Product = require('../models/product')
const mongoose = require('mongoose')
require('../database')

beforeAll(async () => {
    await Product.deleteMany()
})

const product = {
    _id: mongoose.Types.ObjectId(),
    category: 'Processador',
    name: 'Ryzen 5 3600',
    price: 800
}

test('Should create a product', async () => {
    const response = await request(app).post('/products').send(product)
    expect(response.statusCode).toBe(201)
    expect(response.charset).toEqual('utf-8')
    expect(response.type).toEqual('application/json')
    expect(response.body)
        .toEqual(
            expect.objectContaining({
                product: expect.objectContaining({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    category: 'Processador',
                    name: 'Ryzen 5 3600',
                    price: 800
                })
            })
        )
})

test('Should read products', async () => {
    const response = await request(app).get('/products')
    expect(response.statusCode).toBe(200)
    expect(response.charset).toEqual('utf-8')
    expect(response.type).toEqual('application/json')
    expect(response.body)
        .toEqual(
            expect.objectContaining({
                products: expect.arrayContaining([
                    expect.objectContaining({
                        __v: expect.any(Number),
                        _id: expect.any(String),
                        category: expect.any(String),
                        name: expect.any(String),
                        price: expect.any(Number)
                    })
                ])
            })
        )
})

test('Should read one product', async () => {
    const response = await request(app).get(`/products/${product._id}`)
    expect(response.statusCode).toBe(200)
    expect(response.charset).toEqual('utf-8')
    expect(response.type).toEqual('application/json')
    expect(response.body)
        .toEqual(
            expect.objectContaining({
                product: expect.objectContaining({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    category: 'Processador',
                    name: 'Ryzen 5 3600',
                    price: 800
                })
            })
        )
})

test('Should update one product', async () => {
    const response = await request(app).put(`/products/${product._id}`)
        .send({
            category: 'Processador',
            name: 'Ryzen 7 3800',
            price: 2500
        })
    expect(response.statusCode).toBe(200)
    expect(response.charset).toEqual('utf-8')
    expect(response.type).toEqual('application/json')
    expect(response.body)
        .toEqual(
            expect.objectContaining({
                product: expect.objectContaining({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    category: 'Processador',
                    name: 'Ryzen 7 3800',
                    price: 2500
                })
            })
        )
})

test('Should delete one product', async () => {
    const response = await request(app).delete(`/products/${product._id}`)
    expect(response.statusCode).toBe(202)
    expect(response.charset).toEqual('utf-8')
    expect(response.type).toEqual('application/json')
    expect(response.body)
        .toEqual(
            expect.objectContaining({
                product: expect.objectContaining({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    category: 'Processador',
                    name: 'Ryzen 7 3800',
                    price: 2500
                })
            })
        )
})