const Product = require('../models/Product');
const Cart = require('../models/Cart');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.getProducts = async(req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
}
exports.getProduct = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
}

exports.createProduct = async(req, res, next) => {
    try {
        // destructure the body of the request
        const { name, price, description, image } = req.body;
  
        // check is any is not empty
        if (!name || !price || !description ) return res.status(400).json({ status: 'error', message: 'Please fill all fields' });
         // check if price is a number
        if (isNaN(price)) return res.status(400).json({ status: 'error', message: 'Price must be a number' });

        // check if product already exists
        const productCheck = await Product.findOne({ name });
        if (productCheck) return res.status(400).json({ status: 'error', message: 'Product already exists' });
        const product = await Product.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({

            status: 'error',
            message: 'Something went wrong'
        });
    }
}

// Add product to cart
exports.addProductToCart = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({   status: 'error', message: 'Unauthorized' });  // 401 Unauthorized
    //  Check is token is valid
        const decoded = await jwt.verify(token , process.env.JWT_SECRET);
    // Check if user still exists
        const user = await User.findById(decoded.id);
       
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });
        const cart = await Cart.findOne({ user: user.id });
        if (!cart) {
            const newCart = new Cart({
                user: user,
                products: [product],
                quantity: 1
               
            });
            const cart = await newCart.save();
            res.status(201).json({
                status: 'success',
                data: {
                    cart
                }
            });
        } else {
            const productInCart = cart.products.find(product => product.product === req.params.id);
            if (productInCart) {
                productInCart.quantity += 1;
                await cart.save();
            } else {
                cart.products.push({
                    product: req.params.id,
                    quantity: 1
                });
                await cart.save();
            }
            res.status(201).json({
                status: 'success',
                data: {
                    cart
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
}

// Pay for product
exports.payForProduct = async(req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({   status: 'error', message: 'Unauthorized' });  // 401 Unauthorized
    //  Check is token is valid
        const decoded = await jwt.verify(token , process.env.JWT_SECRET);
    // Check if user still exists
        const user = await User.findById(decoded.id);
       
        const cart = await Cart.findOne({ user: user.id });
        if (!cart) return res.status(404).json({ status: 'error', message: 'Cart not found' });
        const products = cart.products;
        products.forEach(async(product) => {
            const productInCart = await Product.findById(product.product);
            await productInCart.save();
        } );
        await cart.remove();
        res.status(200).json({
            status: 'success',
            message: 'Payment successful'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
}

