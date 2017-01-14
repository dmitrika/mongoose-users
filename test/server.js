/* globals describe, beforeEach, it */

const app = require('../app')

const request = require('request-promise').defaults({
    resolveWithFullResponse: true,
    simple: false
})

// const User = require('../libs/user')

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

    // before(done => {
    //     server = app.listen(3000, done)
    // })
    //
    // after(done => {
    //     server.close(done)
    // })

    beforeEach(async () => {
        // load fixtures
        // await User.remove({})
        // existingUser = await User.create(existingUserData)
    })

    describe('POST /users', async () => {
        it('creates a user', async () => {

        })

        it('throws if email already exists', async () => {

        })

        it('throws if email not valid', async () => {

        })

    })

    describe('GET /user/:userById', async () => {
        it('gets the user by id', async () => {

        })

        it('returns 404 if user does not exist', async () => {

        })

        it('returns 404 if invalid id', async () => {

        })
    })

    describe('DELETE /user/:userById', async () => {
        it('removes user', async () => {

        })

        it('returns 404 if the user does not exist', async () => {

        })
    })

    it('GET /users gets all users', async () => {

    })
})
