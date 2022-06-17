const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { User } = db.sequelize.models;

describe('Test User', () => {
    test('CREATE not active coach', async () => {
        try {
            const jane = await User.create({
                email: 'jane@example.com',
                displayName: 'Jane Tarzan',
                active: false,
                coach: true
            });
            expect(jane.displayName).toBe('Jane Tarzan');
        } catch (error) { console.log(error); }
    });
    test('READ all users', async () => {
        try {
            const users = await User.findAll({ where: { displayName: 'Jane Tarzan'}});
            expect(users[0].dataValues.displayName).toBe('Jane Tarzan');
        } catch(error) { console.log(error); }
    });
    // TODO association between Coach and Trainee
});

describe('API User', () => {
    // test('POST', () => {
    //     return request(app)
    //         .post('/users')
    //         .send({
    //             email: 'john@example.com',
    //             displayName: 'John',
    //             active: false,
    //             coach: false
    //         })
    //         .set('Accept', 'application/json')
    //         .then(res => {
    //             expect(res.statusCode).toBe(200);
    //         });
    // });
    test('GET users', () => {
        return request(app)
            .get('/users')
            .then(res => {
                expect(res.statusCode).toBe(200);
            });
    });
});