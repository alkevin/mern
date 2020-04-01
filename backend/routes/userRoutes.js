import express from 'express';

import { create_user, list_all_users, delete_all_users, get_user, update_user, delete_users } from '../controllers/userController';
import { login } from '../controllers/loginController';
import auth from '../middleware/auth';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const JWT_KEY = process.env.TOKEN_SECRET;

let userRouter = express.Router();

userRouter.post('/', create_user);
userRouter.get('/', list_all_users);
userRouter.delete('/', delete_all_users);

//userRouter.get('/:id', get_user);
//userRouter.put('/:id', update_user);
//userRouter.delete('/:id', delete_users);

userRouter.post('/login', login);

/*userRouter.get('/me', async(req, res) => {
  console.log("heejejjeje");
  var token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, JWT_KEY, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    res.status(200).send(decoded);
  });
});*/

userRouter.get('/me', auth, async(req, res) => {
  res.send(req.user);
});

export default userRouter;

/*const auth = async(req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log(token);
  const data = jwt.verify(token, JWT_KEY);
  console.log(data);
  try {
    const user = await User.findOne({ _id: data.iss, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }

};*/

/*userRouter.get('/me', async(req, res) => {
  res.send(req.user);
});

userRouter.get('/me', async(req, res) => {
  var token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, JWT_KEY, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    res.status(200).send(decoded);
  });
});

// check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });*/
