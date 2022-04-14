import Router from 'express';
import authRoutes from './authRoutes';
import taskRoutes from './taskRoutes';

const router = Router();

router.use(authRoutes);
router.use(taskRoutes);

export default router;
