import express from 'express';
import { create_player, list_all_players, delete_all_players, get_player, update_player, delete_players } from '../controllers/playerController';
let playerRouter = express.Router();

playerRouter.post('/', create_player);
playerRouter.get('/', list_all_players);
playerRouter.delete('/players', delete_all_players);

playerRouter.get('/players/:id', get_player);
playerRouter.put('/players/:id', update_player);
playerRouter.delete('/players/:id', delete_players);

export default playerRouter;
