import { Request, Response } from 'express';
import { userService } from '../services/';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { MY_SECRET } from '../config';

export const userController = {
    createUser: async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userService.createUser({ name, email, password: hashedPassword });
            return res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create new user' });
        }
    },

    getUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            return res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get the user' });
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
            res.status(500).json({ error: 'Failed to update the user' });
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


            const token = jwt.sign({ user }, MY_SECRET as string, { expiresIn: "12h" });
            console.log(token);

            return res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json({ error: 'Failed to login' });
        }
    },

};
