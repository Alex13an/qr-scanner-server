import Router from 'express';
import VolunteerController from '../controllers/VolunteerController.js';

const router = new Router();

router.get('/:id', VolunteerController.getVolunteer);

export default router;
