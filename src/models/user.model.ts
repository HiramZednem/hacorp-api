import mongoose, { Schema } from 'mongoose';

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tdd: [{ type: Schema.Types.ObjectId, ref: 'Tdd' }],
});

export const User = mongoose.model('User', userSchema);