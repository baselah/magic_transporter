import express from 'express';
import { validationMiddleware } from '../../middleware/validationmiddleware';
import {
  addMover,
  endMission,
  getAllMovers,
  loadItems,
  startMission,
  topMovers,
} from './controller';
import { MoverDto, MoverItemsDto } from './validationDto';
const router = express.Router();

router.post('/', validationMiddleware(MoverDto), addMover);
router.get('/', getAllMovers);
router.post('/load-items/:mover_id', validationMiddleware(MoverItemsDto), loadItems);
router.post('/start-mission/:mover_id', startMission);
router.post('/end-mission/:mover_id', endMission);
router.get('/top', topMovers);

export default router;
