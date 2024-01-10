import  express  from "express";
import * as cakeController from "../Controllers/cake.js";
import { auth } from "../middlwares/auth.js";

const router=express.Router();

router.get("/",cakeController.getAllCakes);
router.get("/:cakeid",cakeController.getCakeById);
router.delete("/:id",cakeController.deleteCakeById);
router.put("/:id",cakeController.updateCake);
router.post("/",auth,cakeController.addCake);

export default router;