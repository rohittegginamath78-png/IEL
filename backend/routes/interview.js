const express = require("express");
const middleware = require("../middlewares/authMiddleware");
const Interview = require("../models/InterviewExperience");
const router = express.Router();

//create post
router.post("/", middleware, async (req, res) => {
  try {
    const interview = await Interview.create({
      ...req.body,
      postedBy: req.userId,
    });

    res.status(201).json(interview);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/" , async (req , res)=>{
    const interviews = await Interview.find().populate("postedBy" ,"name");
    res.json(interviews)
})
module.exports = router;