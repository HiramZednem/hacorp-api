import { Router } from 'express';
import { userController } from '../controllers';

const router = Router();

router.post('/', userController.createUser);

router.post('/login', userController.login);

router.patch('/:id', userController.updateUser);

router.get('/:id/tdd', userController.getAllTdd); // Add this line to handle the new route

export default router;
