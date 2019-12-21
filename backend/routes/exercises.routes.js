const router = require('express').Router();
const Exercise = require('../models/exercise.model');

router.route('/getAllExercises').get(async (req, res) => {
    try {
        let allExercises = await Exercise.find();
        res.status(200).json(allExercises);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/addExercise').post(async (req, res) => {
    try {
        const userName = req.body.userName;
        const description = req.body.description;
        const duration = Number(req.body.duration);
        const date = Date.parse(req.body.date);

        const newExercise = new Exercise({
            userName,
            description,
            duration,
            date
        });

        let savedExercise = await newExercise.save();
        res.status(200).json('Exercise saved!');

    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;