import Router from 'express';
import VolunteerRouter from './VolunteerRouter.js';
import GuestRouter from './GuestRouter.js';

const router = new Router();

router.use('/guests', GuestRouter);
router.use('/volunteers', VolunteerRouter);

export default router;
