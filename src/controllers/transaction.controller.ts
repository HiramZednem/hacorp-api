import { Request, Response } from 'express';
import { updateTransaction } from '../interfaces/transaction.interface';
import { transactionService } from '../services';


export const transactionController = {
    createTransaction: async (req: Request, res: Response) => {
        try {
            const { tddId, categoryId, amount, description, date } = req.body;
            const transaction = await transactionService.createTransaction({ tddId, categoryId, amount, description, date });
            res.status(201).json(transaction);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    updateTransaction: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { tddId, categoryId, amount, description, date } = req.body;

            const updatedTransactionData: { [key: string]: any } = {};

            if (tddId) {
                updatedTransactionData.tddId = tddId;
            }

            if (categoryId) {
                updatedTransactionData.categoryId = categoryId;
            }

            if (amount) {
                updatedTransactionData.amount = amount;
            }

            if (description) {
                updatedTransactionData.description = description;
            }

            if (date) {
                updatedTransactionData.date = date;
            }

            const updatedTransaction = await transactionService.updateTransaction(id, updatedTransactionData);
            res.status(200).json(updatedTransaction);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteTransaction: async (req: Request, res: Response) => {
        try {
            const deletedTransaction = await transactionService.deleteTransaction(req.params.id);
            res.status(200).json(deletedTransaction);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    getTransaction: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const transactions = await transactionService.getTransactionByUserId(id);
            res.status(200).json(transactions);
        } catch (error: any) {
            res.status(500).json({ error: "Internal Server Error Happen" });
        }
    }
};
