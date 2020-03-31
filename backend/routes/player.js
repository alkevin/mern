module.exports = function(app){
  const player = require('../controllers/playerController');

  // Routes
  app.routes('/players')
    .get(player.list_all_players)
    .post(player.create_player)
    .delete(player.delete_all_players);

  app.route('/players/:id')
    .get(player.get_player)
    .put(player.update_player)
    .delete(player.delete_player);

};
