const mongoose = require("mongoose");

const ImportantLinks = new mongoose.Schema(
  {
    link: {
      type: String,
      require:true
    },
    donwloadable: {
      type: Boolean,
      enum: [false, true],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ImpLinks = mongoose.model("importantlinks", ImportantLinks);
module.exports = ImpLinks;
