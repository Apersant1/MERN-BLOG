import User from "../models/User.js";

export const getAll = async (req, res) => {
    try {
        const users = await User.find().exec();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to get all users :('})
    }
}


export const getOne = async (req, res) => {
    try {
        const {id} = req.params;
        const user =  await User.findById(id);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to get user :('})
    }
}
