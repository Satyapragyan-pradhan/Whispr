import express from "express"
import { signup, login, logout, updateProfile,checkAuth } from "../controllers/auth.controller.js"
import {protectRoute} from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

//middleware to get authetication
router.put("/profile",protectRoute,updateProfile)

router.get("/check",protectRoute,checkAuth)

export default router;