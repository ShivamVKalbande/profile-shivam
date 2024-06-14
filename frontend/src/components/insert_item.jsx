import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Item() {
  const [itemType, setItemType] = useState("");
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemHSN, setItemHSN] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salesPrice, setSalesPrice] = useState("");
  const [purchaseTax, setPurchaseTax] = useState("");
  const [sellingTax, setSellingTax] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [measuringUnit, setMeasuringUnit] = useState("");
  const [openingStock, setOpeningStock] = useState("");
  const [categories, setCategories] = useState(["cctv", "hardware", "IT", "generals"]); 
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("itemType", itemType);
    formData.append("category", category);
    formData.append("itemName", itemName);
    formData.append("itemDescription", itemDescription);
    formData.append("itemHSN", itemHSN);
    formData.append("purchasePrice", purchasePrice);
    formData.append("salesPrice", salesPrice);
    formData.append("purchaseTax", purchaseTax);
    formData.append("sellingTax", sellingTax);
    formData.append("taxRate", taxRate);
    formData.append("measuringUnit", measuringUnit);
    formData.append("openingStock", openingStock);

    axios
      .post("http://localhost:4000/product/addProduct", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/item");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
      setNewCategory("");
      setShowAddCategory(false);
    }
  };

  return (
    <div
      style={{
        margin: "40px",
        paddingBottom: "10px",
        paddingTop: "5px",
        maxWidth: "800px",
        padding: "40px",
        border: "1px solid black",
        borderRadius: "8px",
        marginLeft: "370px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Link to="/item" style={{ textDecoration: "none" }}>
            <a
              style={{
                padding: "8px",
                marginRight: "430px",
                color: "black",
                border: "none",
              }}
            >
              <span style={{ fontSize: "30px" }}>&#8592;</span>
            </a>
          </Link>

          <button
            type="submit"
            style={{
              padding: "8px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Save
          </button>
        </div>

        <hr />
        <h5>Basic Details</h5>
        <hr />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <span style={{ marginRight: "20px" }}>Product</span>
          <button
            type="button"
            style={{
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              marginRight: "20px",
              backgroundColor:
                itemType === "Product" ? "#4154f1" : "transparent",
            }}
            onClick={() => setItemType("Product")}
          ></button>
          <span style={{ marginRight: "20px" }}>Service</span>
          <button
            type="button"
            style={{
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              marginRight: "20px",
              backgroundColor:
                itemType === "Service" ? "#4154f1" : "transparent",
            }}
            onClick={() => setItemType("Service")}
          ></button>
          <div style={{ width: "48%", marginLeft: "auto" }}>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "80%", paddingRight: "8px" }}
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowAddCategory(!showAddCategory)}
              style={{
                padding: "8px",
                marginLeft: "8px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Add
            </button>
          </div>
        </div>
        {showAddCategory && (
          <div style={{ marginBottom: "25px" }}>
            <input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={{ width: "80%", marginRight: "10px" }}
            />
            <button
              type="button"
              onClick={handleAddCategory}
              style={{
                padding: "8px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Save
            </button>
          </div>
        )}
        {/* Second Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div style={{ width: "50%", marginRight: "20px" }}>
            <label htmlFor="itemName">Item Name:</label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              style={{
                width: "100%",
              }}
            />
          </div>
          <div style={{ width: "50%", marginRight: "20px" }}>
            <label htmlFor="itemDescription">Item Description:</label>
            <textarea
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>
        {/* Third Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div style={{ width: "50%", marginRight: "20px" }}>
            <label htmlFor="itemHSN">HSN/SAC No:</label>
            <input
              type="number"
              id="HSN"
              value={itemHSN}
              onChange={(e) => setItemHSN(e.target.value)}
              style={{
                width: "100%",
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <label htmlFor="purchasePrice">Purchase Price:</label>
            <div style={{ position: "relative" }}>
              <input
                type="number"
                id="purchasePrice"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                style={{ width: "100%", paddingRight: "40px" }}
              />
              <select
                id="purchaseTax"
                value={purchaseTax}
                onChange={(e) => setPurchaseTax(e.target.value)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "95px",
                }}
              >
                <option value="With Tax">With Tax</option>
                <option value="Without Tax">Without Tax</option>
              </select>
            </div>
          </div>
        </div>
        {/* Fourth Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div style={{ width: "50%", marginRight: "20px" }}>
            <label htmlFor="salesPrice">Sales Price:</label>
            <div style={{ position: "relative" }}>
              <input
                type="number"
                id="salesPrice"
                value={salesPrice}
                onChange={(e) => setSalesPrice(e.target.value)}
                style={{ width: "100%", paddingRight: "40px" }}
              />
              <select
                id="sellingTax"
                value={sellingTax}
                onChange={(e) => setSellingTax(e.target.value)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "95px",
                }}
              >
                <option value="With Tax">With Tax</option>
                <option value="Without Tax">Without Tax</option>
              </select>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <label htmlFor="taxRate">GST Tax Rate(%):</label>
            <select
              id="taxRate"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              style={{ width: "100%", paddingRight: "8px" }}
            >
              <option value="">Select Tax Rate</option>
              <option value="0">None</option>
              <option value="0">Exempted</option>
              <option value="0">GST @0%</option>
              <option value="0.1">GST @0.1%</option>
              <option value="0.25">GST @0.25%</option>
              <option value="1.5">GST @1.5%</option>
              <option value="3">GST @3%</option>
              <option value="5">GST @5%</option>
              <option value="6">GST @6%</option>
              <option value="12">GST @12%</option>
              <option value="13.8">GST @13.8%</option>
              <option value="18">GST @18%</option>
              <option value="26">GST @14% + cess @12%</option>
              <option value="28">GST @28%</option>
              <option value="42">GST @28% + cess @12%</option>
              <option value="88">GST @28% + cess @60%</option>           
            </select>
          </div>
        </div>
        {/* Fifth Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div style={{ width: "49%", marginRight: "20px" }}>
            <label htmlFor="measuringUnit">Measuring Unit:</label>
            <select
              id="measuringUnit"
              value={measuringUnit}
              onChange={(e) => setMeasuringUnit(e.target.value)}
              style={{ width: "100%", paddingRight: "8px" }}
            >
              <option value="">Select Measuring Unit</option>
              <option value="k">Kilo</option>
              <option value="p">Piece</option>
              <option value="m">Meter</option>
              <option value="l">Liter</option>
              {/* Add options for measuring units */}
            </select>
          </div>
          <div style={{ width: "50%" }}>
            <label htmlFor="openingStock">Opening Stock:</label>
            <input
              type="number"
              id="openingStock"
              value={openingStock}
              onChange={(e) => setOpeningStock(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Item;
