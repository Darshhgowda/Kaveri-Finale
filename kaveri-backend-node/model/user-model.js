const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    }
});
userSchema.set('timestamps', true);

const userModel = mongoose.model('users', userSchema);
module.exports = {
    userModel
};