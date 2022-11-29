import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    trees: [{ type: Schema.Types.ObjectId, ref: 'trees' }]
});

export default mongoose.model('users', userSchema);
