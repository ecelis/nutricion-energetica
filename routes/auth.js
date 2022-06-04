require('dotenv').config();
const express = require('express');
const passport = require('passport');
const MagicLoginStrategy = require('passport-magic-login').default;
const sendgrid = require('@sendgrid/mail');
const db = require('../models');
const {urlBuilder} = require('../util/utils');

const router = express.Router();
const {
    JWT_SECRET,
    AUTH_CALLBACK,
    EMAIL} = process.env;

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const magicLogin = new MagicLoginStrategy({
    secret: JWT_SECRET,
    cookie: { secure: true },
    callbackUrl: AUTH_CALLBACK,
    sendMagicLink: async (destination, href) => {
        try {
            const msg = {
                to: destination,
                from: EMAIL,
                subject: 'Sign in NE',
                text: 'Hola Click the link\r\n\r\n' + urlBuilder(href),
                html: 'Hola Click the link\r\n\r\n' + urlBuilder(href),
            };
            
            await sendgrid.send(msg);
        } catch (error) {
            // TODO handle the error
            console.log(error);
        }
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
                        active: 1
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
    user.destination = user.email;
    done(JSON.stringify(user));
});

passport.deserializeUser((user, done) => {
    done(user);
});

passport.use(magicLogin);

router.post('/login/email', magicLogin.send);

router.get('/login/callback',
    passport.authenticate('magiclogin', { session: false }),
    function(req, res) {
        res.json(req.user);
    });

module.exports = router;
