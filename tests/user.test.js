const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { User } = db.sequelize.models;

describe('Test User', () => {
    test('CREATE not active coach', async () => {
        const jane = await User.create({
            email: 'jane@example.com',
            displayName: 'Jane Tarzan',
            active: false,
            coach: true
        });
        expect(jane.displayName).toBe('Jane Tarzan');
    });
    test('READ all users', async () => {
        const users = await User.findAll();
        expect(users[0].dataValues.displayName).toBe('Jane Tarzan');
    });
    test('CREATE trainee belongs to coach', async () => {
        const coach = await User.create({
            email: 'coach@example.com',
            displayName: 'Super coach',
            active: true,
            coach: true
        });
        const trainee = await User.create({
            email: 'trainee@example.com',
            displayName: 'Pie Tierno',
            active: true,
            coach: false
        });
        // await coach.addTrainee(trainee);
        // const result = await User.findOne({
        //     where: { email: 'coach@example.com' },
        //     include: Trainee
        // })
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
                coach: false
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