// controllers/adminController.js
import bcrypt from "bcrypt";
import { addAdmin } from "../models/admin.js";
import mysql from "mysql2/promise";

export const registerAdmin = async (req, res) => {
    const { username, email, mobile, password } = req.body;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [rows, fields] = await connection.execute(
            "SELECT * FROM admins WHERE email = ?",
            [email]
        );
        if (rows.length > 0) {
            return res.json({ message: "Admin already exists" });
        }

        await addAdmin(username, email, mobile, password, connection);
        return res.json({
            status: true,
            message: "Admin registered successfully",
        });
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error registering admin" });
    }
};

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [rows, fields] = await connection.execute(
            "SELECT * FROM admins WHERE email = ?",
            [email]
        );
        if (rows.length === 0) {
            return res.json({ message: "Admin not found" });
        }

        const admin = rows[0];
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.json({ message: "Invalid password" });
        }

        return res.json({ message: "Login successful" });
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error logging in" });
    }
};

export const updateAdmin = async (req, res) => {
    const adminId = req.params.id;
    const { username, email, mobile, password } = req.body;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [adminRows, adminFields] = await connection.execute(
            "SELECT * FROM admins WHERE id = ?",
            [adminId]
        );
        if (adminRows.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const existingEmail = adminRows[0].email;
        if (existingEmail !== email) {
            const [existingRows, existingFields] = await connection.execute(
                "SELECT * FROM admins WHERE email = ? AND id != ?",
                [email, adminId]
            );
            if (existingRows.length > 0) {
                return res
                    .status(400)
                    .json({ message: "Email already in use" });
            }
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await connection.execute(
            "UPDATE admins SET username = ?, email = ?, mobile = ?, password = ? WHERE id = ?",
            [username, email, mobile, hashPassword, adminId]
        );

        return res.json({
            status: true,
            message: "Admin updated successfully",
        });
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error updating admin" });
    }
};

export const deleteAdmin = async (req, res) => {
    const adminId = req.params.id;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [adminRows, adminFields] = await connection.execute(
            "SELECT * FROM admins WHERE id = ?",
            [adminId]
        );
        if (adminRows.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        await connection.execute("DELETE FROM admins WHERE id = ?", [adminId]);

        return res.json({
            status: true,
            message: "Admin deleted successfully",
        });
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error deleting admin" });
    }
};

export const getAdmin = async (req, res) => {
    const adminId = req.params.id;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [adminRows, adminFields] = await connection.execute(
            "SELECT * FROM admins WHERE id = ?",
            [adminId]
        );
        if (adminRows.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const admin = adminRows[0];
        return res.json(admin);
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error getting admin" });
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [adminsRows, adminsFields] = await connection.execute(
            "SELECT * FROM admins"
        );
        return res.json(adminsRows);
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error getting all admins" });
    }
};
