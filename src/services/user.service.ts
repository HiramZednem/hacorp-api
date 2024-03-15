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
    getUserByEmail: async (email: string) => {
        return await UserModel.findOne({ email });
    },
};