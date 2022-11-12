import Router from 'express';
import VolunteerRouter from './VolunteerRouter.js';
import GuestRouter from './GuestRouter.js';
import CounterRouter from './CounterRouter.js';
import OtherRouter from './OtherRouter.js';

const router = new Router();

router.use('/guests', GuestRouter);
router.use('/volunteers', VolunteerRouter);
router.use('/counter', CounterRouter)
router.use('/enter', OtherRouter)

export default router;
