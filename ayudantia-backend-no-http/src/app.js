const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaLogger = require('koa-logger');
const orm = require('./models');

const app = new Koa();

// Expose orm to koa context
app.context.orm = orm;

// Logs requests from the server
app.use(KoaLogger());



app.on('error', (err, ctx) => {
  console.log(err);
});

module.exports = app;
