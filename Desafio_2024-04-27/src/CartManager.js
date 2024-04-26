import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

export class CartManager {
    constructor() {
        this.filePath = path.join(dirName, 'carts.json');
        this.carts = this.readCartsFromFile();
        this.nextCartId = Object.keys(this.carts).length + 1;
    }

    // Métodos leer el archivo de carritos
    readCartsFromFile() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data) || {};
        } catch (err) {
            return {};  // Si no hay archivo, retorna un objeto vacío
        }
    }

    // Método para escribir los carritos en el archivo
    writeCartsToFile() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.carts, null, 2), 'utf-8');
    }

    // Métodos para crear el carrito
    createCart() {
        const cartId = this.nextCartId++;
        this.carts[cartId] = { id: cartId, products: [] };
        this.writeCartsToFile();
        return cartId;
    }

    // Métodos para añadir productos al carrito
    addProductToCart(cartId, productId, quantity = 1) {
        const cart = this.carts[cartId];
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        const productIndex = cart.products.findIndex(p => p.product === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }
        this.writeCartsToFile();
    }

    // Método para obtener un producto en el carrito
    getProductsInCart(cartId) {
        const cart = this.carts[cartId];
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        return cart.products;
    }
}