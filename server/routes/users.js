import express from "express";

import {getAll, getOne} from "../controllers/UserConroller.js"
import { CheckSignIn, handleValidationErrors } from "../utils/index.js";


const router = express.Router();
router.get('/all',CheckSignIn,handleValidationErrors,getAll);
router.get('/:id',CheckSignIn,handleValidationErrors,getOne);

export default router;