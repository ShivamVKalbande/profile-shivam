import express from "express";
import db from "../utils/db.js";
import multer from 'multer';

const router = express.Router();
const upload = multer();

// // get lastet id 
// router.get("/getId", (req, res) => {
//   const sql = "SELECT est_id FROM estimate ORDER BY  est_id DESC LIMIT 1";
//   db.query(sql, (err, result) => {
//     if (err) return res.json({ Error: "Get estimate error in sql" });
//     return res.json({ Status: "Success", Result: result });
//   });
// });

// router.post('/data', upload.none(), (req, res) => {
//   const cName = req.body.username;
//   if (cName !== "") {
//     db.query("SELECT * FROM customer WHERE c_name LIKE ?", ["%" + cName + "%"], (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Server error");
//       } else {
//         console.log(result); // Add this line to debug the result
//         res.send(result); // Sending the result back to the client
//       }
//     });
//   } else {
//     res.send([]); // Sending an empty array if the username is empty
//   }
// });
 
router.post('/test', upload.none(), (req, res) => {
    console.log('req.body', req.body);

    if (!Array.isArray(req.body.inputs) || !Array.isArray(req.body.hsns)) {
        return res.json({ Error: "Invalid data format" });
    }

    const sqlGetLatestId = "SELECT estd_id FROM estimate_details ORDER BY estd_id DESC LIMIT 1";
    db.query(sqlGetLatestId, (err, result) => {
        if (err) {
            console.error('Error getting latest ID:', err);
            return res.json({ Error: "Error getting latest ID" });
        }

        let latestId = 1;
        if (result && result.length > 0) {
            latestId = result[0].estd_id + 1;
        }

        const sql = "INSERT INTO estimate_details (estd_id, estd_description, estd_hsn, estd_rate) VALUES ?";
        const values = req.body.inputs.map((input, index) => [latestId++, input, req.body.hsns[index], req.body.est_no[index]]);


        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error inserting estimate data:', err);
                return res.json({ Error: "Error inserting estimate data" });
            }
            console.log('Estimate data inserted successfully');
            return res.json({ Status: "Success" });
        });
    });
});

export { router as estimateRouter };
