const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaLogger = require('koa-logger');
const router = require('./routes');
const orm = require('./models');

const app = new Koa();

// Expose orm to koa context
app.context.orm = orm;

// Logs requests from the server
app.use(KoaLogger());

// Parse request body
app.use(koaBody());



app.use(router.routes());

app.on('error', (err, ctx) => {
  console.log(err);
});

module.exports = app;
