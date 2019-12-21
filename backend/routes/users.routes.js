const router = require('express').Router();
const User = require('../models/user.model');

/**
 * Return all users
 */
router.route('/getAllUsers').get(async (req, res) => {
    try {
        let allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

/**
 * Add a User
 */
router.route('/addUser').post(async (req, res) => {
    try {
        const userName = req.body.username;
        const newUser = new User({ userName });

        let savedUser = await newUser.save();
        res.status(200).json('User added');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;