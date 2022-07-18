import PostModel from "../models/Post.js";


export const getLastTags = async (req,res) =>{
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(obj => obj.tags)
            .flat()
            .slice(0,5)
        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to get all posts :('})
    }
}
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate({path: 'author'}).exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to get all posts :('})
    }
}
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        PostModel.findOneAndUpdate({
            _id: postId
        }, {
            $inc: {viewsCount: 1}
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                return res.status(400).json({message: 'Failed to get post :('})
            }
            if (!doc) {
                return res.status(404).json({message: 'Post Not Found! :('})
            }
            res.json(doc);
        }).populate({path: 'author'})
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to get all posts :('})
    }
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id
        PostModel.findOneAndDelete({
            _id: postId
        }, (err, doc) => {
            if (err) {
                return res.status(400).json({message: 'Failed to delete post :('})
            }
            if (!doc) {
                return res.status(404).json({message: 'Post Not Found! :('})
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
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(','),
            viewsCount: req.body.viewsCount,
            author: req.UserId,
            imageUrl: req.body.imageUrl
        })
        const post = await doc.save();
        res.json(post);

    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Failed to create post :('})
    }
}
export const update = async (req, res) => {
    try {
        const postId = req.params.id
        await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(','),
            imageUrl: req.body.imageUrl,
        });


        res.json({
            "success edit": true
        });
    }catch(err){
        console.log(err);
        res.status(400).json({message: 'Failed to get all posts :('})
    }
}