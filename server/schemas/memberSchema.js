import { Schema } from 'mongoose';

const treeSchema = new Schema({
    name: String,
    age: Number
});

export default treeSchema
