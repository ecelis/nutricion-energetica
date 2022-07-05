const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('passport');
const passportOpts = require('../config/settings');

router.get('/', passport.authenticate('magiclogin', passportOpts),
    async function(req, res, next) {
        const { MealType } = db.sequelize.models;
        const data = req.body;
        const mealTypes = await MealType.findAll();
        res.send(mealTypes);
    }
);

module.exports = router;
