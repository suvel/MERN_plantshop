const products = require("../data/products.json");
const Product = require("../models/productModel");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

dotenv.config({ path: "backend/config/config.env" });

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products deleted!");
    await Product.insertMany(products);
    console.log("All products added!");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

const start = async () => {
  try {
    await connectDatabase();
    await seedProducts();
  } catch (exception) {
    console.log("ERROR @ start");
    console.log(exception);
  }
};

start();
