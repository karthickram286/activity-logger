const router = require('express').Router();
const Exercise = require('../models/exercise.model');

/**
 * Returns all exercises
 */
router.route('/getAllExercises').get(async (req, res) => {
    try {
        let allExercises = await Exercise.find();
        if (allExercises) {
            res.status(200).json(allExercises);
        } else {
            res.status(200).json('Exercises not found');
        }
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

/**
 * Returns an Exercise by ID
 */
router.route('/getExercise/:id').get(async (req, res) => {
    try {
        let exercise = await Exercise.findById(req.params.id);
        if (exercise) {
            res.status(200).json(exercise);
        } else {
            res.status(200).json('Exercise not found');
        }
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

/**
 * Deletes an Exercise by ID
 */
router.route('/deleteExercise/:id').delete(async (req, res) => {
    try {
        await Exercise.findByIdAndRemove(req.params.id); 
        res.status(200).json('Exercise deleted');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

/**
 * Adds an Exercise
 */
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

/**
 * Update an exercise by ID
 */
router.route('/updateExercise/:id').put(async (req, res) => {
    try {
        await Exercise.findByIdAndUpdate(req.params.id, {
            $set: {
                userName: req.body.userName,
                description: req.body.description,
                duration: req.body.duration,
                date: req.body.date
            }
        }, { useFindAndModify: false });
        res.status(200).json('Exercise updated!');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;