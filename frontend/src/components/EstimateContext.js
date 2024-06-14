import React, { createContext, useState } from 'react';

const EstimateContext = createContext();

const EstimateProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("30");

  return (
    <EstimateContext.Provider value={{ selectedItems, setSelectedItems, addedItems, setAddedItems, allItems, setAllItems, rows, setRows, shippingAddress, setShippingAddress,billingAddress, setBillingAddress, paymentTerm, setPaymentTerm }}>
      {children}
    </EstimateContext.Provider>
  );
};

export { EstimateContext, EstimateProvider };

