/* globals describe, beforeEach, it */
const expect = require('chai').expect
const app = require('../app')

const request = require('request-promise').defaults({
    resolveWithFullResponse: true,
    simple: false
})

const User = require('../libs/user')

function getURL(path) {
    return `http://localhost:3000${path}`
}

let server

describe('User REST API', async () => {
    let existingUserData = {
        email: 'dima@test.ru',
        displayName: 'Dima'
    }
    let newUserData = {
        email: 'vanya@test.ru',
        displayName: 'Vanya'
    }
    let existingUser

    before(done => {
        server = app.listen(3000, done)
    })

    after(done => {
        server.close(done)
    })

    beforeEach(async () => {
        await User.remove({})
        existingUser = await User.create(existingUserData)
    })

    describe('POST /users', async () => {
        it('creates a user', async () => {
            let response = await request({
                method: 'post',
                uri: getURL('/users'),
                json: true,
                body: newUserData
            })

            expect(response.body.displayName).to.be.equal(newUserData.displayName)
            expect(response.body.email).to.be.equal(newUserData.email)
        })

        it('throws 400 if email already exists', async () => {
            let response = await request({
                method: 'post',
                uri: getURL('/users'),
                json: true,
                body: {
                    email: 'dima@test.ru'
                }
            })

            expect(response.statusCode).to.be.equal(400)
        })

        it('throws 400 if email not valid', async () => {
            let response = await request({
                method: 'post',
                uri: getURL('/users'),
                json: true,
                body: {
                    email: 'avadakedavra'
                }
            })

            expect(response.statusCode).to.be.equal(400)
        })

    })

    describe('PATCH /user/:userById', async () => {
        it('gets the user by id and patch it', async () => {
            let newEmail = 'dimaPATCHED@test.ru'
            let response = await request({
                method: 'patch',
                uri: getURL('/users/' + existingUser._id),
                json: true,
                body: {
                    email: newEmail
                }
            })

            expect(response.statusCode).to.be.equal(200)
            expect(response.body.email).to.be.equal(newEmail)
        })

        it('returns 404 if email is not valid', async () => {
            let response = await request({
                method: 'patch',
                uri: getURL('/users/1337' + existingUser._id),
                json: true,
                body: {
                    email: 'whatever'
                }
            })

            expect(response.statusCode).to.be.equal(404)
        })

        it('returns 404 if user does not exist', async () => {
            let response = await request({
                method: 'patch',
                uri: getURL('/users/1337'),
                json: true,
                body: {
                    email: 'whatever@email.com'
                }
            })

            expect(response.statusCode).to.be.equal(404)
        })
    })

    describe('GET /user/:userById', async () => {
        it('gets the user by id', async () => {
            let response = await request.get(getURL('/users/' + existingUser._id))

            expect(response.statusCode).to.be.equal(200)
            expect(JSON.parse(response.body).email).to.be.equal(existingUser.email)
        })

        it('returns 404 if user does not exist', async () => {
            let response = await request.get(getURL('/users/1337'))

            expect(response.statusCode).to.be.equal(404)
        })

        it('returns 404 if invalid id', async () => {
            let response = await request.get(getURL('/users/test'))

            expect(response.statusCode).to.be.equal(404)
        })
    })

    describe('DELETE /user/:userById', async () => {
        it('removes user', async () => {
            let response = await request.del(getURL('/users/' + existingUser._id))
            let users = await User.find({})

            expect(response.statusCode).to.be.equal(200)
            expect(users.length).to.be.equal(0)
        })

        it('returns 404 if the user does not exist', async () => {
            let response = await request.del(getURL('/users/1123131'))

            expect(response.statusCode).to.be.equal(404)
        })
    })

    it('GET /users gets all users', async () => {
        let response = await request.get(getURL('/users'))

        expect(response.statusCode).to.be.equal(200)
        expect(JSON.parse(response.body).length).to.be.equal(1)
    })
})
