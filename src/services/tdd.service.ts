import { get } from 'mongoose';
import { TddModel } from '../models/tdd.model';
import { UserModel } from '../models';

export const tddService = {
    createTdd: async (userId: string, entity: object) => {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const newTdd = await TddModel.create(entity);
        user.tdd.push(newTdd._id);
        await user.save();
        console.log(user);
        return newTdd;
    },

    getAllTdd: async (id: string) => {
        return await TddModel.find({ userId: id }).populate('transactions');;
    },

    updateTdd: async (id: string, body: object) => {
        return await TddModel.findByIdAndUpdate(id, body, { new: true }).populate('transactions');;
    },

    deleteTdd: async (id: string) => {
        return await TddModel.findByIdAndDelete(id).populate('transactions');;
    },
};