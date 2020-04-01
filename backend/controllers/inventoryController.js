const mongoose = require('mongoose');
import fishSchema from '../models/fishModel';

const Fish = mongoose.model('Fish', fishSchema);

export const list_all_fishs = function(req, res){
  Fish.find({})
    .then( fishs => {
      if( !fishs ){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Could not find any fish',
          fishs: fishs
        });
      } else {
        res.status(200);
        return res.json({
          status: '200',
          message: 'Fish fetch successfully.',
          fishs
        });
      }
    })
    .catch( err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong fetched fish.' + err
      });
    });
};

export const create_fish = function(req, res){
  var new_fish = new Fish(req.body);
  Fish.findOne({id:new_fish.id})
    .then( fish => {
      if(!fish){
        new_fish.save(function(err, fish){
          if(err){
            res.status(400).send({
              status: '400',
              message: 'Bad Request. Could not create a fish !',
              fish: fish
            });
          }
          else {
            res.status(201).send({
              status: '201',
              message: 'Fish created !',
              fish: fish
            });
          }
        });
      }
      else {
        res.status(403).send({
          status: '403',
          message: 'Fish already exist ! ',
          fish: req.body
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: '500',
        message: 'Something wrong created fish.' + err
      });
    });
};

export const get_fish = function (req, res){
  Fish.findOne({_id:req.params.id})
    .then(fish => {
      if(!fish){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Fish not found with this ID: ' + req.params.id,
        });
      }
      res.status(200);
      return res.json({
        status: '200',
        message: 'Fish Fetched successfully.',
        fish: fish
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong retrieving fish with ID: ' + req.params.id + '\n' + err
      });
    });
};

export const update_fish = function (req, res) {
  Fish.findOne({_id:req.params.id})
    .then(fishToUpdate => {
      if(!fishToUpdate){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Fish with id ' + req.params.id + ' not found.',
          fishSent: req.body
        });
      }
      else {
        Fish.updateOne({_id:fishToUpdate._id}, {$set:req.body}, {new: true}, (err, result) => {
          if(err){
            res.status(400);
            return res.json({
              status: '400',
              message: 'Could not update fish ID: ' + req.params.id,
              fishSent: req.body,
              fishToUpdate: fishToUpdate
            });
          }
          else {
            res.status(200);
            return res.json({
              status: '200',
              message: 'Fish with id: ' + req.params.id + ' updated.',
              fish: fishToUpdate
            });
          }
        });
      }
    });
};

export const delete_fish = function(req, res){
  Fish.findOne({_id:req.params.id})
    .then(fish => {
      if(!fish){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Fish with id ' + req.params.id + ' not found.'
        });
      }
      Fish.deleteOne({_id:req.params.id}, (err, result) => {
        if(err){
          res.status(400);
          return res.json({
            status: '400',
            message: 'Could not delete fish ID: ' + req.params.id
          });
        }
        res.status(200);
        return res.json({
          status: '200',
          message: 'Fish with id : ' + req.params.id + ' deleted',
          result: result
        });
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong retrieving fish with ID: ' + req.params.id + '\n' + err
      });
    });
};

export const delete_all_fishs = function (req, res){
  Fish.find({})
    .then( fishs => {
      if(!fishs){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Could not find fish.',
          fishs: fishs
        });
      }
      else {
        fishs.forEach(fish => {
          Fish.deleteOne({name:fish.name});
        });
        res.status(200);
        return res.json({
          status: '200',
          message: 'All fish deleted successfully.',
          fishs
        });
      }
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong fetched fish.' + '\n' + err
      });
    });
};
