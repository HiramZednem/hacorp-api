import { UserModel } from '../models';

export const userService = {
    createUser: async (entity: object) => {
        return await UserModel.create(entity);
    },

    updateUser: async (id: string, body: object) => {
        return await UserModel.findByIdAndUpdate(id, body, { new: true });
    },

    getAllTdd: async (id: string) => {
        const user = await UserModel.findById(id).populate('tdd');
        if (!user) {
            throw new Error('User not found');
        }
        return user.tdd;
    },
    login: async (email: string, password: string) => {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }
        return user;
    }
};