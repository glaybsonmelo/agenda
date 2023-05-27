import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: String,
    age: Number
});

export default model('User', UserSchema);
