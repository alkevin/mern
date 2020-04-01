const mongoose = require('mongoose');
import playerSchema from '../models/playerModel';

const Player = mongoose.model('Player', playerSchema);

export const list_all_players = function (req, res){
  Player.find({})
    .then( players => {
      if(!players){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Could not find players.',
          players: players
        });
      }
      res.status(200);
      return res.json({
        status: '200',
        message: 'PLayers fetched successfully.',
        players
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong fetched players.' + err
      });
    });
};

exports.create_player = async(req, res) => {
  var new_player = new Player(req.body);
  Player.findOne({mail:new_player.mail})
    .then( player => {
      if(!player){
        try {
          new_player.save();
          const token = new_player.generateAuthToken();
          Player.findOne({mail:new_player.mail})
            .then( () => {
              res.status(201).send({
                status: '201',
                message: 'Player created.',
                new_player,
                token
              });
            });
        }
        catch (err) {
          res.status(400).send({
            status: '400',
            message: 'Bad Request. Could not create player.',
            player: player
          });
        }
      }
      else {
        res.status(403).send({
          status: '403',
          message: 'PLayer mail already exist. Could not create player.',
          player: req.body
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: '500',
        message: 'Something wrong creating player.' + err
      });
    });
};

exports.get_player = function (req, res){
  Player.findOne({_id:req.params.id}, {__v: 0})
    .then(player => {
      if(!player){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Player not found with this ID: ' + req.params.id,
        });
      }
      res.status(200);
      return res.json({
        status: '200',
        message: 'Player Fetched successfully.',
        player: player
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong retrieving player with ID: ' + req.params.id + '/n' + err
      });
    });
};

exports.update_player = function (req, res) {
  Player.findOne({_id:req.params.id})
    .then(playerToUpdate => {
      if(!playerToUpdate){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Player with id ' + req.params.id + ' not found.',
          playerSent: req.body
        });
      }
      else {
        Player.updateOne({_id:playerToUpdate._id}, {$set:req.body}, {new: true}, (err, result) => {
          if(err){
            res.status(400);
            return res.json({
              status: '400',
              message: 'Could not update player ID: ' + req.params.id,
              playerSent: req.body,
              playerToUpdate: playerToUpdate
            });
          }
          else {
            res.status(200);
            return res.json({
              status: '200',
              message: 'Player with id: ' + req.params.id + ' updated.',
              player: playerToUpdate
            });
          }
        });
      }
    });
};

exports.findOneUpdate_player = function(req, res){
  Player.findOneAndUpdate({id:req.params.id},req.body, {new: true, useFindAndModify: false})
    .then(result => {
      if(!result){
        res.status(400);
        res.json({
          status: '400',
          message: 'Could not update player ID: ' + req.params.id,
          playerSent: req.body,
        });
      }
      res.status(200);
      res.json({
        status: '200',
        message: 'User with id: ' + req.params.id + ' updated.',
        player: result
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong updating player with ID: ' + req.params.id + err,
      });
    });
};

exports.delete_players = function(req, res){
  Player.findOne({_id:req.params.id}, {_id: 0})
    .then(player => {
      if(!player){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Player with id ' + req.params.id + ' not found.'
        });
      }
      Player.deleteOne({_id:req.params.id}, (err, result) => {
        if(err){
          res.status(400);
          return res.json({
            status: '400',
            message: 'Could not delete player ID: ' + req.params.id
          });
        }
        res.status(200);
        return res.json({
          status: '200',
          message: 'Player with id : ' + req.params.id + ' deleted',
          result: result
        });
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong retrieving player with ID: ' + req.params.id + err
      });
    });
};

exports.delete_all_players = function (req, res){
  Player.find({})
    .then( players => {
      if(!players){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Could not find players.',
          players: players
        });
      }
      else {
        players.forEach(player => {
          Player.deleteOne({mail:player.mail});
        });
        res.status(200);
        return res.json({
          status: '200',
          message: 'All players deleted successfully.',
          players
        });
      }
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong fetched players.' + err
      });
    });
};
