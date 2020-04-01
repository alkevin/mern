import express from 'express';

import { create_fish, list_all_fishs, delete_all_fishs, get_fish, update_fish, delete_fish } from '../controllers/inventoryController';


let fishRouter = express.Router();

fishRouter.post('/', create_fish);
fishRouter.get('/', list_all_fishs);
fishRouter.delete('/', delete_all_fishs);

fishRouter.get('/:id', get_fish);
fishRouter.put('/:id', update_fish);
fishRouter.delete('/:id', delete_fish);


export default fishRouter;
