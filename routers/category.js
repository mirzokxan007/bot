import { Router } from "express";
import { get } from '../controller//category.js'

const router = Router();

router.get("/get", get);
// router.post("/create", create);
// router.delete("/:id", deleteP);

export default router;
