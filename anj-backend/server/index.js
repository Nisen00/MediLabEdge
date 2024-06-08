import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { adminRoutes } from "./routes/admin.js";
import { bookingConfirmRoutes } from "./routes/bookingConfirm.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const connectToMySQL = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
        console.log("Connected to MySQL");
        return connection;
    } catch (error) {
        console.log("MySQL Error:", error);
        throw error;
    }
};

// Choose the appropriate database connection based on environment variable
const connectToDatabase = async () => {
    await connectToMySQL();
};

connectToDatabase();

app.use("/api/users", userRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/booking", bookingConfirmRoutes);
app.listen(process.env.PORT, () => {
    console.log("Server is Running on PORT:", process.env.PORT);
});
