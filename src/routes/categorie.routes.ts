import express from 'express';
import { categoriesController } from '../controllers';
import { accessTokenAuth } from '../middleware/jwtAuth.middleware';

const router = express.Router();

router.post('/', accessTokenAuth, categoriesController.createCategorie);
router.get('/:id', accessTokenAuth, categoriesController.getAllCategories);
router.patch('/:id', accessTokenAuth, categoriesController.updateCategories);
router.delete('/:id', accessTokenAuth, categoriesController.deleteTdd);

export default router;