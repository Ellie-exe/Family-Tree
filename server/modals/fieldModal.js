import mongoose from 'mongoose';
const { Schema } = mongoose;

const fieldSchema = new Schema({
    name: String,
    value: Schema.Types.Mixed
});

export default mongoose.model('fields', fieldSchema);
