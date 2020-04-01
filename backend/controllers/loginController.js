const mongoose = require('mongoose');
import userSchema from '../models/userModel';

const User = mongoose.model('User', userSchema);

export const login = async(req, res) => {
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
};
