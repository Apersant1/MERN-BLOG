import express from "express"
import mongoose from 'mongoose'
import multer from 'multer'
import fs from 'fs'
import cors from 'cors'
// ROUTES

import {authRoutes,subjectRoutes,TaskRoutes,ThemeRoutes,userRoutes} from "./routes/index.js"



mongoose.connect('mongodb://admin:i58pR2aC67Z0fx27@84.23.54.55/Explain')
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


app.use('/auth',authRoutes); // auth's logic
app.use('/users',userRoutes); // user's logic
app.use('/subject',subjectRoutes); // subject's logic
app.use('/theme',ThemeRoutes); // theme's logic
app.use('/task',TaskRoutes);



// app.get('/subjects/',checkSignIn,SubjectController.getAll);

// app.get('/subject/:id',checkSignIn,SubjectController.getOne);

// app.post('/subject/create',CheckSignIn,SubjectCreateValidation,handleValidationErrors,SubjectController.CreateSubject);


// app.delete('/subject/:id',CheckSignIn,SubjectController.remove);
// app.patch('/subject/:id',CheckSignIn,SubjectCreateValidation,handleValidationErrors,SubjectController.edit);

/*
 // Tasks routes
app.get('/subject/:id/tasks/',checkSignIn,TaskController.getAll);
app.get('/subject/task/:id',checkSignIn,TaskController.getOne);

app.post('/subject/:id/task/create',CheckSignIn,TaskCreateValidation,handleValidationErrors,TaskController.create);

app.delete('/subject/task/:id',CheckSignIn,TaskController.remove);
app.patch('/subject/task/:id',CheckSignIn,TaskEditValidation,handleValidationErrors,TaskController.edit);*/
// app.post('/upload', CheckSignIn, upload.single('image'), (req, res) => {
//     res.json({
//         url: `/uploads/${req.file.originalname}`,
//     });
// });

app.listen(4444,(err) => {
    if (err) {
        return console.log(err)
    }
    console.log('!!! Server was started')
})