const express = require("express");
const router = express.Router();
const InterviewSchema = require("../Models/InterviewSchema");
const fs = require("fs");
const pdfdocument = require("pdfkit");


router.post("", (req,res,next) => {

  let doc = new pdfdocument();

  const newinterview = new InterviewSchema({

    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    schoolname: req.body.schoolname
  });

  newinterview.save().then(createdInterview => {

    fs.appendFileSync('interviews.pdf', '\n' + 'Firstname: ' + req.body.firstname + '\n'
    + 'Lastname:' + req.body.lastname + '\n'
    + 'Age: ' + req.body.age + '\n'
    + 'School name: ' + req.body.schoolname  + '\n','utf-8');

    const readme = fs.readFileSync('interviews.pdf', 'utf-8');
    doc.pipe(fs.createWriteStream('src/assets/pdf-files/Ohad.pdf'));
    doc.text("Interviews information:" + '\n' + readme, 100, 100);
    doc.addPage();
    doc.end();

    res.status(200).json({
    interviews: {
      id: createdInterview._id,
      firstname: createdInterview.firstname,
      lastname: createdInterview.lastname,
      age: createdInterview.age,
      schoolname: createdInterview.schoolname
    }

    });
  });

});


router.get("", (req,res,next) => {

  InterviewSchema.find().then(documents => {
    res.status(200).json({
      interviews: documents
    });
  });
});


module.exports = router;
