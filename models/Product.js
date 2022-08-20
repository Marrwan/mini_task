const mongoose = require('mongoose');

// Ecommerce Product Schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Product must has a name']
    },
    description: {
        type: String,
        required: [true, 'A Product must has a description']
    },
    price: {
        type: Number,
        required: [true, 'A Product must has a price']
    },
    image: {
        type: String,
    },
    category: {
        type: String
    }
}).index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', ProductSchema);