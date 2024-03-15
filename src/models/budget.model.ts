import mongoose, { Schema } from 'mongoose';


const budgetSchema: Schema = new Schema({
    creationDate: { type: Date, required: true },
    categories: [{  type: Schema.Types.ObjectId, ref: 'Category' }],
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const BudgetModel = mongoose.model('Budget', budgetSchema);
