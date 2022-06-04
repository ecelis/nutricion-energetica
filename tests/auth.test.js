const request = require('supertest');
const db = require('../models');
const app = require('../app');
const { post } = require('superagent');
const { send } = require('express/lib/response');

const { User } = db.sequelize.models;
let loginLink = '';

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
    /* Find a way to get the token 
    test('Authenticate existing user', async () => {
        return request(app)
            .get('/login/callback?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXN0aW5hdGlvbiI6ImF0ZXN0QGNlbGlzZGVsYWZ1ZW50ZS5uZXQiLCJkaXNwbGF5TmFtZSI6IlBlcGl0byIsImNvZGUiOiI4NzA5MCIsImlhdCI6MTY1MzU0OTA0MCwiZXhwIjoxNjUzNTUyNjQwfQ.MtNm4cNNVXOOLcKuJy9Ht59DmePMsUzcoDT0TsR8ZjU')
            .set('Accept', 'application/json')
            .then(res => {
                console.log(res.body);
                expect(res.statusCode).toBe(200);
            });
    });*/
});
