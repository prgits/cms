const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String},
    image: {type: String},
    description: {type: String},
    content: {type: String},
    category_id: {type: Number},
    seo_meta: {type: String},
    seo_url: {type: String},
    created_by: {type: Number},
    status: {type: Boolean},
    published_time: {type: Date},
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

