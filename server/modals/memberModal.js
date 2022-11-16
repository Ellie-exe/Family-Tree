import mongoose from 'mongoose';
const { Schema } = mongoose;

const memberSchema = new Schema({
    name: String,
    visible: Boolean,
    partner: { type: Schema.Types.ObjectId, ref: 'members' },
    pastPartners: [{ type: Schema.Types.ObjectId, ref: 'members' }],
    parents: [{ type: Schema.Types.ObjectId, ref: 'members' }],
    children: [{ type: Schema.Types.ObjectId, ref: 'members' }],
    fields: { type: Map, of: String }
});

export default mongoose.model('members', memberSchema);
