import {body} from "express-validator";


export const registerValidation = [
    body('email','incorrect email format').isEmail(),
    body('password','Password must consist of more 6 symbols!').isLength({min:6}),
    body('fullname','Input your fullname').isLength({min:2}),
    body('avatarUrl','Incorrect avatar url').optional().isURL(),


];

export const loginValidation = [
    body('email','incorrect email format').isEmail(),
    body('password','Password must consist of more 6 symbols!').isLength({min:6}),
];

export const PostCreateValidation = [
    body('title','Input post title').isLength({min:3}).isString(),
    body('text','Input body of post !').isLength({min:10}).isString(),
    body('tags','incorrect tag format').optional().isString(),
    body('ImageUrl','incorrect file format').optional().isString(),
]
export const PostEditValidation = [
    body('title','Input post title').isLength({min:3}).isString(),
    body('text','Input body of post !').isLength({min:10}).isString(),
    body('tags','incorrect tag format').optional().isString(),
    body('ImageUrl','incorrect file format').optional().isString(),
]
