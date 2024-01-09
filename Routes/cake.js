import  express  from "express";
import * as bookController from "../Controllers/cake.js";

const router=express.Router();

router.get("/",bookController.getAllCakes);
router.get("/:cakeid",bookController.getCakeById);
router.delete("/:id",bookController.deleteCakeById);
router.put("/:id",bookController.updateCake);
router.post("/",bookController.addCake);

export default router;