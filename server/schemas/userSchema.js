import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    id: Number,
    email: String,
    trees: [
        {
            id: Number,
            editable: Boolean
        }
    ]
});

export default userSchema
