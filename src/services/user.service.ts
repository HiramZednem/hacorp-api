import { TddModel, UserModel } from '../models';

export const userService = {
    createUser: async (entity: object) => {
        return await UserModel.create(entity);
    },

    getUserById: async (id: string) => { 
        return await UserModel.findById(id).populate('tdd'); 
    },

    updateUser: async (id: string, body: object) => {
        return await UserModel.findByIdAndUpdate(id, body, { new: true }).populate('tdd');
    },

    getUserByEmail: async (email: string) => {
        return await UserModel.findOne({ email }).populate('tdd');
    },
};