import mongoose, { Schema } from 'mongoose';


const categorySchema: Schema = new Schema({
    description: { type: String, required: true },
    planned: { type: Number, required: true },
    type: { type: String, enum: ['spent', 'earn'], required: true },
    budgetId: { type: Schema.Types.ObjectId, ref: 'Budget', required: true },
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
});

export const CategoryModel = mongoose.model('Category', categorySchema);

