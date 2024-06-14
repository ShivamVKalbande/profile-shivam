import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';


function Insert_customer() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerOpeningBalance, setCustomerOpeningBalance] = useState("");
  const [customerGstIn, setCustomerGstIn] = useState("");
  const [customerPan, setCustomerPan] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [customerCategory, setCustomerCategory] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");


  const navigate  = useNavigate()

  const handleBillingChange = (e) => {
    setBillingAddress(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setShippingAddress(billingAddress);
    } else {
      setShippingAddress("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

     // Create FormData object
    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("customerPhone", customerPhone);
    formData.append("customerEmail", customerEmail);
    formData.append("customerOpeningBalance", customerOpeningBalance);
    formData.append("customerGstIn", customerGstIn);
    formData.append("customerPan", customerPan);
    formData.append("customerType", customerType);
    formData.append("customerCategory", customerCategory);
    formData.append("billingAddress", billingAddress);
    formData.append("shippingAddress", shippingAddress);

    // Send form data to backend API (you'll need to implement this)
    axios
      .post("http://localhost:4000/customer/addCustomer", formData)
      .then(result => {
        if(result.data.Status) {
            navigate('/customer')
        } else {
            alert(result.data.Error)
        }
    })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ margin: "20px 20px 20px 20px", flex: 1, paddingLeft: "310px" }}>
      <div
        style={{
          border: "1px solid black",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* First row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            {/* Create Party button with back arrow */}
            <Link to="/customer" style={{ textDecoration: "none" }}>
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

            {/* Save button */}
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
          <h5 style={{ marginBottom: "5px" }}>General Details</h5>
          <hr />
          {/* First row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "22%", marginRight: "5px" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required="required"
                size="30"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
            <div style={{ width: "22%", marginRight: "5px" }}>
              <label
                htmlFor="mobileNo"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Mobile No.:
              </label>
              <input
                type="number"
                max={9999999999}
                min={1000000000}
                id="mobileNo"
                name="mobileNo"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
            <div style={{ width: "22%", marginRight: "5px" }}>
              <label
                htmlFor="email"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
            <div style={{ width: "22%", marginRight: "5px" }}>
              <label
                htmlFor="openingBalance"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Opening Balance:
              </label>
              <input
                type="number"
                id="openingBalance"
                name="openingBalance"
                value={customerOpeningBalance}
                onChange={(e) => setCustomerOpeningBalance(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
          </div>

          {/* Second row */}
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ width: "22%", marginRight: "30px" }}>
              <label
                htmlFor="gstin"
                style={{ display: "block", marginBottom: "5px" }}
              >
                GSTIN:
              </label>
              <input
                type="text"
                maxLength={15}
                minLength={15}
                id="gstin"
                name="gstin"
                value={customerGstIn}
                onChange={(e) => setCustomerGstIn(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
            <div
              style={{ width: "22%", marginRight: "30px", marginTop: "30px" }}
            >
              <button
                type="button"
                id="getDetailButton"
                style={{
                  width: "100%",
                  padding: "4px",
                  marginBottom: "10px",
                  backgroundColor: "#CCCCFF",
                  color: "white",
                  border: "none",
                }}
              >
                Get Detail
              </button>
            </div>
            <div style={{ width: "22%" }}>
              <label
                htmlFor="panNo"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Pan No:
              </label>
              <input
                type="text"
                maxLength={10}
                minLength={10}
                id="panNo"
                name="panNo"
                value={customerPan}
                onChange={(e) => setCustomerPan(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
          </div>
          <hr />

          {/* <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ width: "22%", marginRight: "30px" }}>
              <label
                htmlFor="customerType"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Customer Type:
              </label>
              <select
                id="customerType"
                name="customerType"
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              >
                <option value="">Select</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
              </select>
            </div>
            <div style={{ width: "22%" }}>
              <label
                htmlFor="customerCategory"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Customer Category:
              </label>
              <select
                id="customerCategory"
                name="customerCategory"
                value={customerCategory}
                onChange={(e) => setCustomerCategory(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              >
                <option value="">Select</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
            </div>
          </div>
          <hr /> */}
          <h5 style={{ marginBottom: "5px" }}>Address Details</h5>
          <hr />

          {/* Third row */}
           {/* Fourth row */}
           <div style={{ marginBottom: "10px" }}>
           
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%", marginRight: "10px" }}>
                <label
                  htmlFor="billingAddress"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Billing Address:
                </label>
                <textarea
                  id="billingAddress"
                  name="billingAddress"
                  value={billingAddress}
                  onChange={handleBillingChange}
                  style={{
                    width: "100%",
                    height: "100px",
                    padding: "5px",
                    verticalAlign: "top",
                  }}
                />
              </div>
              <div style={{ width: "45%" }}>
                <label
                  htmlFor="shippingAddress"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Shipping
                  Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="checkbox"
                    id="sameAsBilling"
                    name="sameAsBilling"
                    style={{ marginLeft: "5px", verticalAlign: "top" }}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="sameAsBilling"
                    style={{ marginLeft: "5px", verticalAlign: "top" }}
                  >
                    Same as Billing Address
                  </label>
                </label>
                <textarea
                  id="shippingAddress"
                  name="shippingAddress"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  style={{
                    width: "100%",
                    height: "100px",
                    padding: "5px",
                    verticalAlign: "top",
                  }}
                />
              </div>
            </div>
          </div>
          <hr />
        </form>
      </div>
    </div>
  );
}

export default Insert_customer;
