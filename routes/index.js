import Router from 'express';
import UserRouter from './UserRouter.js';
import VolunteerRouter from './VolunteerRouter.js';

const router = new Router();

router.use('/users', UserRouter);
router.use('/volunteers', VolunteerRouter);

export default router;
