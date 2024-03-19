import { UserModel } from '../models';


export const userService = {
    createUser: async (entity: object) => {
        return await UserModel.create(entity);
    },

    getUserById: async (id: string) => { 
        return await UserModel.findById(id)
                                .populate('tdd')
                                .populate({
                                    path: 'budgets',
                                    populate: {
                                        path: 'categories'
                                    }
                                })
                                .populate('transactions');
    },

    updateUser: async (id: string, body: object) => {
        return await UserModel.findByIdAndUpdate(id, body, { new: true })
                                .populate('tdd')
                                .populate({
                                    path: 'budgets',
                                    populate: {
                                        path: 'categories'
                                    }
                                })
                                .populate('transactions');
    },

    getUserByEmail: async (email: string) => {
        return await UserModel.findOne({ email })
                                .populate('tdd')
                                .populate({
                                    path: 'budgets',
                                    populate: {
                                        path: 'categories'
                                    }
                                })
                                .populate('transactions');
    },
};