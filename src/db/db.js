const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/notes");
    console.log("Connected To Database Successfully!".green.inverse.bold);
  } catch (err) {
    console.log("Error while connect to database!".red.inverse.bold);
  }
};

module.exports = connectDB;
