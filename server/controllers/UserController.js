
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {


        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullname: req.body.fullname,
            avatarUrl: req.body.avatarUrl,
            passwordHash:hash,
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
        const user =  await UserModel.findOne({email: req.body.email})
        if(!user){
            return res.status(400).json('User was not found!')
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass){
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
        res.json(userData)

    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'Don\'t have access! :('})
    }
};