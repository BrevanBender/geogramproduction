const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    location: {type:String, required: true},
    shotwith: {type:String},
    caption: {type: String},
    image: {type: String},
    likes:{type: Number, default:0},
    comments: {type: Array},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;