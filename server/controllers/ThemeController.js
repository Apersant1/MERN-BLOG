import mongoose from "mongoose";

import ThemeModel from "../models/Theme.js";
import SubjectModel from "../models/Subject.js";

export const create = async (req, res) => {
  try {
    const { subjectId, title, desc, totalMarks, typeExam } = req.body;

    const newTheme = new ThemeModel({
      title,
      desc,
      tasksId: req.body.tasksId,
      questIds: req.body.questIds,
      totalMarks: req.body.totalMarks,
      typeExam: req.body.typeExam,
      subjectId: subjectId,
    });

    const theme = await newTheme.save();

    const addThemeToSubject = await SubjectModel.findOneAndUpdate(
      { _id: subjectId },
      {
        $push: { themes: theme._id },
      }
    );

    res.json(theme);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create Subject :(" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTheme = await ThemeModel.findByIdAndDelete(id);

    if (!deletedTheme) {
      return res.status(404).json({ message: "Theme not found :(" });
    }

    const removeThemeFromSubject = await SubjectModel.updateOne(
      { _id: deletedTheme.user },
      { $pull: { themes: deletedTheme._id } }
    );

    res.json({
      message: "Theme deleted successfully",
      deletedTheme,
      removeThemeFromSubject,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to delete Theme :(" });
  }
};
