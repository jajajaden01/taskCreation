import express from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middleware/Validations';

const router = express.Router();
router.post('/auth/login', Validations.userSignin, UserController.signin);

export default router;
