import mongoose from 'mongoose';
const { Schema } = mongoose;

const treeSchema = new Schema({
    id: Number,
    ownerID: Number,
    userIDs: [Number],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Members'
        }
    ]
});

export default treeSchema
