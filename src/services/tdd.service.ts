import { TddModel, UserModel } from '../models';

export const tddService = {
    createTdd: async (userId: string, entity: object) => {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const newTdd = await TddModel.create(entity);
        user.tdd.push(newTdd._id);
        await user.save();
        return newTdd;
    },

    getAllTdd: async (id: string) => {
        return await TddModel.find({ userId: id }).populate('transactions');;
    },

    updateTdd: async (id: string, body: object) => {
        return await TddModel.findByIdAndUpdate(id, body, { new: true }).populate('transactions');;
    },

    deleteTdd: async (id: string) => {
        const tdd = await TddModel.findById(id);
        if (!tdd) {
            throw new Error('Tdd not found');
        }

        const user = await UserModel.findById(tdd.userId);
        user!.tdd.pull(tdd._id);
        await user!.save();

        return await TddModel.deleteOne({ _id: id });
    },
};