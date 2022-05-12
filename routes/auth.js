require('dotenv').config();
const express = require('express');
const passport = require('passport');
const MagicLinkStrategy  = require('passport-magic-link').Strategy;
const sendgrid = require('@sendgrid/mail');
const db = require('../models');

const router = express.Router();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

passport.use(new MagicLinkStrategy({
    secret: 'keyboard cat',
    userFields: ['email', 'displayName'],
    tokenField: 'token',
    verifyUserAfterToken: true
}, function send(user, token) {
    console.log('=====> send email')
    const link = 'http://localhost:3000/login/email/verify?token=' + token;
    const msg = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Sign in NE',
        text: 'Hola Click the link\r\n\r\n' + link,
        html: 'Hola Click the link\r\n\r\n' + link,
    };
    return sendgrid.send(msg);
}, function verify(user) {
    return new Promise(function(resolve, reject) {
        try {
            const dbUser = db.sequelize.models.User.findOne({
                where: { email: user.email }
            });
            console.log('====>', dbUser.toJSON())
            if(!dbUser) {
                try {
                    const newUser = db.sequelize.models.User.create({
                        email: user.email,
                        displayName: user.displayName,
                        active: 0
                    });
                    return resolve(newUser);
                } catch (error) {
                    return reject(error);
                }
            }
            return resolve(dbUser);
        } catch (error) {
            return reject(error);
        }
    })
}));

router.get('/login', function(req, res, next) {
    res.render('login')
});

router.post('/login/email', passport.authenticate('magiclink', {
    action: 'acceptToken'
}), function(req, res, next) {
    res.send({success: true});
});

router.get('/login/email/verify', passport.authenticate('magiclink', {
    action: 'acceptToken'
}));

module.exports = router;
