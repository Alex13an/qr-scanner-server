import Router from 'express';
import VolunteerController from '../controllers/VolunteerController.js';

const router = new Router();

router.put('/:id', VolunteerController.checkVolunteer);

export default router;
