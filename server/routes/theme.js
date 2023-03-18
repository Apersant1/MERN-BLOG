import {Router} from "express";
import { create, remove } from "../controllers/ThemeController.js";
import { CheckSignIn, handleValidationErrors } from "../utils/index.js";
import { ThemeCreateValidation } from "../validations/validations.js";


const router = Router();
router.post('/create',CheckSignIn,ThemeCreateValidation,handleValidationErrors,create)
router.delete('/delete/:id',CheckSignIn,remove);
export default router;