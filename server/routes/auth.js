import express from "express";

import {register,login,profile} from "../controllers/AuthController.js";
import { CheckSignIn, handleValidationErrors } from "../utils/index.js";
import { loginValidation, registerValidation } from "../validations/validations.js";

const router = express.Router();

router.get('/profile',CheckSignIn,profile);
router.post('/signin',loginValidation,handleValidationErrors,login);
router.post('/signup',registerValidation,handleValidationErrors,register);

export default router;