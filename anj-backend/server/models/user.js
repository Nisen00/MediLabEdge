// models/user.js
import bcrypt from "bcrypt";

export const addUser = async (
    username,
    email,
    mobile,
    password,
    connection
) => {
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        await connection.execute(
            "INSERT INTO users (username, email, mobile, password) VALUES (?, ?, ?, ?)",
            [username, email, mobile, hashPassword]
        );
        return true;
    } catch (error) {
        console.error("MySQL Error:", error);
        throw error;
    }
};
