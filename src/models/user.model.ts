import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tdd: [{ type: Schema.Types.ObjectId, ref: 'Tdd' }],
});

userSchema.methods.comparePassword = async function(candidatePassword: string) {
    const user = this;
    return bcrypt.compare(candidatePassword, user.password);
};

export const UserModel = model('User', userSchema);