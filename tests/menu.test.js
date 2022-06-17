const request = require('supertest');
const db = require('../models');
const app = require('../app');

const { Menu, User } = db.sequelize.models;

describe('Test Menu', () => {
    beforeAll(async () => {
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
        return {coach: coach, trainee: trainee };
    });
    test('CREATE Menu', async () => {
        const menu = await Menu.create({
            title: 'Dia 4',
            date: new Date('2022-06-19')
        });
        expect(menu.title).toBe('Dia 4');
    });
    test('ADD Menu to User', async () => {
        const coach = await User.findOne({
            include: 'Coach', where: { email: 'coach@example.com' }});
    
        const menu = await Menu.create({
            title: 'Dia 4',
            date: new Date('2022-06-19')
        });
        await coach.addMenu(menu);
        const result = await coach.hasMenu(menu);
        expect(result).toBe(true);
    });
    test('READ Menu from Coach', async () => {
        const user = await User.findOne({ where: { email: 'coach@example.com' } });
        const menu = await user.getMenus();
        expect(menu[0].dataValues.title).toBe('Dia 4');
    });
});
