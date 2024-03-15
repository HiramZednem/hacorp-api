import { Router } from 'express';
import { tddController } from '../controllers/tdd.controller';
import { accessTokenAuth } from '../middleware/jwtAuth.middleware';

const router = Router();

router.post('/', accessTokenAuth, tddController.createTdd);
router.get('/:id', accessTokenAuth, tddController.getAllTdd);
router.patch('/:id', accessTokenAuth, tddController.updateTdd);
router.delete('/:id', accessTokenAuth, tddController.deleteTdd);

export default router;
