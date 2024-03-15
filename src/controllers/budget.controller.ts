import { Request, Response } from 'express';
import { budgetService } from '../services';

export const budgetController = {
    getAllBudgetsByUserId: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const budgets = await budgetService.getAllBudgetsByUserId(id);
            res.json(budgets);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    createBudget: async (req: Request, res: Response) => {
        try {
            const { creationDate, userId } = req.body;

            const budget = await budgetService.createBudget( userId, {
                creationDate,
                userId,
            });
            res.status(201).json(budget);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

