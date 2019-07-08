const mongoose = require("mongoose");
const ImageSchema = mongoose.Schema({

  image: {type: Array, required: true}
})

module.exports = mongoose.model("ImageSchema", ImageSchema);
