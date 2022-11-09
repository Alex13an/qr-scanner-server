import GoogleUserController from '../controllers/GoogleUserController.js';
import Router from 'express';

const router = new Router();

router.get('/', GoogleUserController.getUser);

export default router;
