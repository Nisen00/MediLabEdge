// routes/userRoutes.js
import express from "express";
import {
    deleteUser,
    registerUser,
    loginUser,
    updateUser,
    getUser,
    getAllUsers,
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);

export { router as userRouter };
