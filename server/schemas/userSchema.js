import { Schema } from 'mongoose';

const userSchema = new Schema({
    email: String,
    trees: [{
        canEdit: Boolean,
        tree: {
            type: Schema.Types.ObjectId,
            ref: 'trees'
        }
    }]
});

export default userSchema
