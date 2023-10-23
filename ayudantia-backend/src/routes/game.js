const Router = require('koa-router');

const router = new Router();

// requerir info de la API
const game = require('../controllers/game.controller');

router.post('/move', game.move);

router.get('game.show', '/:game_id', game.currentGame);



// requerir info de la API
module.exports = router;
