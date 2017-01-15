const fs = require('fs')
const path = require('path')
const pick = require('lodash/pick')

const Koa = require('koa')
const app = module.exports = new Koa()

const handlers = fs.readdirSync(path.join(__dirname, 'handlers'))
handlers.forEach(handler => require('./handlers/' + handler).init(app))

const Router = require('koa-router')
const router = new Router({
    prefix: '/users'
})

const mongoose = require('./libs/mongoose')
const User = require('./libs/user')

router
    .param('userById', async (id, ctx, next) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            ctx.throw(404)
        }

        ctx.userById = await User.findById(id)

        if (!ctx.userById) {
            ctx.throw(404)
        }

        await next()
    })
    .post('/', async (ctx) => {
        let user = await User.create(pick(ctx.request.body, User.publicFields))

        ctx.body = user.toObject()
    })
    .patch('/:userById', async (ctx) => {
        Object.assign(ctx.userById, pick(ctx.request.body, User.publicFields))
        await ctx.userById.save()

        ctx.body = ctx.userById.toObject()
    })
    .get('/:userById', async (ctx) => {
        ctx.body = ctx.userById.toObject()
    })
    .del('/:userById', async (ctx) => {
        await ctx.userById.remove()

        ctx.body = 'deleted'
    })
    .get('/', async (ctx) => {
        let users = await User.find({})

        ctx.body = users.map(user => user.toObject())
    })

app.use(router.routes())
