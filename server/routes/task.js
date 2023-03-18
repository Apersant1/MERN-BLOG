import {Router} from "express";
import { create } from "../controllers/TaskController.js";
import { CheckSignIn, handleValidationErrors } from "../utils/index.js";
import { TaskCreateValidation, ThemeCreateValidation } from "../validations/validations.js";


const router = Router();
router.post('/create',CheckSignIn,TaskCreateValidation,handleValidationErrors,create)

export default router;