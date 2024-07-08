const mongoose = require("mongoose");

const TestYourSelfquestionSchema = new mongoose.Schema(
  {
    name:[ {
      type: String,
      required:true
    }],

    options: [
      {
        type: String,
        required:true
      },
    ],

    predicted_result: {
      type: String,
      required:true
    },
    actualresult: {
      type: String,
    },
    isTrue: {
      type: Boolean,
    },
    answer_description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const TestYourSelfQuestion = mongoose.model("test_yourself_question", TestYourSelfquestionSchema);
module.exports = TestYourSelfQuestion;
