const currentGame = async (ctx) =>{
    const game = await ctx.orm.Game.findByPk(ctx.params.game_id);
    if (!game){
        ctx.status = 404
        ctx.response.message = 'No se encontró la partida solicitada';
        return;
    }
    console.log(game)
    const board = await game.getBoard();
    const users = await game.getPlayers({
        order: [
            ['id', 'DESC'],
        ],
    });
    const response = {
        game_id: game.id,
        status:game.finished ? "finished" : "playing",
        turn: game.turn ? "player 1" : "player 2",
        player_1:{
            username: users[0].username,
            player_id: users[0].id,
            position: board.position_player_1
        },
        player_2:{
            username: users[1].username,
            player_id: users[1].id,
            position: board.position_player_2
        }
    }
    ctx.response.body = response;
    ctx.response.status = 200;
};
const move = async (ctx) =>{
    const data = ctx.request.body
    if(data.length < 3){
        ctx.status = 401;
        ctx.response.message = 'Faltan datos. Inténtalo denuevo';
        return;
    }
    const game = await ctx.orm.Game.findByPk(data.game_id);
    if (!game){
        ctx.status = 404;
        ctx.response.message = 'No se encontró la partida solicitada';
        return;
    }
    if (game.finished){
        ctx.status = 403;
        ctx.response.message = 'La partida ya ha terminado';
        return;
    }
    const player = await game.getPlayers({
        where:{
            id:data.player_id,
        },
    });
    if (player.length == 0){
        ctx.status = 403;
        ctx.response.message = 'El jugador ingresado no pertenece a la partida';
        return;
    }
    const players = await game.getPlayers({
        order: [
            ['id', 'DESC'],
        ],
    });
    const turn = game.turn ? 1 : 2;
    if (player[0].id == players[0].id){
        console.log(player[0].id);
        console.log(players[0].id);
        if (turn == 2){
            ctx.status = 403;
            ctx.response.message = 'No es tu turno!';
            return;
        }
    } else {
        console.log(player[0].id);
        console.log(players[0].id);
        if (turn == 1){
            ctx.status = 403;
            ctx.response.message = 'No es tu turno!';
            return;
        }
    }
    const board = await game.getBoard();

    if (turn == 1){
        board.position_player_1 += data.movement;
    } else {
        board.position_player_2 += data.movement;
    }
    await board.save();
    if (board.position_player_1 >= 25 || board.position_player_2 >=25){
        game.finished = true
    }
    game.turn = !game.turn;
    await game.save();
    ctx.response.status = 200;
    ctx.response.message = "Jugada hecha con éxito";
}

module.exports = {
    move,
    currentGame,
}