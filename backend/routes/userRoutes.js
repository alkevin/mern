import express from 'express';

import { create_user, list_all_users, delete_all_users, get_user, update_user, delete_users } from '../controllers/userController';
import { login } from '../controllers/loginController';
import auth from '../middleware/auth';


let userRouter = express.Router();

userRouter.post('/', create_user);
userRouter.get('/', list_all_users);
userRouter.delete('/', delete_all_users);

userRouter.get('/:id', get_user);
userRouter.put('/:id', update_user);
userRouter.delete('/:id', delete_users);

userRouter.post('/login', login);

userRouter.get('/me', auth, async(req, res) => {
  res.send(req.user);
});

export default userRouter;
