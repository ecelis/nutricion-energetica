const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('passport');
const passportOpts = require('../config/settings');

router.post('/', passport.authenticate('magiclogin', passportOpts),
    async function(req, res, next) {
        console.log(req.body)
        res.send(JSON.stringify(req.data))
    }
);

module.exports = router;