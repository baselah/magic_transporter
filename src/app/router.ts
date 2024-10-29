import express from 'express';
import MoverRouter from './MagicMover/router';
import ItemRouter from './MagicItem/router';
const router = express.Router();

router.use('/mover', MoverRouter);
router.use('/item', ItemRouter);

export default router;
