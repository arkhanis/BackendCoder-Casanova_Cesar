// Inicio el file system
const fs = require("fs"); 

// Creo un array vacío para guardar los productos
let products = []; 
// Creo una variable con la ruta del archivo donde se guardan los productos
let pathFile = "./data/products.json"; 

// Creo una función asincrónica que recibe los datos del producto y los guarda en el archivo
const addProduct = async (title, description, price, thumbnail, code, stock) => { 
    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };

    // Valido que todos los campos sean obligatorios
    if (Object.values(newProduct).includes(undefined)) { 
        console.log("Todos los campos son obligatorios");
        return;
    }

    // Valido que no se repita el campo "code"
    const productExists = products.find((product) => product.code === code); 
    if (productExists) {
        console.log(`El producto ${title} con el código ${code} ya existe`);
        return;
    }

    // Agrego el producto al array de productos
    products.push(newProduct); 

    // Guardo el array de productos en el archivo
    await fs.promises.writeFile(pathFile, JSON.stringify(products)); 
};

// Creo una función que lee el archivo y muestra los productos
const getProducts = async () => { 
    const data = await fs.promises.readFile(pathFile, 'utf-8');
    products = JSON.parse(data);
    console.log(products);
    return products;


// Creo una función que recibe un id y muestra el producto con ese id si existe
const getProductById = async (id) => {
    const data = await fs.promises.readFile(pathFile, 'utf-8');
    products = JSON.parse(data);
    const product = products.find((product) => product.id === id);
    if (!product) {
        console.log(`No se encontró el producto con el id ${id}`);
        return;
    }

    console.log("El producto con ID ",id," es: ",product);
};


// Creo una funcion para actualizar un producto
const updateProduct = async (id, dataProduct) => {

    await getProductById();
    const product = products.find((product) => product.id === id);
    if (!product) {
        console.log(`No se encontró el producto con el id ${id}`);
        return;
    }

    const index = products.findIndex(product => product.id === id);
    products[index] = { 
        ...products[index], // hago una copia de las propiedades del producto 
        ...dataProduct // actualizo las propiedades que me pasan por parámetro
    };

    // Guardo el array de productos en el archivo sobreescrbiendo el archivo
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}




// Agrego productos ficticios al JSON
// addProduct(
//     "Producto 5",
//     "el quinto producto",
//     899,
//     "http://www.google.com",
//     "ABC1",
//     10    
// );
// addProduct(
//     "Producto 6",
//     "el sexto producto",
//     999,
//     "http://www.mercadolibre.com",
//     "ABC2",
//     10    
// );  
// addProduct(
//     "Producto 7",
//     "el septimo producto",
//     1099,
//     "http://www.amazon.com",
//     "ABC3",
//     10    
// );
// addProduct(
//     "Producto 9",
//     "el noveno producto",
//     999,
//     "http://www.mercadolibre.com",
//     "ABC9",
//     20    
// );


// Leo los productos
// getProducts();

// Busco un producto por id
getProductById(3);

// Actualizo un producto
updateProduct(2, { title: "Producto 3 actualizado", price: 1000 });