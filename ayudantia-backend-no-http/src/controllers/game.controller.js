const orm = require('../models');

const getGames = async (ctx)=>{
    const games = await orm.Game.findAll();
    return games;
}
const currentGame = async (ctx) =>{
    const game = await orm.Game.findByPk(ctx.body.game_id);
    if (!game){
         
        return 'No se encontró la partida solicitada';
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
    return response;

};
const move = async (ctx) =>{
    const data = ctx.body
    if(data.length < 3){
        return 'Faltan datos. Inténtalo denuevo';
    }
    const game = await orm.Game.findByPk(data.game_id);
    if (!game){
        
        return 'No se encontró la partida solicitada';
    }
    if (game.finished){
        
        return 'La partida ya ha terminado';
    }
    const player = await game.getPlayers({
        where:{
            id:data.player_id,
        },
    });
    if (player.length == 0){
        
        return 'El jugador ingresado no pertenece a la partida';
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
            
            return 'No es tu turno!';
        }
    } else {
        console.log(player[0].id);
        console.log(players[0].id);
        if (turn == 1){
            
            return 'No es tu turno!';
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
    return "Jugada hecha con éxito";
}

module.exports = {
    move,
    currentGame,
    getGames
}