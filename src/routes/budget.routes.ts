import { Router } from 'express';
import { accessTokenAuth } from '../middleware/jwtAuth.middleware';
import { budgetController } from '../controllers';

const router = Router();

router.post('/', accessTokenAuth, budgetController.createBudget);
router.get('/:id', accessTokenAuth, budgetController.getAllBudgetsByUserId);


export default router;
