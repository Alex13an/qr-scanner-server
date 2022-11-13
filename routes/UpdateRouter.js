import Router from 'express';
import UpdateController from '../controllers/UpdateController.js';

const router = new Router();

router.put('/volunteers', UpdateController.updateVolunteers);
router.put('/guests', UpdateController.updateGuests);
router.put('/press', UpdateController.updatePress);
router.put('/localpress', UpdateController.updateLocalPress);
router.put('/staff', UpdateController.updateStaff);
router.put('/other', UpdateController.updateOther);
router.put('/org', UpdateController.updateOrganizators);

export default router;
