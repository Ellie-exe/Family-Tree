import mongoose from 'mongoose';
const { Schema } = mongoose;

const treeSchema = new Schema({
    name: String,
    numMembers: Number,
    members: [{ type: Schema.Types.ObjectId, ref: 'members' }],
    users: { type: Map, of: String }
});

export default mongoose.model('trees', treeSchema);
