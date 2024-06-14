import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EstimateContext } from "./EstimateContext";
import { ReactToPrint } from "react-to-print";
import "./Modal.css";

function Insert_estimate() {
  const navigate = useNavigate();
  const { selectedItems, allItems, rows, setAllItems, setRows,shippingAddress, setShippingAddress, billingAddress, setBillingAddress, paymentTerm, setPaymentTerm} = useContext(EstimateContext);
  // const [allItems, setAllItems] = useState([]);
  // const [rows, setRows] = useState([]);
  const [tab, setTab] = useState([]);
  const [inpVal, setInpVal] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  //const [billingAddress, setBillingAddress] = useState("");
  //const [shippingAddress, setShippingAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [quotationDate, setQuotationDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  // const [paymentTerm, setPaymentTerm] = useState("30");
  const [dueDate, setDueDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [taxRate, setTaxRate] = useState("");
  const [allAmount, setAllAmount] = useState("");
  const [allTax, setAllTax] = useState("");
  const [allTotalAmount, setAllTotalAmount] = useState("");
  const [transportCharge, setTransportCharge] = useState(false);
  const [transportTaxRate, setTransportTaxRate] = useState("");
  const [transport, setTransport] = useState("");
  const [totalTransport, setTotalTransport] = useState(0);
  const [discount, setDiscount] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [overallTotalAmount, setOverallTotalAmount] = useState("");
  const componentRef = useRef(null);

  // useEffect(() => {
  //   setAllItems(selectedItems);
  // }, [selectedItems]);

  useEffect(() => {
    const insetSelectedItems = Array.isArray(selectedItems)
      ? selectedItems
      : [selectedItems];
    setAllItems(insetSelectedItems);
  }, [selectedItems]);

  useEffect(() => {
    const newRows = allItems.map((item, index) => ({
      id: index + 1,
      item: item.name,
      hsn: item.code,
      quantity: item.quantity,
      amount: item.salesPrice,
      selectedTax: item.selectedTax,
      product_id: item.productId,
      totalAmount: calculateTotal(
        item.quantity,
        item.salesPrice,
        item.selectedTax,
        item.itemDiscountAmount
      ),
      itemDiscountAmount: item.itemDiscountAmount,
      itemDiscountPercent: item.itemDiscountPercent,
    }));
    setRows(newRows);
  }, [allItems]);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleSearchDropdown = () => {
    setShowSearchDropdown(!showSearchDropdown);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/estimate/getId`)
      .then((res) => {
        const { est_id } = res.data.Result[0];
        setInvoiceNumber(est_id + 1);
      })
      .catch((err) => console.log("Error fetching data:", err));
  });

  useEffect(() => {
    if (paymentTerm !== "") {
      const term = parseInt(paymentTerm, 10);
      if (!isNaN(term)) {
        const newDueDate = new Date(quotationDate);
        newDueDate.setDate(newDueDate.getDate() + term);
        setDueDate(newDueDate.toISOString().split("T")[0]);
      } else {
        setDueDate(""); // Clear due date if payment term is invalid
      }
    } else {
      setDueDate(""); // Clear due date if payment term is empty
    }
  }, [quotationDate, paymentTerm]);

  const handleQuotationDateChange = (e) => {
    setQuotationDate(e.target.value);
  };

  const handlePaymentTermChange = (e) => {
    setPaymentTerm(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleAddPartyClick = () => {
    setShowDropdown(true);
    setShowSearchDropdown(true);
  };

  const handleBackClick = () => {
    setShowSearchDropdown(false);
    setShowDropdown(false);
  };

  const handleSearchButtonClick = () => {
    setShowSections(true);
    setSearchClicked(true);
  };

  const calculateTotal = (quantity, amount, selectedTax, itemDiscountAmount) => {
    const total = quantity * amount - itemDiscountAmount;
    const tax = total * (parseFloat(selectedTax) / 100);
    return (total + tax).toFixed(2);
  };

  useEffect(() => {
    let subtotal = 0;
    let totalTax = 0;
    let totalAmount = 0;

    rows.forEach((row) => {
      const rowTotal = parseFloat(row.totalAmount);
      //subtotal += rowTotal / (1 + parseFloat(row.selectedTax) / 100);
      subtotal += parseFloat(row.amount);
      totalTax += rowTotal - rowTotal / (1 + parseFloat(row.selectedTax) / 100);
      totalAmount += rowTotal;
    });

    setAllAmount(subtotal.toFixed(2));
    setAllTax(totalTax.toFixed(2));
    setAllTotalAmount(totalAmount.toFixed(2));
  }, [rows]);

  const handleItemInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;

    const quantity = parseFloat(newRows[index].quantity) || 0;
    const amount = parseFloat(newRows[index].amount) || 0;
    const selectedTax = parseFloat(newRows[index].selectedTax) || 0;
    const itemDiscountAmount = parseFloat(newRows[index].itemDiscountAmount) || 0;
    const itemDiscountPercent = parseFloat(newRows[index].itemDiscountPercent) || 0;
    const totalAmount = parseFloat(newRows[index].totalAmount) || 0;
        
    if (name === "itemDiscountPercent") {
        const discountAmount = (amount * quantity * itemDiscountPercent) / 100;
        newRows[index]["itemDiscountAmount"] = discountAmount.toFixed(2);
    }
    
    if (name === "itemDiscountAmount") {
        const discountPercent = (itemDiscountAmount / (amount * quantity)) * 100;
        newRows[index]["itemDiscountPercent"] = discountPercent.toFixed(2);
    }

    if (name === "totalAmount") {
        const ChangedAmount1 = (totalAmount/quantity);
        const discountAmount1 = (ChangedAmount1 * quantity * itemDiscountPercent) / 100;
        const ChangedAmount2 = ChangedAmount1 -((ChangedAmount1*selectedTax)/100) + discountAmount1;
        const discountAmount2 = (ChangedAmount2 * quantity * itemDiscountPercent) / 100;
        newRows[index]["amount"] = ChangedAmount2.toFixed(2);
        newRows[index]["itemDiscountAmount"] = discountAmount2.toFixed(2);
    }

    if (
        name === "quantity" ||
        name === "amount" ||
        name === "selectedTax" ||
        name === "itemDiscountAmount" ||
        name === "itemDiscountPercent"
    ) {
        const updatedDiscountAmount = parseFloat(newRows[index].itemDiscountAmount) || 0;
    
        newRows[index]["totalAmount"] = calculateTotal(
            quantity,
            amount,
            selectedTax,
            updatedDiscountAmount
        );
    }

    console.log(`Updated Row ${index}:`, newRows[index]);

    setRows(newRows);
};


  const handleDeleteItem = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleNameClick = (name, billingAdd, shippingAdd) => {
    setInpVal(name);
    setBillingAddress(billingAdd);
    setShippingAddress(shippingAdd);
  };

  const handleAddItem = () => {
    navigate("/estimate_item");
    const lastItemTotalAmount =
      rows.length > 0 ? parseFloat(rows[rows.length - 1].totalAmount) : 0;
    const newItem = {
      id: rows.length + 1,
      item: "",
      hsn: "",
      quantity: "",
      amount: "",
      selectedTax: "",
      totalAmount: lastItemTotalAmount.toFixed(2),
    };
    // Concatenate the new item to the existing list
    const updatedAllItems = [...allItems, newItem];
    setAllItems(updatedAllItems);
    console.log("All Items after adding item:", updatedAllItems);
  };

  const handleChangeInp = (e) => {
    const value = e.target.value;
    setInpVal(value);
  };

  const handleChangeCustomerClick = () => {
    setShowSections(false);
    setSearchClicked(false);
    setBillingAddress("");
    setShippingAddress("");
  };

  useEffect(() => {
    if (inpVal && inpVal.trim() !== "") {
      axios
        .post("http://localhost:4000/estimate/data", { username: inpVal })
        .then((response) => {
          const resp = response.data;
          if (resp.length > 0) {
            setTab(resp);
            console.log(tab);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [inpVal]);

  // Addional Charges
  const addAdditional = () => {
    setTransportCharge(true);
  };

  // Function to calculate total transport charge including tax
  const calculateTotalTransport = () => {
    const transportValue = parseFloat(transport) || 0;
    const taxRateValue = parseFloat(transportTaxRate) || 0;
    const total = transportValue + (transportValue * taxRateValue) / 100;
    setTotalTransport(total.toFixed(2));
  };

  // Recalculate totalTransport whenever transport or taxRate changes
  useEffect(() => {
    calculateTotalTransport();
  }, [transport, transportTaxRate]);

  // Addional discount
  const addDiscount = () => {
    setDiscount(true);
  };

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setDiscountAmount(value);
  };

  // Overall Total Amount
  useEffect(() => {
    const validAllAmount = parseFloat(allTotalAmount) || 0;
    const validTotalTransport = parseFloat(totalTransport) || 0;
    const validDiscountAmount = parseFloat(discountAmount) || 0;

    const finalTotalAmount =
      validAllAmount + validTotalTransport - validDiscountAmount;
    setOverallTotalAmount(finalTotalAmount.toFixed(2));
  }, [allTax, allTotalAmount, totalTransport, discountAmount]);

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data from rows
    const data = rows.map((row) => ({
      productNo: row.product_id,
      itemName: row.item,
      hsns: row.hsn,
      quantities: row.quantity,
      disAmt: row.itemDiscountAmount,
      disPer: row.itemDiscountPercent,
      taxRates: row.selectedTax,
      sgsts: row.selectedTax / 2,
      cgsts: row.selectedTax / 2,
      totalAmounts: row.totalAmount,
    }));

    // Combine all data into a single object
    const formData = {
      est_no: `UT/QO/24-25 ${invoiceNumber}`,
      cName: inpVal,
      shipAdd: shippingAddress,
      billAdd: billingAddress,
      quotationDate,
      paymentTerm,
      dueDate,
      taxable_amount: allAmount,
      sgst: allTax / 2,
      cgst: allTax / 2,
      discount: discountAmount,
      freight: transport,
      freight_tax: transportTaxRate,
      freight_total: totalTransport,
      grand_total: overallTotalAmount,
      data, // Send the array directly
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/estimate/addEstimate",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // JSON content type
          },
        }
      );
      console.log("Form submitted successfully:", response.data);
      navigate("/estimate");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <form className="inesback" onSubmit={handleSubmit}>
      <div className="inesbacka">
        <Link to="/estimate" style={{ textDecoration: "none" }}>
          <div className="inesarro">
            <span style={{ fontSize: "30px" }}>&#8592;</span>
          </div>
        </Link>
        <button className="inesa" type="submit">
          Save
        </button>
        {/* <button className="inesb" type="print ">
          Print
        </button> */}
        <ReactToPrint
          trigger={() => <button className="inesb">Save & Print</button>}
          content={() => componentRef.current} // Use the ref with useRef
          // documentTitle="Estimate"

          pageStyle="print"
        />
      </div>
      <hr />
      <div ref={componentRef}>
        <h5>
          <center>
            <strong>Estimate</strong>{" "}
          </center>{" "}
        </h5>
        <hr />

        <div className="print-only-section" style={{ display: "none" }}>
          <div
            style={{
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <h5>ULTRAQUERY TECHNOLOGIES</h5>
            <p>
              ADDRESS: HEAD OFFICE : PLOT NO. A-65, F202 VIGHNAHARTA APT, OPP.
              SANDIPANI SCHOOL, KATOL-WADI RING ROAD, NAGPUR-440013 (MH). Reg.
              Off: Plot No.56, Dhantoli, Katol, Nagpur(MH) Email:
              info@ultraquery.com
            </p>
            <p>
              Phone Number: 8087151660 | PAN Number: BYUPB2582F | GSTIN:
              27BYUPB2582F1ZT
            </p>
          </div>
        </div>

        <div className="inesc">
          <div className="inesd">
            <h5>Bill To</h5>
            <div className="inese">
              {!showDropdown && !searchClicked && (
                <span onClick={handleAddPartyClick}>+ Add Customer</span>
              )}
              {showDropdown && !searchClicked && (
                <div className="scrollable-dropdown">
                <div
                  style={{ padding: "5px", cursor: "pointer", border: "1px solid #ccc"  }}
                  onClick={toggleSearchDropdown}
                >
                  Search party with name and number {showSearchDropdown ? "▼" : "►"}
                </div><br />
                {showSearchDropdown && (
                  <div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleChangeInp(e);
                      }}
                    >
                      <div className="cover-Input">
                        <input className="inesSearch"
                          type="text"
                          value={inpVal}
                          onChange={(e) => handleChangeInp(e)}
                          placeholder="Search Customer Name"
                        />
                        {/* <button type="submit">Search</button> */}
                        <span className="inessearchbtn" onClick={handleSearchButtonClick}>
                          Search
                        </span>

                        <div className="resultData">
                          <ul className="result-data">
                            {tab.map((user) => (
                              <li className="result-dataz"
                                key={user.c_id}
                                onClick={() =>
                                  handleNameClick(
                                    user.c_name,
                                    user.c_billing_add,
                                    user.c_shipping_add
                                  )
                                }
                              >
                                {user.c_id} {user.c_name}
                              </li>
                            ))}
                          </ul>
                          </div>
                        </div>
                      </form>

                      <Link
                        to="/insert_customer"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="inesf">
                          <span className="inesg">+ Create Customer</span>
                        </div>
                      </Link>
                      <br />
                      <div className="inesh" onClick={handleBackClick}>
                        Back
                      </div>
                    </div>
                  )}
                </div>
              )}
              {showSections && (
                <div>
                  <div className="inesha">
                    <div className="ineshb">
                      <span className="ineshc">Bill To</span>
                      <div
                        className="ineshca"
                        onClick={handleChangeCustomerClick}
                      >
                        Change Customer
                      </div>
                      <br />

                      <textarea
                        className="billing-address"
                        value={billingAddress}
                        placeholder="Enter billing address"
                      />
                    </div>
                    <div className="ineshd">
                      <span className="ineshc">Ship To</span>
                      <textarea
                        className="shipping-address"
                        value={shippingAddress}
                        placeholder="Enter shipping address"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="inesi">
            <div className="inesj">
              <div className="inesk">
                <label htmlFor="invoicePrefix">Invoice Prefix:</label>
                <input
                  type="text"
                  id="invoicePrefix"
                  value="UT/QO/24-25"
                  readOnly
                  style={{ width: "100%" }}
                />
              </div>

              <div className="inesk">
                <label htmlFor="invoiceNumber">Invoice Number:</label>
                <input
                  type="text"
                  id="invoiceNumber"
                  value={invoiceNumber}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="ineska">
                <label htmlFor="quotationDate">Quotation Date:</label>
                <input
                  type="date"
                  id="quotationDate"
                  value={quotationDate}
                  onChange={handleQuotationDateChange}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="inesl">
              <div className="inesla">
                <label htmlFor="paymentTerm">Payment Terms:</label>
                <input
                  className="ineslb"
                  type="number"
                  id="paymentTerm"
                  value={paymentTerm}
                  onChange={handlePaymentTermChange}
                />
                <span className="ineslc">days</span>
              </div>
              <div style={{ width: "45%" }}>
                <label htmlFor="dueDate">Due Date:</label>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={handleDueDateChange}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <table className="inesm">
          <thead className="inesma">
            <tr>
              <th className="inesmb">No</th>
              <th className="inesmb">Items</th>
              <th className="inesmb">HSN</th>
              <th className="inesmb">QTY</th>
              <th className="inesmb">Price/Item (₹)</th>
              <th className="inesmb">Tax</th>
              <th className="inesmb">Discount</th>
              <th className="inesmb">Amount (₹)</th>
              <th className="inesmc">+</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="inesmd">{index + 1}</td>
                <td className="inesmd">
                  <input
                    className="inesme"
                    type="text"
                    name="item"
                    value={row.item}
                    onChange={(e) => handleItemInputChange(index, e)}
                  />
                </td>
                <td className="inesmd">
                  <input
                    className="inesme"
                    type="text"
                    name="hsn"
                    value={row.hsn}
                    onChange={(e) => handleItemInputChange(index, e)}
                  />
                </td>
                <td className="inesmd">
                  <input
                    className="inesme"
                    type="number"
                    name="quantity"
                    value={row.quantity}
                    onChange={(e) => handleItemInputChange(index, e)}
                  />
                </td>
                <td className="inesmd">
                  <input
                    className="inesme"
                    type="number"
                    name="amount"
                    value={row.amount}
                    onChange={(e) => handleItemInputChange(index, e)}
                  />
                </td>
                <td className="inesmd">
                  <select
                    className="inesmeaa"
                    type="text"
                    name="selectedTax"
                    value={row.selectedTax}
                    onChange={(e) => handleItemInputChange(index, e)}
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
                </td>
                <td className="inesmd">
                  <div className="input-wrapper">
                    <input
                      className="inesmfzz"
                      type="number"
                      name="itemDiscountPercent"
                      value={row.itemDiscountPercent}
                      onChange={(e) => handleItemInputChange(index, e)}
                      placeholder=""
                    />
                    <span className="input-fix">%</span>
                  </div>
                  <div className="input-wrapper">
                    <input
                      className="inesmfzz"
                      type="number"
                      name="itemDiscountAmount"
                      value={row.itemDiscountAmount}
                      onChange={(e) => handleItemInputChange(index, e)}
                      placeholder=""
                    />
                    <span className="input-fix">₹</span>
                  </div>
                </td>
                <td className="inesmd">
                  <input
                    className="inesmdaa"
                    type="number"
                    name="totalAmount"
                    onChange={(e) => handleItemInputChange(index, e)}
                    value={row.totalAmount}
                  />
                </td>
                <td className="inesmf">
                  <button
                    className="inesmg"
                    onClick={() => handleDeleteItem(index)}
                  >
                    <span className="inesmh">&times;</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="inesn">
          <div className="inesna">
            <div onClick={handleAddItem} style={{ textDecoration: "none" }}>
              + Add Item
            </div>
          </div>
        </div>
        <br />
        <div className="ineso">
          <td className="inesoa">SUBTOTAL </td>
          <td className="inesob">(₹) {allAmount} </td>
          <td className="inesob">(₹) {allTax} </td>
          <td className="inesoc">(₹) {allTotalAmount} </td>
        </div>
        <div className="inesp">
          <div className="inespa">
            <div className="print-only-section" style={{ display: "none" }}>
              <div className="inespz">
                <a className="inespza">+ Add Notes</a>

                <p>Terms And Conditions</p>
                <div className="inespzb">
                  1. 70% Advance With Purchase Order. <br />
                  2. 30% After Delivery Of Order. <br />
                  3. Interest @24%p.a.will be charged if bill is not paid within
                  10 days. <br />
                  4. No warranty on physical burn/damages. <br />
                  5. Subject to Nagpur Court Jurisdiction only. <br />
                  6. Burn/Physical Damage/ Electrical High Voltage Burn/
                  Lightining Not covered in Warranty. <br />
                </div>
                <hr />
                <p>
                  <a className="inespza">
                    <u>Bank Details</u>
                  </a>
                  <br />
                  Account Number: 50200061353004 <br />
                  IFSC Code: HDFC0002126 <br />
                  Bank & Branch Name: HDFC Bank, KATOL <br />
                  Account Holder's Name: ULTRAQUERY TECHNOLOGIES <br />
                  Change Bank Account
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a className="inespzc" href="">
                    Remove Bank Account
                  </a>
                </p>
              </div>
            </div>
            <div className="inespb">
              {transportCharge && (
                <>
                  <div className="inespc">
                    <div className="inespd">Transport Charges</div>
                    <div className="inespe">
                      <div className="inespf">
                        <input
                          className="inespg"
                          type="text"
                          value={transport}
                          onChange={(e) => setTransport(e.target.value)}
                          placeholder=""
                        />
                        <select
                          className="inesph"
                          id="taxRate"
                          value={transportTaxRate}
                          onChange={(e) => setTransportTaxRate(e.target.value)}
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
                  </div>

                  <div className="inesq">
                    <div className="inesqa">Amount incl of tax</div>
                    <div className="inesqb">₹ {totalTransport}</div>
                  </div>
                </>
              )}
              <div className="inesqba" onClick={addAdditional}>
                + Add Additional Charge
              </div>

              <div className="inesq">
                <div className="inesqa">Taxable Amount</div>
                <div className="inesqb">₹ {allAmount}</div>
              </div>
              <div className="inesq">
                <div className="inesqa">SGST@9</div>
                <div className="inesqb">₹ {(allTax / 2).toFixed(2)}</div>
              </div>
              <div className="inesq">
                <div className="inesqa">CGST@9</div>
                <div className="inesqb">₹ {(allTax / 2).toFixed(2)}</div>
              </div>
              <div className="inesq">
                <div className="inesqaa" onClick={addDiscount}>
                  + Add Discount
                </div>
                {discount && (
                  <>
                    <input
                      className="inesqb"
                      type="number"
                      value={discountAmount}
                      onChange={handleDiscountChange}
                    />
                  </>
                )}
              </div>
              <hr />
              <div className="inesrb">
                <div className="inesrc">
                  <b>Total Amount</b>
                </div>
                <div className="inesrd">
                  <b>₹ {overallTotalAmount}</b>
                </div>
              </div>
              <hr />
              <div className="inesrd">
                Authorized signatory for <b>ULTRAQUERY TECHNOLOGIES</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default Insert_estimate;
