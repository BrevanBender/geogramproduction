const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true, required: true, minlength: 2},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    likes: {type: Array, default: []}
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;