import Router from 'express';
import VolunteerRouter from './VolunteerRouter.js';
import GuestRouter from './GuestRouter.js';
import CounterRouter from './CounterRouter.js';
import OtherRouter from './OtherRouter.js';
import UpdateRouter from './UpdateRouter.js';

const router = new Router();

router.use('/guests', GuestRouter);
router.use('/volunteers', VolunteerRouter);
router.use('/counter', CounterRouter);
router.use('/enter', OtherRouter);
router.use('/update', UpdateRouter);

export default router;
