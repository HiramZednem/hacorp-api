import { Request, Response } from 'express';
import { categoryService } from '../services';

export const categoriesController = {
    createCategorie: async (req: Request, res: Response) => {
        try {
            const { description, planned, type, budgetId } = req.body;

            const categorie = await categoryService.createCategory(budgetId, { 
                description,
                planned,
                type,
                budgetId,
            });

            res.status(201).json(categorie);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error Happens' });
        }
    },

    getAllCategories: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const categories = await categoryService.getAllCategories(id);
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateCategories: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { description, planned, type, budgetId } = req.body;

            const updatedCategory = await categoryService.updateCategory(id, {
                description,
                planned,
                type,
                budgetId,
            });

            if (!updatedCategory) {
                return res.status(404).json({ error: 'Category not found in App' });
            }

            res.json(updatedCategory);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error Happen' });
        }
    },

    deleteTdd: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const deletedCategorie = await categoryService.deleteCategory(id);

            if (!deletedCategorie) {
                return res.status(404).json({ error: 'TDD not found' });
            }

            res.json(deletedCategorie);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
