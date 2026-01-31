const express = require("express");
const comments = require("../models/comments");
const middleware = require("../middlewares/authMiddleware");

const router = express.Router({ mergeParams: true });
const Interview = require("../models/InterviewExperience")
router.post("/", middleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    
 
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    console.log(interview);
    const comment = await comments.create({
      interviewId: req.params.id,
      userId: req.userId,
      text,
    });

    res.json(comment);
  } catch (err) {
    res.status(500).json({
      message: "Post route to create comment",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const comments_get = await comments
      .find({
        interviewId: req.params.id,
      })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(comments_get);
  } catch (err) {
    res.status(500).json({ message: "Get route error" });
  }
});

module.exports = router;
