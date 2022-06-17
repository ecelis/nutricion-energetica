const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { User } = db.sequelize.models;

describe('Test User', () => {
    test('CREATE not active coach', async () => {
        const jane = await User.create({
            email: 'jane@example.com',
            displayName: 'Jane',
            active: false,
            coach: true
        });
        expect(jane.displayName).toBe('Jane');
    });
    test('READ all users', async () => {
        const users = await User.findAll({ where: { displayName: 'Jane'}});
        expect(users[0].dataValues.displayName).toBe('Jane');
    });
    // TODO association between Coach and Trainee
    test('CREATE coach and trainee', async () => {
        const coach = await User.create({
            email: 'coach1@example.com',
            displayName: 'Tarzan',
            active: false,
            coach: true
        });
        const trainee = await User.create({
            email: 'trainee1@example.com',
            displayName: 'Jane',
            active: false,
            coach: true
        });
        await coach.addTrainee(trainee);
        const result = await coach.hasTrainee(trainee);
        expect(result).toBe(true);
    });
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