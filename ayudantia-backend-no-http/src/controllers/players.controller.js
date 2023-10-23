const orm = require('../models');

const getPlayers = async (ctx)=>{
    const players = await orm.Player.findAll();
    return players;
}
module.exports = {
    getPlayers
}