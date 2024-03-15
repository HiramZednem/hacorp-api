import { BudgetModel, UserModel } from '../models';


export const budgetService = {
    getAllBudgetsByUserId: async ( id: string ) => {
       return await BudgetModel.find({ userId: id})
                                .populate('transactions')
                                .populate('categories');
    },

    createBudget: async (userId: string, entity: object) => {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const newBudget = await BudgetModel.create(entity);
        user.budgets.push(newBudget._id);
        await user.save();
        return newBudget;
    }
};
