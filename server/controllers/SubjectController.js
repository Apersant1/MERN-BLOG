import TaskModel from "../models/Task.js"
import ThemeModel from "../models/Theme.js"
import SubjectModel from "../models/Subject.js";
import UserModel from "../models/User.js";



export const edit = async (req, res) => {
  try {
    const subjectId = req.params.id;
    await SubjectModel.updateOne(
      {
        _id: subjectId,
      },
      {
        title: req.body.title,
        desc: req.body.desc,
      }
    );

    res.json({
      "success edit": true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to get all posts :(" });
  }
};

export const create = async (req, res) => {
  try {
    const { userId, title, desc } = req.body;

    const newSubject = new SubjectModel({
      user: userId,
      title,
      desc,
      tasksId: req.body.tasksId,
      totalMarks: req.body.totalMarks,
      typeExam: req.body.typeExam,
    });

    const subject = await newSubject.save();

    const addSubjectToUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { subjects: subject._id },
      }
    );

    res.json(subject);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create Subject :(" });
  }
};

export const remove = async (req, res) => {
  try {
  const subjectId = req.params.id;
  
 
  
  // Удаление всех задач связанных с темой
  const themes = await ThemeModel.find({ subjectId });
  const themeIds = themes.map((theme) => theme._id);
  await TaskModel.deleteMany({ themeId: { $in: themeIds } });

   // Удаление всех тем связанных с дисциплиной
   await ThemeModel.deleteMany({ subjectId });
  
  // Удаление самой дисциплины
  await SubjectModel.findByIdAndDelete(subjectId);
  
  res.status(200).json({ message: "Subject and all related themes and tasks have been deleted" });
  } catch (err) {
  console.error(err);
  res.status(500).json({ message: "Failed to delete subject and related data :(" });
  }
  };

export const getAll = async (req, res) => {
  try {
    const allSubjects = await SubjectModel.find({
        user:req.UserId
    })       
    res.json(allSubjects);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Failed to find all subjects :(" });
  }
};

export const getOne = async (req, res) => {
    try {
      const {id} = req.params;
        const stateSubject =  await SubjectModel.findOne({
          '_id':id
        });
        res.json(stateSubject);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to get subject :('})
    }
}
