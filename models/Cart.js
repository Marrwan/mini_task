const mongoose = require('mongoose');

// Ecommerce Cart Schema
const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A Cart must has a user']
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
}).index({ user: 'text', products: 'text' });

module.exports = mongoose.model('Cart', CartSchema);