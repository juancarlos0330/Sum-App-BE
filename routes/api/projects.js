const express = require("express");
const router = express.Router();

// Load Data model
const Project = require("../../models/Project");
const History = require("../../models/History");

// Get all projects data
router.post("/all", (req, res) => {
  Project.find({ code: req.body.code })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.get("/adminall", (req, res) => {
  Project.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.post("/detail", (req, res) => {
  Project.findById({ _id: req.body.id })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.post("/roomdetail", (req, res) => {
  Project.findById({ _id: req.body.pid })
    .then((project) => {
      const roomdata = {
        id: project._id,
        filename: project.filename,
        user: project.user,
        datas: project.datas.filter((item) => {
          return item._id == req.body.dataid;
        }),
      };
      res.json(roomdata);
    })
    .catch((err) => console.log(err));
});

// Save project csv file name
router.post("/savefilename", (req, res) => {
  const newProject = new Project({
    filename: req.body.filename,
    user: req.body.uid,
  });

  newProject
    .save()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => console.log(err));
});

// Save datas by project id
router.post("/savedata", (req, res) => {
  Project.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { datas: req.body.datas } },
    { new: true }
  )
    .then((projects) => res.json({ msg: "success" }))
    .catch((err) => console.log(err));
});

// Get history data
router.post("/gethistory", (req, res) => {
  History.find({ user: req.body.uid })
    .sort({ created_date: "desc" })
    .limit(20)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

// Save code history by user
router.post("/savehistory", (req, res) => {
  const newHistory = new History({
    user: req.body.uid,
    code: req.body.code,
  });

  newHistory
    .save()
    .then((histories) => {
      res.json({ msg: "success" });
    })
    .catch((err) => console.log(err));
});

// Save project with code
router.post("/savecodedata", (req, res) => {
  Project.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { code: req.body.code } },
    { new: true }
  )
    .then((projects) => res.json({ msg: "success" }))
    .catch((err) => console.log(err));
});

module.exports = router;
