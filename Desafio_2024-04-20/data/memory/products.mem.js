const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
    constructor() {
        this.products = []
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
                this.products.push(product);
                return product;
            }
        } catch (error) {
            throw error;
        }
    }
    async read() {
        try {
            return this.products;
        } catch (error) {
            throw error;
        }
    }
    async readOne(id) {
        try {
            let product = this.products.find((each) => each.id === id);
            return product;
        } catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            let product = this.products.find((each) => each.id === id);
            if (product) {
                for (let prop in data) {
                    product[prop] = data[prop];
                }
            }
            return product;
        } catch (error) {
            throw error;
        }
    }
    async destroy(id) {
        try {
            let product = this.products.find((each) => each.id === id);
            if (product) {
                this.products = this.products.filter((each) => each.id !== id);
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
        await products.create({ text: "my 1st product", category: "shoes" });
        await products.create({ text: "my 2nd product", category: "shoes" });
        await products.create({ text: "my 3rd product", category: "shoes" });
        await products.create({ text: "my 4th product", category: "shoes" });
        await products.create({ text: "my 5th product", category: "shirts" });
        await products.create({ text: "my 6th product", category: "shirts" });
        await products.create({ text: "my 7th product", category: "shirts" });
        await products.create({ text: "my 8th product", category: "hats" });
        await products.create({ text: "my 9th product", category: "hats"  });
        const last = await products.create({ text: "my last product", category: "hats" });
        await products.read();
        await products.readOne(last.id);
        await products.update(last.id, { category: "pants" });
        await products.destroy(last.id);
    } catch (error) {
        console.log(error);
    }
}

//test();