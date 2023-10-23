const dotenv = require('dotenv');
const fs = require('fs');
const data = require('./action.json')
const game = require('./controllers/game.controller');
const player = require('./controllers/players.controller');
dotenv.config();

const app = require('./app');
const orm = require('./models');
let response = {}
const PORT = process.env.PORT || 3000;

orm.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(PORT, (err) => {
      if (err) {
        return console.error('Failed', err);
      }
      console.log(`Listening on port ${PORT}`);
      return app;
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err)).then(async ()=>{
    if (data.action == 1){
      response = await game.currentGame(data);
      console.log(response)
    }
    if (data.action == 2){
      response = await game.getGames(data);
      console.log(response)
    }
    if (data.action == 3){
      response = await game.move(data);
      console.log(response)
    }
    if (data.action == 4){
      response = await player.getPlayers(data);
      console.log(response)
    }
    fs.writeFile("response.json", JSON.stringify(response), (error) => {
      // throwing the error
      // in case of a writing problem
      if (error) {
        // logging the error
        console.error(error);
    
        throw error;
      }
    })
    
  });




