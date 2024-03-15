import { CategoryModel, BudgetModel } from '../models/';

export const categoryService = {
    createCategory: async (budgetId: string, entity: object) => {
        const budget = await BudgetModel.findById(budgetId);
        if (!budget) {
            throw new Error('Budget not found');
        }

        const newCategory = await CategoryModel.create(entity);
        budget.categories.push(newCategory._id);
        await budget.save();
        return newCategory;
    },

    getAllCategories: async (id: string) => {
        return await CategoryModel.find({ budgetId: id }).populate('transactions');
    },

    updateCategory: async (categoryId: string, categoryData: any) => {
        return await CategoryModel.findByIdAndUpdate(categoryId, categoryData, { new: true }).populate('transactions');
    },

    deleteCategory: async (id: string) => {
        const category = await CategoryModel.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }

        const budget = await BudgetModel.findById(category.budgetId);
        budget!.categories.pull(category._id);
        await budget!.save();

        return await CategoryModel.deleteOne({ _id: id });
    }
};