const express = require("express");
const {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");

const router = express.Router();

router.route("/").get(getAllNotes).post(createNote);

router.route("/:id").get(getSingleNote).put(updateNote).delete(deleteNote);

module.exports = router;
