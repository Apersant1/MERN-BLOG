import TaskModel from "../models/Task.js";
import ThemeModel from "../models/Theme.js";
export const create = async (req,res) =>{
    try{

        const { title, desc, totalMarks,themeId} = req.body;
        const newTask = new TaskModel({
            title :req.body.title,
            desc :req.body.desc,
            bpCode : req.body.bpCode,
            imageTask : req.body.imageTask,
            mark: req.body.mark,
            themeId

        })


        const task = await newTask.save();

        const addTaskToTheme = await ThemeModel.findOneAndUpdate(
            { _id: themeId },
            {
              $push: { tasksId: task._id },
            }
          );

        res.json(task);
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'Failed to create task :('})
    }

}
export const edit = async (req,res) =>{
    try {
        const taskId = req.params.id
        await TaskModel.updateOne({
            _id: taskId
        }, {
            title: req.body.title,
            decs: req.body.text,
            mark: req.body.mark
        });

        res.json({
            "success edit": true
        });
    }catch(err){
        console.log(err);
        res.status(400).json({message: 'Failed to get all posts :('})
    }
}
export const remove = async (req,res) =>{
    try {
        const taskId = req.params.id
        TaskModel.findOneAndDelete({
            _id: taskId
        }, (err, doc) => {
            if (err) {
                return res.status(400).json({message: 'Failed to delete task :('})
            }
            if (!doc) {
                return res.status(404).json({message: 'Task Not Found! :('})
            }
            res.json({
                "success delete": true
            });
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to get task :('})
    }
}

export const getAll = async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await TaskModel.find({"subject":id});

        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to get all posts :('})
    }
}

export const getOne = async (req,res)=>{
    try{
        const id = req.params.id;
        const task = await TaskModel.findOne({"_id":id})
         res.json(task);
    } catch (err) {
        res.status(400).json({message: 'Task not found :('})
    }
}
