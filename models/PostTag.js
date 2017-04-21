const mongoose = require('mongoose');

const postTagSchema = new mongoose.Schema({
    post_id: Number,
    tag_id: Number
}, {timestamps: true});

const PostTag = mongoose.model('PostTag', postTagSchema);

module.exports = PostTag;
