import express from "express";
import mongoose from "mongoose";
import Student from "../models/Student.mjs";

const router = express.Router();

function validateStudent(req, res, next) {
  const { name, section } = req.body ?? {};
  if (typeof name !== "string" || !name.trim() ||
      name.trim().length > 80 || typeof section !== "string" ||
      !section.trim() || section.trim().length > 40) {
    return res.status(400).json({
      error: "Enter a name (1-80) and section (1-40 characters).",
    });
  }
  req.studentData = { name: name.trim(), section: section.trim() };
  next();
}

router.param("id", (req, res, next, id) => {
  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(400).json({ error: "Invalid student ID." });
  }
  next();
});

router.get("/", async (req, res) => {
  const students = await Student.find().sort({ enrolledAt: -1 });
  res.json(students);
});

router.post("/", validateStudent, async (req, res) => {
  const student = await Student.create(req.studentData);
  res.status(201).json(student);
});

router.put("/:id", validateStudent, async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { $set: req.studentData },
    { new: true, runValidators: true }
  );
  if (!student) {
    return res.status(404).json({ error: "Student not found." });
  }
  res.json(student);
});

router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    return res.status(404).json({ error: "Student not found." });
  }
  res.json({ message: "Student deleted." });
});

export default router;
