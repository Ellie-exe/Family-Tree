import { Schema } from 'mongoose';

const treeSchema = new Schema({
    id: Number,
    ownerID: Number,
    userIDs: [Number],
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'members'
        }
    ]
});

export default treeSchema
