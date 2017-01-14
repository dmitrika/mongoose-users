const Koa = require('koa')
const app = module.exports = new Koa()

const Router = require('koa-router')
const router = new Router()

router
    .param('userById', async (id, ctx, next) => {
    })
    .post('/', async (ctx) => {
    })
    .patch('/:userById', async (ctx) => {
    })
    .get('/:userById', async (ctx) => {
    })
    .del('/:userById', async (ctx) => {
    })
    .get('/', async (ctx) => {
    })

app.use(router.routes())
