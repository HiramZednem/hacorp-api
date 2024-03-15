import { Schema, model } from 'mongoose';


const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    budgets: [{ type: Schema.Types.ObjectId, ref: 'Budget' }],
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    tdd: [{ type: Schema.Types.ObjectId, ref: 'Tdd' }],
});

export const UserModel = model('User', userSchema);