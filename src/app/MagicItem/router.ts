import express from 'express';
import { validationMiddleware } from '../../middleware/validationmiddleware';
import { addItem, getAllItems } from './controller';
import { ItemDto } from './validationDto';
const router = express.Router();

router.post('/', validationMiddleware(ItemDto), addItem);
router.get('/', getAllItems);

export default router;
