import express from "express";
import ProductManager from "./data/fs/products.fs.js";

//para crear una aplicacion/servidor de express
const app = express();

//para inicialiazar la app de express necesito configurar:
const port = 8072;
const ready = console.log("server ready on port " + port);

//para inicializar el servidor
app.listen(port, ready);

//para configurar el servidor con determinadas funcionalidades
app.use(express.json()); //para manejar json
app.use(express.urlencoded({ extended: true })); //para leer queries y params

//para configurar solicitudes/peticiones
app.get("/", index);
app.post("/products", create);
app.get("/products", read);
app.get("/products/:nid", readOne);
app.put("/products/:nid", update);
app.delete("/products/:nid", destroy);

//para configurar las callbacks
function index(req, res) {
    try {
        const message = "Welcome to my Shop!";
        return res.json({ status: 200, response: message });
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message });
    }
}
async function create(req, res) {
    /* logica necesaria para crear un producto */
    try {
        const data = req.body;
        const one = await ProductManager.create(data);
        return res.json({ status: 201, response: one });
    } catch (error) {
        console.log(error);
        return res.json({
            status: error.status || 500,
            response: error.message || "ERROR",
        });
    }
}
async function read(req, res) {
    try {
        const { category } = req.query;
        const all = await ProductManager.read(category);
        //const all = await read()
        if (all.length > 0) {
            return res.json({ status: 200, response: all, category });
        } else {
            return res.json({ status: 404, response: "Not found" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message });
    }
}
async function readOne(req, res) {
    try {
        const { nid } = req.params;
        const one = await ProductManager.readOne(nid);
        if (one) {
            return res.json({ status: 200, response: one });
        } else {
            const error = new Error("Not found!");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: error.status || 500,
            response: error.message || "ERROR",
        });
    }
}
async function update(req, res) {
    /* logica necesaria para actualizar */
    try {
        /* capturar el parametro */
        const { nid } = req.params;
        /* capturar el objeto con las modificaciones */
        const data = req.body;
        /* actualizar el recurso */
        const one = await ProductManager.update(nid, data);
        //const one = await updateNote(nid,data)
        /* condicionar y enviar la respuesta al cliente */
        if (one) {
            return res.json({ status: 200, response: one });
        }
        const error = new Error("Not found!");
        error.status = 404;
        throw error;
    } catch (error) {
        console.log(error);
        return res.json({
            status: error.status || 500,
            response: error.message || "ERROR",
        });
    }
}
async function destroy(req, res) {
    /* logica necesaria para eliminar */
    try {
        /* capturar el id */
        const { nid } = req.params;
        /* buscar el recurso */
        const one = await ProductManager.readOne(iddd);
        /* si existe lo elimino */
        if (one) {
            await ProductManager.destroy(nid);
            return res.json({ status: 200, response: one });
        }
        const error = new Error("Not found!");
        error.status = 404;
        throw error;
        /* condicionar y enviar la respuesta al cliente */
    } catch (error) {
        console.log(error);
        return res.json({
            status: error.status || 500,
            response: error.message || "ERROR",
        });
    }
}