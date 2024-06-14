import express from "express";
import db from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/login', (req, res) => {
    
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        if (data.length > 0) {
            const id = data[0].id;
            const token = jwt.sign({ id: id }, "jwt-secret-key", { expiresIn: '1h' });
            res.cookie('token', token);
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Status: "Error", Error: "Wrong username or Password" });
        }
    })
})

//logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})

export { router as adminRouter };