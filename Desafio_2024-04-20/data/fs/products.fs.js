import fs from "fs";
import crypto from "crypto";

class ProductManager {
    constructor() {
        this.path = "./data/fs/files/products.json";
        this.init();
    }
    init() {
        try {
            const exists = fs.existsSync(this.path);
            if (!exists) {
                const stringData = JSON.stringify([], null, 2);
                fs.writeFileSync(this.path, stringData);
                console.log("file created!");
            } else {
                console.log("fs connected!");
            }
        } catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            if (!data.text) {
                throw new Error("Enter text!");
            } else {
                const product = {
                    id: crypto.randomBytes(12).toString("hex"),
                    text: data.text,
                    category: data.category || "to do",
                    date: new Date(),
                };
                let all = await fs.promises.readFile(this.path, "utf-8");
                all = JSON.parse(all);
                all.push(product);
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                return product;
            }
        } catch (error) {
            throw error;
        }
    }
    async read(category) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            category && (all = all.filter((each) => each.category === category));
            return all;
        } catch (error) {
            throw error;
        }
    }
    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let product = all.find((each) => each.id === id);
            return product;
        } catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            let all = await this.read();
            let one = all.find((each) => each.id === id);
            if (one) {
                for (let prop in data) {
                    one[prop] = data[prop];
                }
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
            }
            return one;
        } catch (error) {
            throw error;
        }
    }
    async destroy(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let product = all.find((each) => each.id === id);
            if (product) {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered);
            }
            return product;
        } catch (error) {
            throw error;
        }
    }
}

async function test() {
    try {
        const products = new ProductManager();
        await products.create({ text: "my first product", category: "done" });
        await products.create({ text: "my 2nd product" });
        await products.create({ text: "my 3rd product" });
        await products.create({ text: "my 4th product" });
        await products.create({ text: "my 5th product", category: "done" });
        await products.create({ text: "my 6th product", category: "done" });
        await products.create({ text: "my 7th product", category: "done" });
        await products.create({ text: "my 8th product" });
        await products.create({ text: "my 9th product" });
        const last = await products.create({ text: "my last product" });
        await products.read();
        await products.readOne(last.id);
        await products.update(last.id, { category: "done" });
        await products.destroy(last.id);
    } catch (error) {
        console.log(error);
    }
}

const ProductManager = new ProductManager();
export default ProductManager;