import express from "express";
import db from "../utils/db.js";
import multer from 'multer';

const router = express.Router();
const upload = multer();

// get lastet id 
router.get("/getId", (req, res) => {
  const sql = "SELECT est_id FROM estimate ORDER BY  est_id DESC LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get estimate error in sql" });
    if (result.length === 0) {
      return res.json({ Status: "Success", Result: 1 });
    }
    return res.json({ Status: "Success", Result: result });
  });
});

router.post('/data', upload.none(), (req, res) => {
  const cName = req.body.username;
 
  if (cName !== "") {
    db.query("SELECT * FROM customer WHERE c_name LIKE ?", ["%" + cName + "%"], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else {
        console.log(result); // Add this line to debug the result
        res.send(result); // Sending the result back to the client
      }
    });
  } else {
    res.send([]); // Sending an empty array if the username is empty
  }
});
 
router.post('/addEstimate', upload.none(), (req, res) => {
  console.log('req.body', req.body);

  // Ensure req.body.data is an array
  if (!Array.isArray(req.body.data)) {
    return res.status(400).json({ Error: "Invalid data format" });
  }

  const cName = req.body.cName;
  console.log(cName);

  const sqlGetLatestEstId = "SELECT est_id FROM estimate ORDER BY est_id DESC LIMIT 1";
  const sqlGetLatestEstdId = "SELECT estd_id FROM estimate_details ORDER BY estd_id DESC LIMIT 1";
  const sqlGetCustomerId = "SELECT customer_id FROM customer WHERE c_name = ?";

  db.query(sqlGetCustomerId, [cName], (err, customerResults) => {
    if (err) {
      console.error("Error fetching customer ID:", err);
      return res.status(500).json({ Error: "Error fetching customer ID" });
    }
    console.log("Customer ID:", customerResults);

    db.query(sqlGetLatestEstId, (err, estResults) => {
      if (err) {
        console.error("Error fetching latest estimate ID:", err);
        return res.status(500).json({ Error: "Error fetching latest estimate ID" });
      }
      console.log("Latest Estimate ID:", estResults);

      let lastedEstId = 1;
      if (estResults && estResults.length > 0) {
        lastedEstId = estResults[0].est_id + 1;
      }

      const sqlEst = `
        INSERT INTO estimate (
          est_id, 
          est_no, 
          customer_no, 
          est_customer_name,
          est_shipping_add,
          est_billing_add,
          est_date, 
          est_dua_day, 
          est_valid_date, 
          est_taxable_amount, 
          est_sgst, 
          est_cgst, 
          est_discount, 
          est_freight, 
          est_freight_tax, 
          est_freight_total, 
          est_grand_total
        ) VALUES (?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const estValues = [
        lastedEstId,
        req.body.est_no,
        customerResults[0].customer_id,
        req.body.cName,
        req.body.shipAdd,
        req.body.billAdd,
        req.body.quotationDate,
        req.body.paymentTerm,
        req.body.dueDate,
        req.body.taxable_amount,
        req.body.sgst,
        req.body.cgst,
        req.body.discount,
        req.body.freight,
        req.body.freight_tax,
        req.body.freight_total,
        req.body.grand_total,
      ];

      db.query(sqlEst, estValues, (err, result) => {
        if (err) {
          console.error("Error inserting estimate:", err);
          return res.json({ Error: "Error inserting estimate" });
        }
        console.log("Estimate inserted successfully");

        db.query(sqlGetLatestEstdId, (err, estdResults) => {
          if (err) {
            console.error("Error fetching latest estimate_details ID:", err);
            return res.status(500).json({ Error: "Error fetching latest estimate_details ID" });
          }
          console.log("Latest Estimate_details ID:", estdResults);

          let lastedEstdId = 1;
          if (estdResults && estdResults.length > 0) {
            lastedEstdId = estdResults[0].estd_id + 1;
          }

          const sqlEstdDetails = `
            INSERT INTO estimate_details (
              estd_id, 
              est_id, 
              product_no, 
              estd_item_name, 
              estd_hsn, 
              estd_rate, 
              estd_quantity, 
              estd_dis_amt, 
              estd_dis_per, 
              estd_cgst, 
              estd_sgst, 
              estd_amount
            ) VALUES ?
          `;
          
          const values = req.body.data.map((item, index) => [
            lastedEstdId++,
            lastedEstId,
            item.productNo,
            item.itemName,
            item.hsns,
            item.taxRates,
            item.quantities,
            item.disAmt,
            item.disPer,
            item.cgsts,
            item.sgsts,
            item.totalAmounts
          ]);
          
          db.query(sqlEstdDetails, [values], (err, result) => {
            if (err) {
              console.error('Error inserting estimate details data:', err);
              return res.json({ Error: "Error inserting estimate details data" });
            }
            console.log('Estimate details data inserted successfully');
            return res.json({ Status: "Success" });
          });          
        });
      });
    });
  });
});

// Showing Estimate data

router.get("/getEstimate", (req, res) => {
  const sql = "SELECT * FROM estimate";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get estimate error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

// Delete Estimate and Estimate Details Data
router.delete("/delete/:est_id", upload.none(), (req, res) => {
  const est_id = req.params.est_id;

  const estSql = "DELETE FROM estimate WHERE est_id = ?";
  const estdSql = "DELETE FROM estimate_details WHERE est_id = ?";

  db.query(estdSql, [est_id], (err, result) => {
    if (err) {
      console.error("Delete estimate_details error in SQL:", err);
      return res.status(500).json({ Error: "Delete estimate_details error in SQL" });
    }

    db.query(estSql, [est_id], (err, result) => {
      if (err) {
        console.error("Delete Estimate error in SQL:", err);
        return res.status(500).json({ Error: "Delete Estimate error in SQL" });
      }

      return res.json({ Status: "Success" });
    });
  });
});




export { router as estimateRouter };
