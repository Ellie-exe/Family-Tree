import mongoose from 'mongoose';
const { Schema } = mongoose;

const fieldSchema = new Schema({
    name: String,
    value: String
});

export default mongoose.model('fields', fieldSchema);
