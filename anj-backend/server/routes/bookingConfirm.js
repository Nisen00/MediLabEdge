// routes/bookingConfirmRoutes.js
import express from "express";
import {
    addBookingConfirm,
    updateBookingConfirm,
    deleteBookingConfirm,
    getBookingConfirm,
    getAllBookingConfirms,
} from "../controllers/bookingConfirm.js";

const router = express.Router();

router.post("/", addBookingConfirm);
router.put("/:id", updateBookingConfirm);
router.delete("/:id", deleteBookingConfirm);
router.get("/:id", getBookingConfirm);
router.get("/", getAllBookingConfirms);

export { router as bookingConfirmRoutes };
