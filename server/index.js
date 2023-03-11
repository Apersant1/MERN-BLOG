import express from "express"
import mongoose from 'mongoose'
import multer from 'multer'
import fs from 'fs'
import cors from 'cors'
//VALIDATIONS
import {
    loginValidation,
    SubjectCreateValidation,
    registerValidation,
    TaskCreateValidation,
    TaskEditValidation
} from "./validations/validations.js";
//CONTROLLERS
import {UserController, SubjectController,TaskController} from  './controllers/index.js'
//UTILS
import {handleValidationErrors, CheckSignIn} from "./utils/index.js";
import checkSignIn from "./utils/CheckSignIn.js";


mongoose.connect('mongodb://192.168.43.140:27017')
    .then(() => {
        console.log("Seccess connect to DB")
    })
    .catch(err => {
        console.log("eERR", err)
    });


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

const app = express()
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));

app.post('/signin',loginValidation,handleValidationErrors,UserController.login)
app.post('/signup', registerValidation,handleValidationErrors, UserController.register);
app.get('/profile',CheckSignIn, UserController.profile);
app.delete('/users/delete/:id',CheckSignIn,UserController.remove)


app.get('/subjects/',checkSignIn,SubjectController.getAll);
app.get('/subject/:id',checkSignIn,SubjectController.getOne);
app.post('/subject/create',CheckSignIn,SubjectCreateValidation,handleValidationErrors,SubjectController.create);
app.delete('/subject/:id',CheckSignIn,SubjectController.remove);
app.patch('/subject/:id',CheckSignIn,SubjectCreateValidation,handleValidationErrors,SubjectController.edit);


 // Tasks routes
app.get('/subject/:id/tasks/',checkSignIn,TaskController.getAll);
app.get('/subject/task/:id',checkSignIn,TaskController.getOne);
app.post('/subject/tasks/create',CheckSignIn,TaskCreateValidation,handleValidationErrors,TaskController.create)
app.delete('/subject/task/:id',CheckSignIn,TaskController.remove);
app.patch('/subject/task/:id',CheckSignIn,TaskEditValidation,handleValidationErrors,TaskController.edit);
// app.post('/upload', CheckSignIn, upload.single('image'), (req, res) => {
//     res.json({
//         url: `/uploads/${req.file.originalname}`,
//     });
// });

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('!!! Server was started')
})