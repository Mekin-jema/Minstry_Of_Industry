import {Router} from 'express';
import {signin, login} from '../controllers/auth.controller.js';
const router = Router();
router.post('/signin', signin);
router.post('/login', login);

export default router;