import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { EstimateContext } from "./EstimateContext";
import "./Modal.css";

function Insert_estimate() {
  const { selectedItems } = useContext(EstimateContext);
  const [allItems, setAllItems] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const insetSelectedItems = Array.isArray(selectedItems)
      ? selectedItems
      : [selectedItems];
    setAllItems(insetSelectedItems);
  }, [selectedItems]);

  // console.log(allItems);

  useEffect(() => {
    const newRows = allItems.map((item, index) => ({
      id: index + 1,
      item: item.name,
      hsn: item.code,
      quantity: item.quantity,
      amount: item.salesPrice,
      selectedTax: item.selectedTax,
      totalAmount: calculateTotal(
        item.quantity,
        item.salesPrice,
        item.selectedTax
      ),
    }));
    setRows(newRows);
  }, [allItems]);

  const calculateTotal = (quantity, amount, selectedTax) => {
    const total = quantity * amount;
    const tax = total * (parseFloat(selectedTax) / 100);
    return (total + tax).toFixed(2);
  };

  const handleItemInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;

    // Recalculate the total amount for the changed row
    const { quantity, amount, selectedTax } = newRows[index];
    newRows[index]["totalAmount"] = calculateTotal(
      quantity,
      amount,
      selectedTax
    );

    setRows(newRows);
  };

  const handleDeleteItem = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleAddItem = () => {
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
  };

  return (
    <div className="inesback">
      <Link to="/estimate" style={{ textDecoration: "none" }}>
        <div className="inesarro">
          <span style={{ fontSize: "30px" }}>&#8592;</span>
        </div>
      </Link>

      <table className="inesm">
        <thead className="inesma">
          <tr>
            <th className="inesmb">No</th>
            <th className="inesmb">Items</th>
            <th className="inesmb">HSN</th>
            <th className="inesmb">QTY</th>
            <th className="inesmb">Price/Item (₹)</th>
            <th className="inesmb">Tax</th>
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
                <input
                  className="inesme"
                  type="text"
                  name="selectedTax"
                  value={row.selectedTax}
                  onChange={(e) => handleItemInputChange(index, e)}
                />
              </td>
              <td className="inesmd">
                <input type="number" value={row.totalAmount} />
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
          <Link
            to="/estimate_item"
            onClick={handleAddItem}
            style={{ textDecoration: "none" }}
          >
            + Add Item
          </Link>
        </div>
      </div>
      <br />
    </div>
  );
}
export default Insert_estimate;
