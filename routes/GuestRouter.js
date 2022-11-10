import Router from 'express';
import GuestController from '../controllers/GuestController.js';

const router = new Router();

router.put('/enter/:id', GuestController.checkGuest);

export default router;
