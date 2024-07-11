import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Create a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Enter all required fields: title, author, Publish year",
      });
    }

    const { title, author, publishYear } = req.body;
    const newBook = {
      title,
      author,
      publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Get all the books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Get a specific book by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Update a book
router.put("/:id", async (req, res) => {
  const { title, author, publishYear } = req.body;
  const { id } = req.params;

  const updatedBook = {
    title,
    author,
    publishYear,
  };

  try {
    if (!title || !author || !publishYear) {
      res
        .status(400)
        .json({
          message: "Enter all required fields: title, author, Publish year",
        });
    }

    const book = await Book.findByIdAndUpdate(id, updatedBook, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Delete book by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }
    res.status(200).json({ message: "Book deleted!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
