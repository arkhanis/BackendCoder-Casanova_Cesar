import express from 'express';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';

const app = express();
const PORT = 8080;

// Middleware para parsear el body de las requests
app.use(express.json()); 
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});