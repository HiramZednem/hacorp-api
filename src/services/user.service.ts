import { UserModel } from '../models';


export const userService = {
    createUser: async (entity: object) => {
        return await UserModel.create(entity);
    },

    getUserById: async (id: string) => { 
        return await UserModel.findById(id)
                                .populate('tdd')
                                .populate('budgets');
    },

    updateUser: async (id: string, body: object) => {
        return await UserModel.findByIdAndUpdate(id, body, { new: true })
                                .populate('tdd')
                                .populate('budgets');
    },

    getUserByEmail: async (email: string) => {
        return await UserModel.findOne({ email })
                                .populate('tdd')
                                .populate('budgets');
    },
};