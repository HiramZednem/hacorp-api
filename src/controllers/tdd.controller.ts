import { Request, Response } from 'express';
import { tddService } from '../services';

export const tddController = {
    createTdd: async (req: Request, res: Response) => {
        try {
            const { name, amount, userId } = req.body;

            const tdd = await tddService.createTdd(userId, { 
                name,
                amount,
                userId,
            });

            res.status(201).json(tdd);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllTdd: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const tdds = await tddService.getAllTdd(id);
            res.json(tdds);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateTdd: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, amount, transactions, userId } = req.body;
            const updatedFields: any = {};

            if (name) {
                updatedFields.name = name;
            }

            if (amount) {
                updatedFields.amount = amount;
            }

            if (transactions) {
                updatedFields.transactions = transactions;
            }

            if (userId) {
                updatedFields.userId = userId;
            }

            const updatedTdd = await tddService.updateTdd(id, updatedFields);

            if (!updatedTdd) {
                return res.status(404).json({ error: 'Tdd not found' });
            }

            res.json(updatedTdd);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteTdd: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const deletedTdd = await tddService.deleteTdd(id);

            if (!deletedTdd) {
                return res.status(404).json({ error: 'Tdd not found' });
            }

            res.json(deletedTdd);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
