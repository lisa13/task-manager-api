const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userONeID, userOne, setupDb }  = require('./fixtures/db');




beforeEach(setupDb)

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'new',
        email: 'new@example.com',
        password: 'Entropy1313!'
    }).expect(201)

    //assert that the db has been updated correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //assertion about response body
    expect(response.body).toMatchObject({
        user: {
            name: 'new'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('myPass123');

});

test('should login the user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    const user = await User.findById(userONeID);
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

test('should get user profile', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get user profile without auth', async () => {
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('should delete user account', async () => {
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
 
})

test('should not be able to delete user profile without auth', async () => {
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})