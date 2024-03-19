import express from 'express';
import { transactionController } from '../controllers';
import { accessTokenAuth } from '../middleware/jwtAuth.middleware';

const router = express.Router();

router.get('/:id', accessTokenAuth, transactionController.getTransaction);
router.post('/', accessTokenAuth, transactionController.createTransaction);
router.patch('/:id', accessTokenAuth, transactionController.updateTransaction);
router.delete('/:id', accessTokenAuth, transactionController.deleteTransaction);

export default router;