import {Router} from "express";
import { CheckSignIn, handleValidationErrors } from "../utils/index.js";
import {create,edit,remove,getAll, getOne} from "../controllers/SubjectController.js"
import { SubjectCreateValidation } from "../validations/validations.js";

const router = Router();

router.get('/all',CheckSignIn,getAll);
router.get('/:id',CheckSignIn,getOne);
router.post('/create',CheckSignIn,SubjectCreateValidation,create);
router.delete('/delete/:id',CheckSignIn,remove);
router.patch('/edit/:id',CheckSignIn,SubjectCreateValidation,edit);
export default router;