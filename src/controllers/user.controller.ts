import { Request, Response } from 'express';
import { userService } from '../services/';
import bcrypt from 'bcrypt';

export const userController = {
    createUser: async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 1);
            const user = await userService.createUser({ name, email, password: hashedPassword });
            return res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const user = await userService.updateUser(id, { name, email, password });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    },

    getAllTdd: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const tdd = await userService.getAllTdd(id);
            res.json(tdd);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get TDDs' });
        }
    }
};
