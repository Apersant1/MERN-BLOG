import express from "express"
import mongoose from 'mongoose'
import multer from 'multer'
import fs from 'fs'
import cors from 'cors'
//VALIDATIONS
import {loginValidation, PostCreateValidation, registerValidation} from "./validations/validations.js";
//CONTROLLERS
import {UserController, PostController} from  './controllers/index.js'
//UTILS
import {handleValidationErrors, CheckSignIn} from "./utils/index.js";
import {getLastTags} from "./controllers/PostController.js";


mongoose.connect('mongodb+srv://dbUser:Appersant1@cluster0.bxg9h.mongodb.net/blog?retryWrites=true&w=majority')
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


app.get('/tags',PostController.getLastTags);


app.get('/posts',PostController.getAll)
app.get('/posts/tags',PostController.getLastTags)
app.get('/posts/:id',PostController.getOne)
app.post('/posts',CheckSignIn,PostCreateValidation,handleValidationErrors,PostController.create);
app.patch('/posts/:id',CheckSignIn,PostCreateValidation,handleValidationErrors,PostController.update);
app.delete('/posts/:id',CheckSignIn,PostController.remove);


app.post('/upload', CheckSignIn, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('!!! Server was started')
})