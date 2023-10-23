const Router = require('koa-router');
const game = require('./routes/game');

const router = new Router();// instanciar router
// definir como ordeno el login
router.get('/', async (ctx)=>{
    ctx.response.body = "Si, obtengo este texto del server";
    ctx.response.status = 200;
})
router.get('/games', async (ctx)=>{
    const games = await ctx.orm.Game.findAll();
    ctx.response.body = games;
    ctx.status = 200;
});
router.get('/players', async (ctx)=>{
    const players = await ctx.orm.Player.findAll();
    ctx.response.body = players;
    ctx.status = 200;
});
router.use('/game', game.routes());

module.exports = router;

// Si queremos endpoints para algo, tenemos que tener el archivo con su debida carpeta.
// Por ejemplo, si queremos endpoints para movies, tenemos que guardarlo dentro de un
// archivo llamado movies.js dentro de routes
