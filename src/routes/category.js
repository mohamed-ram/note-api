const express = require("express");
const auth = require("../middleware/auth");
const Category = require("../models/category");
const router = new express.Router();

// create new category
router.post("/categories", auth, async (req, res) => {
  try {
    const category = new Category({
      ...req.body,
      owner: req.user._id,
    });
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get all categories
router.get("/categories", auth, async (req, res) => {
  try {
    // const categories = await Category.findOne({ owner: req.user._id });
    await req.user.populate("categories");
    res.send(req.user.categories);
  } catch (error) {
    res.status(500).send();
  }
});

// update category
router.patch("/categories/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["title"];
  const isMatched = updates.every((update) => allowed.includes(update));

  if (!isMatched) {
    return res.status(400).send({ error: "invalid data." });
  }

  try {
    const category = await Category.findOne({
      _id: req.params._id,
      owner: req.user._id,
    });
    if (!category) {
      return res.status(404).send("Not exist.");
    }
    updates.forEach((update) => {
      category[update] = req.body[update];
    });
    await category.save();
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete category
router.delete("/categories/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const category = await Category.findOneAndDelete({
      _id,
      owner: req.user._id,
    });
    if (!category) {
      return res.status(404).send("dose not exist");
    }
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
