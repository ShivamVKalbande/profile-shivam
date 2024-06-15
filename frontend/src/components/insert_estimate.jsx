import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EstimateContext } from "./EstimateContext";
import "./Modal.css";

function Insert_estimate() {
  const navigate = useNavigate();
  const { selectedItems, allItems, rows, setAllItems, setRows } = useContext(EstimateContext);

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

  const calculateTotal = (quantity, amount, selectedTax, itemDiscountAmount) => {
    const total = quantity * amount - itemDiscountAmount;
    const tax = total * (parseFloat(selectedTax) / 100);
    return (total + tax).toFixed(2);
  };

  useEffect(() => {
    let subtotal = 0;
    let totalTax = 0;
    let totalAmount = 0;

    rows.forEach(row => {
      const rowTotal = parseFloat(row.totalAmount);
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

  const handleAddItem = () => {
    navigate("/estimate_item");
  };

  const addAdditional = () => {
    setTransportCharge(true);
  };

  const calculateTotalTransport = () => {
    const transportValue = parseFloat(transport) || 0;
    const taxRateValue = parseFloat(transportTaxRate) || 0;
    const total = transportValue + (transportValue * taxRateValue) / 100;
    setTotalTransport(total.toFixed(2));
  };

  useEffect(() => {
    calculateTotalTransport();
  }, [transport, transportTaxRate]);

  const addDiscount = () => {
    setDiscount(true);
  };

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setDiscountAmount(value);
  };

  useEffect(() => {
    const validAllAmount = parseFloat(allTotalAmount) || 0;
    const validTotalTransport = parseFloat(totalTransport) || 0;
    const validDiscountAmount = parseFloat(discountAmount) || 0;

    const finalTotalAmount = validAllAmount + validTotalTransport - validDiscountAmount;
    setOverallTotalAmount(finalTotalAmount.toFixed(2));
  }, [allTax, allTotalAmount, totalTransport, discountAmount]);

  return (
    <form className="inesback">
      <div className="inesbacka">
        <Link to="/estimate" style={{ textDecoration: "none" }}>
          <div className="inesarro">
            <span style={{ fontSize: "30px" }}>&#8592;</span>
          </div>
        </Link>
        <button className="inesa" type="submit">
          Save
        </button>
        
      </div>
      <hr />
      
        <h5>
          <center>
            <strong>Estimate</strong>{" "}
          </center>{" "}
        </h5>
        <hr />
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
      
    </form>
  );
}
export default Insert_estimate;
