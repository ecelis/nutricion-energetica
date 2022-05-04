const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { User } = db.sequelize.models;

describe('Test User', () => {
    test('CREATE', async () => {
        const jane = await User.create({
            email: 'jane@example.com',
            displayName: 'Jane Tarzan',
            active: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        expect(jane.displayName).toBe('Jane Tarzan');
    });
    test('READ', async () => {
        const users = await User.findAll();
        expect(users[0].dataValues.displayName).toBe('Jane Tarzan');
    });
});

describe('API User', () => {
    test('POST', () => {
        return request(app)
            .post('/users')
            .send({
                email: 'john@example.com',
                displayName: 'John',
                active: false,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.statusCode).toBe(200);
            });
    });
    test('GET users', () => {
        return request(app)
            .get('/users')
            .then(res => {
                expect(res.statusCode).toBe(200);
            });
    });
});