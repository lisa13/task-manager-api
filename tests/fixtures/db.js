const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

const Task = require('../../src/models/task');


const userONeID = mongoose.Types.ObjectId();
const userOne = {
    _id: userONeID,
    name: 'mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userONeID }, process.env.JWT_SECRET)
    }]
}

const userTwoID = mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoID,
    name: 'lisa',
    email: 'lisa@example.com',
    password: 'Entropy1313!!',
    tokens: [{
        token: jwt.sign({ _id: userTwoID }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'test task',
    completed: false,
    owner: userONeID
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third test task',
    completed: false,
    owner: userTwo._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second test task',
    completed: true,
    owner: userONeID
}



const setupDb = async () => {
    await User.deleteMany();
    await Task.deleteMany();

    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    userONeID,
    userOne,
    setupDb
}