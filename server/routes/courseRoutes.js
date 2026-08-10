import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const coursesPath = path.join(__dirname, "../data/courses.json");

router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(coursesPath, "utf-8");
    const courses = JSON.parse(data);

    res.status(200).json(courses);
  } catch (error) {
    console.error("Course fetch error:", error);

    res.status(500).json({
      message: "Unable to load courses",
    });
  }
});

export default router;