import Router from 'express';
import GuestController from '../controllers/GuestController.js';

const router = new Router();

router.put('/enter/:id', GuestController.enterGuest);
router.put('/:id', GuestController.guestEnterEventForce);

export default router;
