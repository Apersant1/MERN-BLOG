import {Router} from "express";
import { create, getAllTasksFromTheme, getOneTask } from "../controllers/TaskController.js";
import { CheckSignIn, handleValidationErrors } from "../utils/index.js";
import { TaskCreateValidation, ThemeCreateValidation } from "../validations/validations.js";


const router = Router();
router.get('/:id',CheckSignIn,getOneTask)
router.get('/:id/all',CheckSignIn,getAllTasksFromTheme);
router.post('/create',CheckSignIn,TaskCreateValidation,handleValidationErrors,create)


export default router;