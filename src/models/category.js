const mongoose = require("mongoose");
const Note = require("./note");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Category should have a title"],
    minLength: 3,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
  },
});

// categorySchema.virtual("notes", {
//   ref: "Note",
//   localField: "_id",
//   foreignField: "category",
// });

// to hide owner field
// categorySchema.methods.toJSON = function () {
//   const category = this;
//   const categoryObject = category.toObject();

//   delete categoryObject.owner;

//   return categoryObject;
// };

// categorySchema.pre("remove", async function (next) {
//   const category = this;
//   console.log("pre save ");
//   await Note.deleteMany({ category: category._id });
//   next();
// });

const Category = new mongoose.model("Category", categorySchema);

module.exports = Category;
