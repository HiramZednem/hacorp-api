import { Router } from 'express';
import { userController } from '../controllers';
import { accessTokenAuth } from '../middleware/jwtAuth.middleware';

const router = Router();

router.post('/', userController.createUser);
router.get('/:id', accessTokenAuth, userController.getUser);
router.post('/login', userController.login);
router.patch('/:id', accessTokenAuth, userController.updateUser);


export default router;
