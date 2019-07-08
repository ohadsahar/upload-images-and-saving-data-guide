const mongoose = require("mongoose");


const interviewSchema = mongoose.Schema({

  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  age: {type: String, required: true},
  schoolname: {type: String, required: true}

})

module.exports = mongoose.model("InterviewSchema", interviewSchema);
