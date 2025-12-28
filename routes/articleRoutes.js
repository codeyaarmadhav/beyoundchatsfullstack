const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// CREATE Article
router.post("/", async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL Articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// READ Single Article
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// UPDATE Article
router.put("/:id", async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedArticle)
      return res.status(404).json({ message: "Article not found" });

    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE Article
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Article not found" });

    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

module.exports = router;
