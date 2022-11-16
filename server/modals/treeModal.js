import mongoose from 'mongoose';
const { Schema } = mongoose;

const treeSchema = new Schema({
    displayName: String,
    numMembers: Number,
    members: [{ type: Schema.Types.ObjectId, ref: 'members' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

export default mongoose.model('trees', treeSchema);
