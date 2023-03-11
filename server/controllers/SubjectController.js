import SubjectModel from "../models/Subject.js";


// export const getLastTags = async (req,res) =>{
//     try {
//         const posts = await PostModel.find().limit(5).exec();
//
//         const tags = posts.map(obj => obj.tags)
//             .flat()
//             .slice(0,5)
//         res.json(tags);
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({message: 'Failed to get all posts :('})
//     }
// }
export const getAll = async (req, res) => {
    try {
        const subjects = await SubjectModel.find().populate({path: 'author'}).exec();
        res.json(subjects);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to get all posts :('})
    }
}
export const getOne = async (req, res) => {
    try {
        const subjectId = req.params.id
        SubjectModel.findOneAndUpdate({
            _id: subjectId
        },  { returnDocument: 'after',},
            (err, doc) => {
            if (err) {
                return res.status(400).json({message: 'Failed to get subject :('})
            }
            if (!doc) {
                return res.status(404).json({message: 'Subject Not Found! :('})
            }
            res.json(doc);
        }).populate({path: 'author'})
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to get all posts :('})
    }
}


export const create = async (req, res) => {
    try {
        const doc = new SubjectModel({
            title: req.body.title,
            desc: req.body.desc,
            tasksId: req.body.tasksId,
            author: req.UserId,
            totalMarks: req.body.totalMarks,
            typeExam: req.body.typeExam,

        })
        const subject = await doc.save();
        res.json(subject);

    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to create Subject :('});
    }
}

export const remove = async (req, res) => {
    try {
        const subjectId = req.params.id
        SubjectModel.findOneAndDelete({
            _id: subjectId
        }, (err, doc) => {
            if (err) {
                return res.status(400).json({message: 'Failed to delete post :('})
            }
            if (!doc) {
                return res.status(404).json({message: ' Not Found! :('})
            }
            res.json({
                "success delete": true
            });
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to get all posts :('})
    }
}


export const edit = async (req, res) =>{
    try {
        const subjectId = req.params.id
        await SubjectModel.updateOne({
            _id: subjectId
        }, {
            title: req.body.title,
            desc: req.body.desc,
        });

        res.json({
            "success edit": true
        });
    }catch(err){
        console.log(err);
        res.status(400).json({message: 'Failed to get all posts :('})
    }
}
