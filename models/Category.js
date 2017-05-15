const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {type: String},
    icon: {type: String},
    parent_id: mongoose.Schema.ObjectId,
    type: Number,
    status: Boolean,
}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
