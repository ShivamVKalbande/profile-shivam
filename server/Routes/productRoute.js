import express from "express";
import db from "../utils/db.js";
import multer from "multer";

const router = express.Router();
// to handle data use multer
const upload = multer();

// inserting Product data

router.post("/addProduct", upload.none(), (req, res) => {
  console.log("req.body", req.body);

  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Get current date in "YYYY-MM-DD HH:mm:ss" format

  // Get the latest ID from the database
  const sqlGetLatestId = "SELECT p_id FROM product ORDER BY p_id DESC LIMIT 1";
  db.query(sqlGetLatestId, async (err, result) => {
    if (err) {
      console.error("Error getting latest ID:", err);
      return res.json({ Error: "Error getting latest ID" });
    }

    let latestId = 1; // Default ID if no data exists
    if (result && result.length > 0) {
      latestId = result[0].p_id + 1; // Increment the latest ID
    }

    const product_id = `prod${latestId}`;

    const sql =
      "INSERT INTO product (`product_id`, `p_name`, `p_description`, `p_item_type`, `p_category`, `p_hsn_code`,`p_purchase_price`,`p_selling_price`, `p_purchase_tax`,`p_selling_tax`,`p_master_tax`, `p_product_unit`, `p_opening_stock`, `p_current_date`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      product_id,
      req.body.itemName,
      req.body.itemDescription,
      req.body.itemType,
      req.body.category,
      req.body.itemHSN,
      req.body.purchasePrice,
      req.body.salesPrice,
      req.body.purchaseTax,
      req.body.sellingTax,
      req.body.taxRate,
      req.body.measuringUnit,
      req.body.openingStock,
      currentDate,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting product Data:", err);
        return res.json({ Error: "Error inserting product Data" });
      }
      console.log("Product Data inserted successfully");
      return res.json({ Status: "Success" });
    });
  });
});

// Showing Product data

router.get("/getProduct", (req, res) => {
  const sql = "SELECT * FROM product";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get product error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

//show data in update Product form

router.get("/get/:p_id", (req, res) => {
  const p_id = req.params.p_id;
  const sql = "SELECT * FROM product where p_id = ?";
  console.log("Executing SQL:", sql);
  console.log("Product ID:", p_id);
  db.query(sql, [p_id], (err, result) => {
    if (err) {
      console.error("Error fetching product data:", err);
      return res.json({ Error: "Get product data Error in sql" });
    }
    console.log("Fetched product data:", result);
    return res.json({ Status: "Success", Result: result });
  });
});

//update customer data

router.put("/update/:p_id", upload.none(), (req, res) => {
  const p_id = req.params.p_id;
  const sql = `
      UPDATE product 
      SET 
        p_name = ?, 
        p_description = ?, 
        p_item_type = ?, 
        p_category = ?, 
        p_hsn_code = ?, 
        p_purchase_price = ?, 
        p_selling_price = ?, 
        p_purchase_tax = ?, 
        p_selling_tax = ?, 
        p_master_tax = ?, 
        p_product_unit = ?, 
        p_opening_stock = ? 
      WHERE p_id = ?
    `;
  const values = [
    req.body.itemName,
    req.body.itemDescription,
    req.body.itemType,
    req.body.category,
    req.body.itemHSN,
    req.body.purchasePrice,
    req.body.salesPrice,
    req.body.purchaseTax,
    req.body.sellingTax,
    req.body.taxRate,
    req.body.measuringUnit,
    req.body.openingStock,
    p_id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update item error in SQL:", err);
      return res.status(500).json({ Error: "Update item error in SQL" });
    }
    return res.json({ Status: "Success" });
  });
});

// Delete Product Data
router.delete("/delete/:p_id", upload.none(), (req, res) => {
  const p_id = req.params.p_id;

  const sql = "Delete FROM product WHERE p_id =?";
  db.query(sql, [p_id], (err, result) => {
    if (err) return res.json({ Error: "Delete product error in sql" });
    return res.json({ Status: "Success" });
  });
});
export { router as productRouter };
