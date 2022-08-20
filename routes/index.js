const router = require('express').Router();
const protected = require('../middleware/protect');
const index = require('../controllers/index');

// View products
router.get('/',  index.getProducts);

// View product
router.get('/:id', protected, index.getProduct);

// Create product
router.post('/', protected, index.createProduct);

// Add product to cart
router.post('/:id/cart', protected, index.addProductToCart);

// payment
router.post('/:id/pay', protected, index.payForProduct);

module.exports = router;