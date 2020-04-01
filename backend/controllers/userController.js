const mongoose = require('mongoose');
import userSchema from '../models/userModel';

const User = mongoose.model('User', userSchema);

export const list_all_users = function (req, res){
  User.find({})
    .then( users => {
      if(!users){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Could not find users.',
          users: users
        });
      }
      res.status(200);
      return res.json({
        status: '200',
        message: 'users fetched successfully.',
        users
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong fetched users.' + err
      });
    });
};

export const create_user = async(req, res) => {
  var new_user = new User(req.body);
  User.findOne({mail:new_user.mail})
    .then( user => {
      if(!user){
        try {
          new_user.save();
          const token = new_user.generateAuthToken();
          User.findOne({mail:new_user.mail})
            .then( () => {
              res.status(201).send({
                status: '201',
                message: 'user created.',
                new_user,
                token
              });
            });
        }
        catch (err) {
          res.status(400).send({
            status: '400',
            message: 'Bad Request. Could not create user.',
            user: user
          });
        }
      }
      else {
        res.status(403).send({
          status: '403',
          message: 'user mail already exist. Could not create user.',
          user: req.body
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: '500',
        message: 'Something wrong creating user.' + err
      });
    });
};

exports.get_user = function (req, res){
  User.findOne({_id:req.params.id}, {__v: 0})
    .then(user => {
      if(!user){
        res.status(404);
        return res.json({
          status: '404',
          message: 'user not found with this ID: ' + req.params.id,
        });
      }
      res.status(200);
      return res.json({
        status: '200',
        message: 'user Fetched successfully.',
        user: user
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong retrieving user with ID: ' + req.params.id + '/n' + err
      });
    });
};

exports.update_user = function (req, res) {
  User.findOne({_id:req.params.id})
    .then(userToUpdate => {
      if(!userToUpdate){
        res.status(404);
        return res.json({
          status: '404',
          message: 'user with id ' + req.params.id + ' not found.',
          userSent: req.body
        });
      }
      else {
        User.updateOne({_id:userToUpdate._id}, {$set:req.body}, {new: true}, (err) => {
          if(err){
            res.status(400);
            return res.json({
              status: '400',
              message: 'Could not update user ID: ' + req.params.id,
              userSent: req.body,
              userToUpdate: userToUpdate
            });
          }
          else {
            res.status(200);
            return res.json({
              status: '200',
              message: 'user with id: ' + req.params.id + ' updated.',
              user: userToUpdate
            });
          }
        });
      }
    });
};

exports.findOneUpdate_user = function(req, res){
  User.findOneAndUpdate({id:req.params.id},req.body, {new: true, useFindAndModify: false})
    .then(result => {
      if(!result){
        res.status(400);
        res.json({
          status: '400',
          message: 'Could not update user ID: ' + req.params.id,
          userSent: req.body,
        });
      }
      res.status(200);
      res.json({
        status: '200',
        message: 'user with id: ' + req.params.id + ' updated.',
        user: result
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong updating user with ID: ' + req.params.id + err,
      });
    });
};

exports.delete_users = function(req, res){
  User.findOne({_id:req.params.id}, {_id: 0})
    .then(user => {
      if(!user){
        res.status(404);
        return res.json({
          status: '404',
          message: 'user with id ' + req.params.id + ' not found.'
        });
      }
      User.deleteOne({_id:req.params.id}, (err, result) => {
        if(err){
          res.status(400);
          return res.json({
            status: '400',
            message: 'Could not delete user ID: ' + req.params.id
          });
        }
        res.status(200);
        return res.json({
          status: '200',
          message: 'user with id : ' + req.params.id + ' deleted',
          result: result
        });
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong retrieving user with ID: ' + req.params.id + err
      });
    });
};

exports.delete_all_users = function (req, res){
  User.find({})
    .then( users => {
      if(!users){
        res.status(404);
        return res.json({
          status: '404',
          message: 'Could not find users.',
          users: users
        });
      }
      else {
        users.forEach(user => {
          User.deleteOne({mail:user.mail});
        });
        res.status(200);
        return res.json({
          status: '200',
          message: 'All users deleted successfully.',
          users
        });
      }
    })
    .catch(err => {
      res.status(500);
      return res.json({
        status: '500',
        message: 'Something wrong fetched users.' + err
      });
    });
};
