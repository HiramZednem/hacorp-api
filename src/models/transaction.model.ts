import mongoose, { Schema } from 'mongoose';


const TransactionSchema: Schema = new Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    budgetId: { type: Schema.Types.ObjectId, ref: 'Budget', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    TddId: { type: Schema.Types.ObjectId, ref: 'Tdd', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const TransactionModel = mongoose.model('Transaction', TransactionSchema);

