import { Router } from 'express';
import { userController } from '../controllers';
import { accessTokenAuth } from '../middleware/jwtAuth.middleware';

const router = Router();

router.post('/', userController.createUser);

router.post('/login', userController.login);

router.patch('/:id', accessTokenAuth, userController.updateUser);

router.get('/:id/tdd', accessTokenAuth, userController.getAllTdd); // Add this line to handle the new route

export default router;
