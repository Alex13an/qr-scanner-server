import Router from 'express';
import CounterController from '../controllers/CounterController.js';

const router = new Router();

router.get('/:id', CounterController.getCounterForce);
router.put('/', CounterController.initLimits);
router.post('/limit/:session', CounterController.addEventLimit);
router.put('/limit/:session', CounterController.updateFreeSpace);

export default router;
