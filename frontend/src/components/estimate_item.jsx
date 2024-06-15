// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useContext,
// } from "react";
// import Table from 'react-bootstrap/Table';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { EstimateContext } from "./EstimateContext.js";
// import "./Modal.css";

// const EstimateItem = () => {
//   const [data, setData] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [inpItem, setInpItem] = useState("");
//   const {
//     setSelectedItems: setGlobalSelectedItems,
//     selectedItems: selectedItemsGlobal,
//     //addedItems,
//     //setAddedItems,
//   } = useContext(EstimateContext);
//   const navigate = useNavigate();
//   const [search, setSearch] = useState('');
//   const CategoryDropdown = ({ selectedCategory, setSelectedCategory }) => {
//     const handleSelect = (eventKey, event) => {
//       setSelectedCategory(event.target.text);
//     };

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/product/getProduct")
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           setData(res.data.Result);
//         } else {
//           alert("Error");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching product data:", error);
//       });
//   }, []);

//   const handleCheckboxChange = useCallback((item) => {
//     setSelectedItems((prevSelected) =>
//       prevSelected.includes(item)
//         ? prevSelected.filter((i) => i !== item)
//         : [...prevSelected, item]
//     );
//   }, []);

//   const handleQuantityChange = useCallback((item, amount) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [item]: Math.max((prevQuantities[item] || 0) + amount, 0),
//     }));
//   }, []);

//   const getTotalAmount = useMemo(() => {
//     return selectedItems.reduce((total, item) => {
//       const quantity = quantities[item] || 0;
//       const itemData = data.find((i) => i.p_name === item);
//       const purchasePrice = itemData ? itemData.p_purchase_price || 0 : 0;
//       return total + purchasePrice * quantity;
//     }, 0);
//   }, [selectedItems, quantities, data]);

//   const handleDoneClick = () => {
//     const selectedData = selectedItems.map((item) => {
//       const itemData = data.find((i) => i.p_name === item);
//       return {
//         name: item,
//         code: itemData.p_hsn_code,
//         salesPrice: itemData.p_selling_price,
//         purchasePrice: itemData.p_purchase_price,
//         currentStock: itemData.p_opening_stock,
//         quantity: quantities[item] || 1,
//         selectedTax: itemData.p_master_tax,
//         productId: itemData.product_id,
//       };
//     });

//     console.log("Selected data", selectedData);

//     setGlobalSelectedItems([...selectedItemsGlobal, ...selectedData]);
//     // setAddedItems((i)=> [...i.flat(Infinity), sec])
//     // console.log(addedItems);

//     navigate("/insert_estimate");
//   };

//   // console.log(data);

//   return (
//     <div className="esit">
//       <h5>Add Items</h5> <hr />
//       <div className="input-group">
//       <Form>
//           <InputGroup className='my-3'>
//             {/* onChange for search */}
//             <Form.Control
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder='Search products'
//             />
//           </InputGroup>
//         </Form>
//         <Dropdown className="d-inline mx-4">
//       <Dropdown.Toggle id="dropdown-autoclose-true">
//         {selectedCategory}
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item onClick={handleSelect} value="it">IT</Dropdown.Item>
//         <Dropdown.Item onClick={handleSelect} value="cctv">CCTV</Dropdown.Item>
//         <Dropdown.Item onClick={handleSelect} value="hardware">Hardware</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//         <button className="create-new-item"> <Link to="/insert_item" >+ Create New Item</Link> </button>
//       </div>
//       <Table bordered hover className="items-table">
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Item Code</th>
//             <th>Category</th>
//             <th>Sales Price</th>
//             <th>Purchase Price</th>
//             <th>Current Stock</th>
//             <th>Quantity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {data.map((item) => ( */}
//           {data
//               .filter((item) => {
//                 return search.toLowerCase() === ''
//                   ? item
//                   : item.p_name.toLowerCase().includes(search);
//               })
//               .map((item, index) => (
//             <tr key={item.p_name}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedItems.includes(item.p_name)}
//                   onChange={() => handleCheckboxChange(item.p_name)}
//                   aria-label={`Select ${item.p_name}`}
//                 />
//                 {item.p_name}
//               </td>
//               <td>{item.p_hsn_code}</td>
//               <td>{item.p_category}</td>
//               <td>₹{item.p_selling_price}</td>
//               <td>₹{item.p_purchase_price}</td>
//               <td>{item.p_opening_stock}</td>
//               <td>
//                 <button
//                   onClick={() => handleQuantityChange(item.p_name, -1)}
//                   disabled={(quantities[item.p_name] || 0) <= 0}
//                   aria-label={`Decrease quantity of ${item.p_name}`}
//                 >
//                   -
//                 </button>
//                 {quantities[item.p_name] || 1}
//                 <button
//                   onClick={() => handleQuantityChange(item.p_name, 1)}
//                   aria-label={`Increase quantity of ${item.p_name}`}
//                 >
//                   +
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <div className="summary">
//         <div className="total-amount">Total Amount: ₹{getTotalAmount}</div>
//         <div className="selected-items-count">
//           Selected Items: {selectedItems.length}
//         </div>
//         <button className="done-button" onClick={handleDoneClick}>
//           Done
//         </button>
//         <button className="cancel-button">
//           <Link to="/insert_estimate" style={{ textDecoration: "none" }}>
//             <span style={{ color: "black" }}>Cancel</span>
//           </Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EstimateItem;
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EstimateContext } from "./EstimateContext.js";
import "./Modal.css";

const EstimateItem = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Select Category");

  const {
    setSelectedItems: setGlobalSelectedItems,
    selectedItems: selectedItemsGlobal,
  } = useContext(EstimateContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/product/getProduct")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const handleCheckboxChange = useCallback((item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  }, []);

  const handleQuantityChange = useCallback((item, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item]: Math.max((prevQuantities[item] || 0) + amount, 0),
    }));
  }, []);

  const getTotalAmount = useMemo(() => {
    return selectedItems.reduce((total, item) => {
      const quantity = quantities[item] || 0;
      const itemData = data.find((i) => i.p_name === item);
      const purchasePrice = itemData ? itemData.p_purchase_price || 0 : 0;
      return total + purchasePrice * quantity;
    }, 0);
  }, [selectedItems, quantities, data]);

  const handleDoneClick = () => {
    const selectedData = selectedItems.map((item) => {
      const itemData = data.find((i) => i.p_name === item);
      return {
        name: item,
        code: itemData.p_hsn_code,
        salesPrice: itemData.p_selling_price,
        purchasePrice: itemData.p_purchase_price,
        currentStock: itemData.p_opening_stock,
        quantity: quantities[item] || 1,
        selectedTax: itemData.p_master_tax,
        productId: itemData.product_id,
      };
    });

    console.log("Selected data", selectedData);

    setGlobalSelectedItems([...selectedItemsGlobal, ...selectedData]);

    navigate("/insert_estimate");
  };

  const CategoryDropdown = ({ selectedCategory, setSelectedCategory }) => {
    const handleSelect = (eventKey) => {
      setSelectedCategory(eventKey);
    };

    return (
      <Dropdown onSelect={handleSelect} className="d-inline mx-4">
        <Dropdown.Toggle id="dropdown-autoclose-true">
          {selectedCategory}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="IT">IT</Dropdown.Item>
          <Dropdown.Item eventKey="cctv">CCTV</Dropdown.Item>
          <Dropdown.Item eventKey="hardware">Hardware</Dropdown.Item>
          <Dropdown.Item eventKey="">ALL</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div className="esit">
      <h5>Add Items</h5>
      <hr />
      <div className="input-group">
        <Form>
          <InputGroup className="my-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
            />
          </InputGroup>
        </Form>
        <CategoryDropdown
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <button className="create-new-item"> <Link to="/insert_item" >+ Create New Item</Link> </button>
        
      </div>
      <Table bordered hover className="items-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Code</th>
            <th>Category</th>
            <th>Sales Price</th>
            <th>Purchase Price</th>
            <th>Current Stock</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
        {data
            .filter((item) => {
              const matchesCategory =
                selectedCategory === "Select Category" ||
                selectedCategory === "" ||
                item.p_category.toLowerCase() === selectedCategory.toLowerCase();
              const matchesSearch =
                search.toLowerCase() === "" ||
                item.p_name.toLowerCase().includes(search.toLowerCase());
              return matchesCategory && matchesSearch;
            })
            .map((item) => (
              <tr key={item.p_name}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.p_name)}
                    onChange={() => handleCheckboxChange(item.p_name)}
                    aria-label={`Select ${item.p_name}`}
                  />
                  {item.p_name}
                </td>
                <td>{item.p_hsn_code}</td>
                <td>{item.p_category}</td>
                <td>₹{item.p_selling_price}</td>
                <td>₹{item.p_purchase_price}</td>
                <td>{item.p_opening_stock}</td>
                <td className="btnpm">
                <div className="quantity-control">
                  <div className="btnpp"
                    onClick={() => handleQuantityChange(item.p_name, -1)}
                    disabled={(quantities[item.p_name] || 0) <= 0}
                    aria-label={`Decrease quantity of ${item.p_name}`}
                  >
                    -
                  </div>
                  <span className="quantity-display">
                  {quantities[item.p_name] || 1}
                  </span>
                  <div className="btnmm"
                    onClick={() => handleQuantityChange(item.p_name, 1)}
                    aria-label={`Increase quantity of ${item.p_name}`}
                  >
                    +
                  </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="summary">
        <div className="total-amount">Total Amount: ₹{getTotalAmount}</div>
        <div className="selected-items-count">
          Selected Items: {selectedItems.length}
        </div>
        <Button className="done-button" onClick={handleDoneClick}>
          Done
        </Button>
        <Button className="cancel-button">
          <Link to="/insert_estimate" style={{ textDecoration: "none" }}>
            <span style={{ color: "black" }}>Cancel</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EstimateItem;
