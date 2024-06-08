// controllers/userController.js
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import { addUser } from "../models/user.js";

export const registerUser = async (req, res) => {
    const { username, email, mobile, password } = req.body;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [rows, fields] = await connection.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        if (rows.length > 0) {
            return res.json({ message: "User already exists" });
        }

        await addUser(username, email, mobile, password, connection);
        return res.json({
            status: true,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error registering user" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [rows, fields] = await connection.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        if (rows.length === 0) {
            return res.json({ message: "User not found" });
        }

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ message: "Invalid password" });
        }

        return res.json({ message: "Login successful", user: user });
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error logging in" });
    }
};

// controllers/userController.js

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, email, mobile, password } = req.body;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [userRows, userFields] = await connection.execute(
            "SELECT * FROM users WHERE id = ?",
            [userId]
        );
        if (userRows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingEmail = userRows[0].email;
        if (existingEmail !== email) {
            const [existingRows, existingFields] = await connection.execute(
                "SELECT * FROM users WHERE email = ? AND id != ?",
                [email, userId]
            );
            if (existingRows.length > 0) {
                return res
                    .status(400)
                    .json({ message: "Email already in use" });
            }
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await connection.execute(
            "UPDATE users SET username = ?, email = ?, mobile = ?, password = ? WHERE id = ?",
            [username, email, mobile, hashPassword, userId]
        );

        return res.json({ status: true, message: "User updated successfully" });
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error updating user" });
    }
};
// controllers/userController.js

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [userRows, userFields] = await connection.execute(
            "SELECT * FROM users WHERE id = ?",
            [userId]
        );
        if (userRows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        await connection.execute("DELETE FROM users WHERE id = ?", [userId]);

        return res.json({ status: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error deleting user" });
    }
};

export const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [userRows, userFields] = await connection.execute(
            "SELECT * FROM users WHERE id = ?",
            [userId]
        );
        if (userRows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = userRows[0];
        return res.json(user);
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error getting user" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [usersRows, usersFields] = await connection.execute(
            "SELECT * FROM users"
        );
        return res.json(usersRows);
    } catch (error) {
        console.error("MySQL Error:", error);
        return res.status(500).json({ message: "Error getting all users" });
    }
};
