const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { Category } = db.sequelize.models;

describe('Test Category', () => {
    test('CREATE Category', async () => {
        const cat = await Category.create({
            description_en: 'Cheese', descripcion_es: 'Queso', ndbn: 1001
        });
        const result = await Category.findOne({
            where:{description_en: 'Cheese'}
        });
        expect(result.descripcion_es).toBe('Queso');
    });
});

describe('API Category', () => {
    beforeAll(async () => {
        const cat = await Category.create({
            description_en: 'Letuce', descripcion_es: 'Lechuga', ndbn: 1002
        });
    });
    test('POST Category', () => {
        return request(app)
            .post('/category')
            .send({
                description_en: 'Pizza', descripcion_es: 'Pizza', ndbn: 1002
            })
            .set('Accept', 'application/json')
            .then(async (res) => {
                expect(res.statusCode).toBe(200);
            });
    });
});