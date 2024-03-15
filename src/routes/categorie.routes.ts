import express from 'express';
import { categoriesController } from '../controllers';

const router = express.Router();

router.post('/', categoriesController.createCategorie);
router.get('/:id', categoriesController.getAllCategories);
router.patch('/:id', categoriesController.updateCategories);
router.delete('/:id', categoriesController.deleteTdd);

export default router;