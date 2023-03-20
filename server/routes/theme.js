import {Router} from "express";
import { create, getAllThemeOnSubject, getOneTheme, remove } from "../controllers/ThemeController.js";
import { CheckSignIn, handleValidationErrors } from "../utils/index.js";
import { ThemeCreateValidation } from "../validations/validations.js";


const router = Router();
router.get('/:id',CheckSignIn,getOneTheme);
router.get('/:id/all',CheckSignIn,getAllThemeOnSubject);
router.post('/create',CheckSignIn,ThemeCreateValidation,handleValidationErrors,create)
router.delete('/delete/:id',CheckSignIn,remove);
export default router;