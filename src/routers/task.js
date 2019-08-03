const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/task');


router.post('/task', auth, async (req, res) => {
    console.log(req.body)

    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    }
    catch (err) {
        res.status(400).send();
    }
});


//get task completed true
//limit, skip pagination
//GET/task?limit=10&skip=0
//GET/task/sortBy=createdAt:desc
router.get('/task', auth, async (req, res) => {
    const match = {};
    const sort = {};
    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    // const task = await Task.find({ owner: req.user._id}); or

    try {
        // res.send(task);
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     //createdAt: +1 || or -1 for descending || 1 in order that has been created initially
                //     completed: 1
                // }

            }
        }).execPopulate();
        res.send(req.user.tasks);
    }
    catch (err) {
        res.status(500).send();
    }
});


router.get('/task/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            res.status(404).send('Not found')
        }
        res.send(task);
        console.log(task);
    } catch (err) {
        res.status(500).send()
    }
});


router.patch('/task/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowed = ['completed', 'description'];
    const isValid = updates.every((update) => allowed.includes(update));

    if (!isValid) {
        return res.status(400).send('bad request')
    }
    try {

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task)
    }
    catch (err) {
        res.status(500).send();
    }

});

router.delete('/task/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            res.status(404).send();
        }
        res.send(task);
    }
    catch (err) {
        res.status(500).send();
    }

});

module.exports = router;

