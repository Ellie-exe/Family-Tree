import { Schema } from 'mongoose';

const treeSchema = new Schema({
    numMembers: Number,
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'members'
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});

export default treeSchema
