
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import TaskModel from "../models/Task.js";

export const register = async (req, res) => {
    try {


        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            login:req.body.login,
            passwordHash:hash,
            email:req.body.email,
            fullname: req.body.fullname,
            group:req.body.group,
            role:req.body.role,
            avatarUrl: req.body.avatarUrl,

        });
        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: '30d',
        });
        const {passwordHash,...userData} = user._doc;


        res.json({...userData,token})

    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Try signUp later :('});
    }
};

export const login = async(req,res)=>{
    try{
        const user =  await UserModel.findOne({login: req.body.login});
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!user || !isValidPass){
            return res.status(400).json('Wrong login or password!')
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: '30d',
        });
        const {passwordHash,...userData} = user._doc;


        res.json({...userData,token})

    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to login :('})
    }
};
export const profile = async (req,res)=>{
    try{
        const user = await UserModel.findById(req.UserId);
        console.log(user);
        if(!user){
            return res.status(400).json({message:'User not found!'})
        }
        const {passwordHash,...userData} = user._doc;
        res.json(userData);

    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'Don\'t have access! :('})
    }
};

export const remove = async (req,res)=>{
    try{
        const userId = req.params.id
        UserModel.findOneAndDelete({
            _id: userId
        }, (err, doc) => {
            if (err) {
                return res.status(400).json({message: 'Failed to delete current user! :('})
            }
            if (!doc) {
                return res.status(404).json({message: 'User Not Found! :('})
            }
            res.json({
                "success delete user": true
            });
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'Don\'t have access! :('})
    }
};

