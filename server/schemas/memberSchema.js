import mongoose from 'mongoose';
const { Schema } = mongoose;

const treeSchema = new Schema({
    name: String,
    age: Number,
    gender: String
});

export default treeSchema
