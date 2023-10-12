import { Router } from "express";
import { productCtr,create,deleteP } from "../controller/products.js";

const router = Router();

router.get("/get/:name", productCtr);
router.post("/create", create);
router.delete("/:id", deleteP);

export default router;
