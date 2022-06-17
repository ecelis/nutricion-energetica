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
    test('CREATE coach and trainee', async () => {
        try {
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
        } catch (error) { console.log (error); }
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