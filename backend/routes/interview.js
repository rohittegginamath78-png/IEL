const express = require("express");
const middleware = require("../middlewares/authMiddleware");
const Interview = require("../models/InterviewExperience");
const commentRoutes = require("./comments")
const router = express.Router({ mergeParams: true });

//create post
router.post("/", middleware, async (req, res) => {
  try {
    const interview = await Interview.create({
      ...req.body,
      postedBy: req.userId,
    });

    res.status(200).json(interview);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const interviews = await Interview.find().populate("postedBy", "name");
    res.json(interviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const interview_id = await Interview.findById(req.params.id).populate(
      "postedBy",
      "name",
    );
    if (!interview_id) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(interview_id);
  } catch (err) {
    res.status(500).json({ message: " invalid interview id " });
  }
});

router.delete("/:id", middleware, async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: "Not found" });
    }
    const userId = req.userId;
    if (interview.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete " });
    }
    await Interview.deleteOne({ _id: req.params.id });
    res.json({ message: " interview deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "delete route problem" });
  }
});
router.put("/:id" ,middleware , async(req, res)=>{
  try{
    
  const id = req.params.id;
  const interview = await Interview.findById(id);

  if(interview.postedBy.toString() != req.userId){
      return res.status(403).json({ message: "Not authorized to delete " });
  }
  const updatedinterview = await Interview.findByIdAndUpdate(
    id , req.body,
    {new:true }
  );
  res.json(updatedinterview);
  }catch(err){
    res.status(500).json({message: "Edit route error"})
  }
})
router.use("/:id/comments" , commentRoutes);
module.exports = router;
