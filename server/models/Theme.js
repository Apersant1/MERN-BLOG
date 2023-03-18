import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema(
  {
    title: { type: String, default: "", required: true },
    desc: { type: String, default: "", required: true },
    tasksId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    questIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quest" }],
    totalMarks: { type: Number, default: 0 },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Theme", ThemeSchema);
