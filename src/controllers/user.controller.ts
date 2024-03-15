import { Request, Response } from 'express';
import { userService } from '../services/';
import bcrypt from 'bcrypt';

export const userController = {
    createUser: async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
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
            const updatedFields: any = {};
            
            if (name) {
                updatedFields.name = name;
            }
            
            if (email) {
                updatedFields.email = email;
            }
            
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updatedFields.password = hashedPassword;
            }
            
            const user = await userService.updateUser(id, updatedFields);
            
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to login' });
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
