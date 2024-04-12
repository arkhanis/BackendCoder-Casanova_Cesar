
const fs = require("fs"); // Inicio el file system


let products = []; // Creo un array vacío para guardar los productos
let pathFile = "./data/products.json"; // Creo una variable con la ruta del archivo donde se guardan los productos

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
const getProducts = () => { 
    console.log(products);
    return products;
};

// Creo una función que recibe un id y muestra el producto con ese id si existe
const getProductById = (id) => {
    const product = products.find((product) => product.id === id);
    if (!product) {
        console.log(`No se encontró el producto con el id ${id}`);
        return;
    }

    console.log(product);
    return product;
};



addProduct("Producto 5", "el quinto producto", 899, "http://www.google.com", "ADF126");
addProduct("Producto 1", "el primer producto", 299, "http://www.google.com", "ADF123", 10);
addProduct("Producto 2", "el segundo producto", 899, "http://www.google.com", "ADF124", 10);
addProduct("Producto 3", "el tercer producto", 899, "http://www.google.com", "ADF124", 10);
addProduct("Producto 4", "el cuarto producto", 899, "http://www.google.com", "ADF125", 10);

getProducts();

getProductById(4);