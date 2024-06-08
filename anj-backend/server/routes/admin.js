// routes/adminRoutes.js
import express from "express";
import {
    registerAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin,
    getAdmin,
    getAllAdmins,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.get("/:id", getAdmin);
router.get("/", getAllAdmins);

export { router as adminRoutes };
