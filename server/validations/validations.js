import {body} from "express-validator";


export const registerValidation = [
    body('login','Login consist of more 10 symbols').isLength({min:10}),
    body('password','Login consist of more 6 symbols').isLength({min:6}),
    body('email','Incorrect email format').isEmail(),
    body('fullname','Input your fullname').isLength({min:2}),
    body('group','Group number consist more symbols').isLength({min:3}),
    body('avatarUrl','Incorrect avatar url').optional().isURL(),
];

export const loginValidation = [
    body('login','Login consist of more 10 symbols').isLength({min:10}),
    body('password','Password must consist of more 6 symbols!').isLength({min:6}),
];

export const SubjectCreateValidation = [
    body('title','Input subject title').isLength({min:3}).isString(),
    body('desc','Input body of subject !').isLength({min:10}).isString(),
]

export const ThemeCreateValidation = [
    body('title','Input subject title').isLength({min:3}).isString(),
    body('desc','Input body of subject !').isLength({min:10}).isString(),
    body('subjectId','Have\'t category').isString(),
]
export const TaskCreateValidation = [
    body('title','Input subject title').isLength({min:3}).isString(),
    body('desc','Input body of subject !').isLength({min:10}).isString(),
    body('mark','Input mark for task').isFloat(),
    body('themeId','Have\'t category').isString(),
]