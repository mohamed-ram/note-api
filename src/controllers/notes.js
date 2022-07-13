const asyncHandler = require("../middlewares/asyncHandler");
const Note = require("../models/note");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc   create new note
// @route  POST /api/v1/notes
exports.createNote = asyncHandler(async (req, res, next) => {
  const note = await Note.create(req.body);
  if (!note) {
    return next(new ErrorResponse("Server Erro, try again..", 500));
  }
  res.status(201).json({ success: true, data: note });
});

// @desc   get all notes
// @route  GET /api/v1/notes
exports.getAllNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find();
  res.status(200).json({ success: true, count: notes.length, data: notes });
});

// @desc   get single note
// @route  GET /api/v1/notes/:id
exports.getSingleNote = asyncHandler(async (req, res, next) => {
  const _id = req.params.id;
  const note = await Note.findById(_id);

  if (!note) {
    return next(
      new ErrorResponse(`Note with the id ${_id} is not exist.`, 404)
    );
  }
  res.status(200).json({ success: true, data: note });
});

// @desc   update note
// @route  PUT /api/v1/notes/:id
exports.updateNote = asyncHandler(async (req, res, next) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const note = await Note.findById(_id);

  if (!note) {
    return next(new ErrorResponse(`Note with id ${_id} is not exist!`, 404));
  }

  updates.forEach((update) => {
    note[update] = req.body[update];
  });
  await note.save();
  res.status(201).json({ success: true, data: note });
});

// @desc   delete note
// @route  DELETE /api/v1/notes/:id
exports.deleteNote = asyncHandler(async (req, res, next) => {
  const _id = req.params.id;
  const note = await Note.findById(_id);

  if (!note) {
    return next(new ErrorResponse(`Note with id ${_id} is not exist.`, 404));
  }

  res.status(204).json({ success: true, data: note });
});
