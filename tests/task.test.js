const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app')

const { userONeID, userOne, setupDb } = require('./fixtures/db');

beforeEach(setupDb)

test('should create task for user', async () => {
    const response = await request(app)
        .post('/task')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            descritpion: 'from my test'
        })
        const task = Task.findById(response.body._id);
        expect(task).not.toBeNull()
});
