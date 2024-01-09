import { addUser, login } from "../Controllers/user.js";
import express from "express";

const router=express.Router();
router.post('/',addUser);
router.post('/login',login);

export default router;