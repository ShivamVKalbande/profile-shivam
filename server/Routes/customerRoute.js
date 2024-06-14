import express from "express";
import db from "../utils/db.js";
import multer from 'multer';

const router = express.Router();
// to handle data use multer
const upload = multer();

// inserting Customer data 

router.post('/addCustomer', upload.none(), (req, res) => {
    console.log('req.body', req.body);

    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get current date in "YYYY-MM-DD HH:mm:ss" format
    console.log('Current date:', currentDate); // Print the current date

    

    // Get the latest ID from the database
    const sqlGetLatestId = "SELECT c_id FROM customer ORDER BY c_id DESC LIMIT 1";
    db.query(sqlGetLatestId, async (err, result) => {
        if (err) {
            console.error('Error getting latest ID:', err);
            return res.json({ Error: "Error getting latest ID" });
        }

        let latestId = 1; // Default ID if no data exists
        if (result && result.length > 0) {

            latestId = result[0].c_id + 1; // Increment the latest ID
        }

        const customer_id = `cust${latestId}`;

        const sql = "INSERT INTO customer (`customer_id`,`c_name`, `c_phone`, `c_current_date`, `c_email`, `c_billing_add`, `c_shipping_add`, `c_opening_balance`, `c_gst`, `c_pan`, `c_type`, `c_category`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const values = [
            customer_id,
            req.body.customerName,
            req.body.customerPhone,
            currentDate,
            req.body.customerEmail,
            req.body.billingAddress,
            req.body.shippingAddress,
            req.body.customerOpeningBalance,
            req.body.customerGstIn,
            req.body.customerPan,
            req.body.customerType,
            req.body.customerCategory
        ];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting customer Data:', err);
                return res.json({ Error: "Error inserting customer Data" });
            }
            console.log('Customer Data inserted successfully');
            return res.json({ Status: "Success" });
        });
    });
});

// Showing customer data 

router.get('/getCustomer', (req , res) => {
    const sql = "SELECT * FROM customer";
    db.query(sql, (err, result) => {
      if(err) return res.json({Error: "Get customer error in sql"});
      return res.json({Status:"Success", Result: result})
    })
});

//show data in update Customer form

router.get('/get/:c_id', (req, res) => {
    const c_id = req.params.c_id;
    const sql = "SELECT * FROM customer where c_id = ?";
    console.log('Executing SQL:', sql);
    console.log('Customer ID:', c_id);
    db.query(sql, [c_id], (err, result) => {
        if (err) {
            console.error('Error fetching customer data:', err);
            return res.json({ Error: "Get customer data Error in sql" });
        }
        console.log('Fetched customer data:', result);
        return res.json({ Status: "Success", Result: result });
    });
});


//update customer data 

router.put('/update/:c_id', upload.none(), (req, res) => {
    const c_id = req.params.c_id;

    const sql = "UPDATE customer SET c_name = ?, c_phone = ?, c_email = ?, c_opening_balance = ?, c_gst = ?, c_pan = ?, c_type = ?, c_category = ?, c_billing_add = ?, c_shipping_add = ? WHERE c_id = ?";
    const values = [
        req.body.customerName,
        req.body.customerPhone,
        req.body.customerEmail,
        req.body.customerOpeningBalance,
        req.body.customerGstIn,
        req.body.customerPan,
        req.body.customerType,
        req.body.customerCategory,
        req.body.billingAddress,
        req.body.shippingAddress,
        c_id
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Update item error in SQL:', err);
            return res.status(500).json({ Error: "Update item error in SQL" });
        }
        return res.json({ Status: "Success" });
    });
});


// Delete Customer Data 
router.delete('/delete/:c_id', upload.none(), (req, res) => {
    const c_id = req.params.c_id;

    const sql = "Delete FROM customer WHERE c_id =?";
    db.query(sql, [c_id], (err, result) => {
      if(err) return res.json({Error: "Delete customer error in sql"});
      return res.json({Status:"Success"})
    })
  })

export { router as customerRouter };
