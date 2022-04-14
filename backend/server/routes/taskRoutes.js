import express from 'express';
import TaskController from '../controllers/TaskController';
import Validations from '../middleware/Validations';
// import HeaderToken from '../middleware/HeaderToken';

const router = express.Router();

// HeaderToken.isUser,
router.post('/tasks', Validations.validateTask, TaskController.createTask);

// I didn't close those endpoint, but if you want add this middleware ==> HeaderToken.isUser
router.get('/tasks', TaskController.viewTasks);
router.get('/projects', TaskController.viewProjects);
router.get('/employees', TaskController.viewEmployees);

export default router;
