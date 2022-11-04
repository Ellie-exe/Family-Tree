import { Schema } from 'mongoose';

const memberSchema = new Schema({
    fields: [{
        name: String,
        value: Schema.Types.Mixed
    }]
});

export default memberSchema
