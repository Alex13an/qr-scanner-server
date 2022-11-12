import Router from 'express';
import { otherControllerCreator } from '../controllers/OtherController.js';
import tableTypes from '../models/tableTypes.js';

const router = new Router();

router.put('/press/:id', otherControllerCreator(tableTypes.other.press));
router.put('/local_press/:id', otherControllerCreator(tableTypes.other.local_press));
router.put('/staff/:id', otherControllerCreator(tableTypes.other.staff));
router.put('/other/:id', otherControllerCreator(tableTypes.other.other));
router.put('/organizators/:id', otherControllerCreator(tableTypes.other.organizators));

export default router;
