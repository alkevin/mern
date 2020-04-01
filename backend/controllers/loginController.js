const mongoose = require('mongoose');
import userSchema from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const User = mongoose.model('User', userSchema);

require('dotenv').config();

/*export const login = async(req, res) => {
  //Login a registered user
  try {
    const { mail, password } = req.body;
    const user = await User.findByCredentials(mail, password);
    if (!user) {
      return res.status(401).send({error: 'Login failed! Check authentication credentials'});
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};*/

export const login = async (req, res) => {
  // 1- check if email exists
  const person = await User.findOne({ mail: req.body.mail });
  // 2- if exist, compare password with bcrypt
  if (!person) {
    return res.send('this user does not exist');
  }
  // the user exist at this point
  const password = req.body.password;
  bcrypt.compare(password, person.password, function (error, success) {
    if (success) {
      const payload = {
        exp: moment().add(1, 'hour').unix(),
        iat: moment().unix(),
        iss: person.id
      };
      // 3- generate jwt token
      let token = jwt.sign(payload, process.env.TOKEN_SECRET);
      // 4- return peron with token
      res.json({
        firstName: person.firstName,
        lastName: person.lastName,
        token: `Bearer ${token}`,
        expiration: moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss')
      });
    }
    else
      res.send('this email and password combinaition is incorrect');
  });
};
