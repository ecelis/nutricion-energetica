const request = require('supertest');
const db = require('../models');
const app = require('../app');
const { post } = require('superagent');
const { send } = require('express/lib/response');

const { User } = db.sequelize.models;

describe('Test Authentication', () => {
    test('Authenticate new user', async () => {
        return request(app)
            .post('/login/email')
            .send({
                destination: 'atest@celisdelafuente.net',
                displayName: 'Pepito'
            })
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.statusCode).toBe(200);
            });
    });
});
