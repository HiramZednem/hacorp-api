import mongoose, { Schema } from 'mongoose';


const tddSchema: Schema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const TddModel = mongoose.model('Tdd', tddSchema);


