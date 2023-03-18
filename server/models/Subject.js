import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    themes: [{type:mongoose.Schema.Types.ObjectId,ref:'Theme'}],
    totalMarks: { type: Number,},
    typeExam: { type: String,},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Subject", SubjectSchema);


