let products = [];

// Creando el método addProduct que recibe los siguientes parametros:
const addProduct = (title, description, price, thumbnail, code, stock) => {
    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };

    // Validando que todos los campos sean obligatorios
    if (Object.values(newProduct).includes(undefined)) {
        console.log("All fields are required");
        return;
    }

    // Validando que no se repita el campo “code”
    const productExists = products.find((product) => product.code === code);
    if (productExists) {
        console.log(`Product ${title} with code ${code} already exists`);
        return;
    }

    products.push(newProduct);
};

// Creando el método getProducts y retorna el array de productos creados hasta el momento.
const getProducts = () => {
    console.log(products);
    return products;
};

// Creando el método getProductById que recibe un id por parámetro y retorna el producto con el id correspondiente. En caso de no encontrarlo, retorna un mensaje que lo indique. 
const getProductById = (id) => {
    const product = products.find((product) => product.id === id);
    if (!product) {
        console.log(`Product with ID: "${id}" not found`);
        return;
    }

    console.log(product);
    return product;
};


// Agregando productos de testing
addProduct(
    "Producto 5",
    "el quinto producto",
    899,
    "http://www.google.com",
    "ABC1",
    10    
);
addProduct(
    "Producto 6",
    "el sexto producto",
    999,
    "http://www.google.com",
    "ABC2",
    10    
);  
addProduct(
    "Producto 7",
    "el septimo producto",
    1099,
    "http://www.google.com",
    "ABC3",
    10    
);


// Mostrando la lista de productos 
getProducts();
// Mostrando el producto con id 2
getProductById(5);
