import express from 'express';
import { CartManager } from './CartManager.js';

const router = express.Router();
const cartManager = new CartManager();

// Crea un nuevo carrito
router.post('/', (req, res) => {
    try {
        const cartId = cartManager.createCart();
        res.status(201).json({ cartId: cartId });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Obtiene los productos de un carrito
router.get('/:cid', (req, res) => {
    try {
        const products = cartManager.getProductsInCart(parseInt(req.params.cid));
        res.status(200).json(products);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

// Añade un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
    try {
        cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
        res.status(201).send("Producto añadido al carrito");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;