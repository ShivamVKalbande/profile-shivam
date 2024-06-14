import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { adminRouter } from "./Routes/adminRoute.js";
import jwt from "jsonwebtoken";
import { customerRouter } from "./Routes/customerRoute.js";
import { productRouter } from "./Routes/productRoute.js";
import { estimateRouter } from "./Routes/estimateRoute.js";



const app = express() 
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/admin', adminRouter)
app.use('/customer', customerRouter)
app.use('/product', productRouter)
app.use('/estimate', estimateRouter)


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json({ Error: "Token is invalid or expired" });
            req.id = decoded.id;
            next();
        })
    }
}

// Route to get news (requires authentication)
app.get('/customer', verifyUser, (req, res) => {
    return res.json({ Status: "Success", id: req.id });
})

//console.log('my name is', process.env.my_name);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Server is running", PORT)
})