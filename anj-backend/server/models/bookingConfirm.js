// models/bookingConfirm.js
import mysql from "mysql2/promise";

export const addBookingConfirm = async (
    name,
    phone,
    bookingDate,
    doctorName,
    price,
    isTrue,
    connection
) => {
    try {
        await connection.execute(
            "INSERT INTO booking_confirms (name, phone, booking_date, doctor_name, price, is_true) VALUES (?, ?, ?, ?, ?, ?)",
            [name, phone, bookingDate, doctorName, price, isTrue]
        );
        return true;
    } catch (error) {
        console.error("MySQL Error:", error);
        throw error;
    }
};
