import mongoose from 'mongoose';
const { Schema } = mongoose;

const memberSchema = new Schema({
    name: String,
    parents: [{ type: Schema.Types.ObjectId, ref: 'members' }],
    children: [{ type: Schema.Types.ObjectId, ref: 'members' }],
    fields: [{ type: Schema.Types.ObjectId, ref: 'fields' }]
});

export default mongoose.model('members', memberSchema);
