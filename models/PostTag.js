const mongoose = require('mongoose');

const postTagSchema = new mongoose.Schema({
    post_id: mongoose.Schema.ObjectId,
    tag_id: mongoose.Schema.ObjectId
}, {timestamps: true});

const PostTag = mongoose.model('PostTag', postTagSchema);

module.exports = PostTag;
