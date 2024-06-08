// controllers/bookingConfirmController.js
import mysql from "mysql2/promise";
import { addBookingConfirm as addBookingConfirmModel } from "../models/bookingConfirm.js";

export const addBookingConfirm = async (req, res) => {
    const { name, phone, bookingDate, doctorName, price, isTrue } = req.body;
    console.log(name, phone, bookingDate, doctorName, price, isTrue);
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        await addBookingConfirmModel(
            name,
            phone,
            bookingDate,
            doctorName,
            price,
            isTrue,
            connection
        );
        return res.json({
            status: true,
            message: "Booking confirmation added successfully",
        });
    } catch (error) {
        console.error("MySQL Error:", error);
        return res
            .status(500)
            .json({ message: "Error adding booking confirmation" });
    }
};

export const updateBookingConfirm = async (req, res) => {
    const bookingId = req.params.id;
    const { name, phone, bookingDate, doctorName, price, isTrue } = req.body;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        await connection.execute(
            "UPDATE booking_confirms SET name = ?, phone = ?, booking_date = ?, doctor_name = ?, price = ?, is_true = ? WHERE id = ?",
            [name, phone, bookingDate, doctorName, price, isTrue, bookingId]
        );

        return res.json({
            status: true,
            message: "Booking confirmation updated successfully",
        });
    } catch (error) {
        console.error("MySQL Error:", error);
        return res
            .status(500)
            .json({ message: "Error updating booking confirmation" });
    }
};

export const deleteBookingConfirm = async (req, res) => {
    const bookingId = req.params.id;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        await connection.execute("DELETE FROM booking_confirms WHERE id = ?", [
            bookingId,
        ]);

        return res.json({
            status: true,
            message: "Booking confirmation deleted successfully",
        });
    } catch (error) {
        console.error("MySQL Error:", error);
        return res
            .status(500)
            .json({ message: "Error deleting booking confirmation" });
    }
};

export const getBookingConfirm = async (req, res) => {
    const bookingId = req.params.id;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [bookingRows, bookingFields] = await connection.execute(
            "SELECT * FROM booking_confirms WHERE id = ?",
            [bookingId]
        );
        if (bookingRows.length === 0) {
            return res
                .status(404)
                .json({ message: "Booking confirmation not found" });
        }

        const booking = bookingRows[0];
        return res.json(booking);
    } catch (error) {
        console.error("MySQL Error:", error);
        return res
            .status(500)
            .json({ message: "Error getting booking confirmation" });
    }
};

export const getAllBookingConfirms = async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [bookingsRows, bookingsFields] = await connection.execute(
            "SELECT * FROM booking_confirms"
        );
        return res.json(bookingsRows);
    } catch (error) {
        console.error("MySQL Error:", error);
        return res
            .status(500)
            .json({ message: "Error getting all booking confirms" });
    }
};
