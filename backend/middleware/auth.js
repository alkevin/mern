const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

require('dotenv').config();

const JWT_KEY = process.env.TOKEN_SECRET;

const auth = async(req, res, next) => {
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

};

export default auth;
