import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export default model("Contact", contactSchema);