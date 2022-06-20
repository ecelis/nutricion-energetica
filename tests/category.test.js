const request = requiere('supertest');
const db = require('../models');
const app = require('../app');

const { Category } = db.sequelize.moedls;

describe('Test Category', () => {
    test('CREATE Category', async () => {
        const cat = await Category.create({
            description_en: 'Cheese', descripcion_es: 'Queso'
        });
        expect(await Category.findOne({
            where:{description_en: 'Chesse'}
        }).descripcion_es)
            .toBe('Queso');
    });
});

describe('API Category', () => {
    beforeAll(async () => {
        const cat = await Category.create({
            description_en: 'Letuce', descripcion_es: 'Lechuga'
        });
    });
    test('POST Category', () => {
        return request(app)
            .post('/category')
            .send({
                description_en: 'Pizza', descripcion_es: 'Pizza'
            })
            .set('Accept', 'application/json')
            .then(async (res) => {
                expect(res.statusCode).toBe(200);
            });
    });
});