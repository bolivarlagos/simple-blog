const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    }, 
    text: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('BLog', blogSchema);
module.exports = Blog;
