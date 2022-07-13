const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "You have to write note title"],
      minLength: [5, "Too short note title"],
      maxLength: [150, "Too long note title"],
    },
    // slug: {
    //   type: String,
    //   // required: true,
    // },
    // category: {},
    content: {
      type: String,
      required: [true, "You have to write the content of the note"],
      maxLength: 1500,
    },
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "Category",
    // },
  },
  {
    timestamps: true,
  }
);

// add note slug before saving.
// noteSchema.pre("save", async function (next) {
//   const note = this;
//   if (!note.isModified("slug")) {
//     note.slug = slugify(note.title);
//   }
//   next();
// });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
