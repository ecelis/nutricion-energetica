require('dotenv').config();
const express = require('express');
const passport = require('passport');
const MagicLoginStrategy = require('passport-magic-login').default;
const sendgrid = require('@sendgrid/mail');
const db = require('../models');

const router = express.Router();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const magicLogin = new MagicLoginStrategy({
    secret: 'keyboard cat',
    callbackUrl: '/login/callback',
    sendMagicLink: async (destination, href) => {
        const link = 'http://localhost:3000/login/callback';
        const msg = {
            to: destination,
            from: process.env.EMAIL,
            subject: 'Sign in NE',
            text: 'Hola Click the link\r\n\r\n' + href,
            html: 'Hola Click the link\r\n\r\n' + href,
        };
        await sendgrid.send(msg);
    },
    verify: async (payload, callback) => {
        try {
            const dbUser = await db.sequelize.models.User.findOne({
                where: { email: payload.destination }
            });
            
            if(dbUser === null) {
                try {
                    const newUser = await db.sequelize.models.User.create({
                        email: payload.destination,
                        displayName: payload.displayName,
                        active: 0
                    });
                    return callback(null, newUser.dataValues);
                } catch (error) {
                    return callback(error);
                }
            }
            return callback(null, dbUser.dataValues);
        } catch (error) {
            return callback(error);
        }
    }
});

passport.serializeUser((user, done) => {
    done(JSON.stringify(user));
});

//passport.deserializeUser();

passport.use(magicLogin);

router.post('/login/email', magicLogin.send);

router.get('/login/callback', passport.authenticate('magiclogin', {
    session: true
}));

module.exports = router;
