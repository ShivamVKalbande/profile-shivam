import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Modal.css';


function Item() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // Fetch news data from API endpoint
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
        console.error("Error fetching item Data:", error);
      });
  }, []);

  const handleDelete = () => {
    if (deleteId !== null) {
      axios
        .delete("http://localhost:4000/product/delete/" + deleteId)
        .then((res) => {
          if (res.data.Status === "Success") {
            setData(data.filter(item => item.p_id !== deleteId));
            closeModal();
          } else {
            alert("Error deleting customer");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const openModal = (p_id) => {
    setDeleteId(p_id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  return (
    <section className="section">
      <div className="row">
        <div
          className="col-12"
          style={{
            margin: "0px 40px 0px auto",
            flex: 1,
            paddingLeft: "350px",
            paddingTop: "30px",
          }}
        >
          <div className="card">
            <div
              className="card-body"
              style={{ border: "1px solid black", padding: "20px" }}
            >
              <h5 className="card-title">Item Table</h5>
              <table className="table datatable">
                <thead>
                  <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Sales Price</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody
                //  ref={componentRef}
                >
                  {data.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.p_name}</td>
                      <td>{item.p_selling_price}</td>
                      {/* Add Delete and Update buttons */}
                      <td>
                        <Link
                          to={`/edit_item/` + item.p_id}
                          className="btn btn-primary btn-sm me-2"
                        >
                          edit
                        </Link>
                      </td>
                      <td>
                      <button
                          onClick={(e) => { e.preventDefault(); openModal(item.p_id); }}
                          className="btn btn-primary btn-sm me-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Add "Add New News" button */}
          <Link to="/insert_item" className="btn m-3 btn-primary">
            Add Item
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <div className="logout-overlay" onClick={closeModal}>
          <div id="deleteModal" className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <p>Are you sure you want to delete?</p>
              <div className="modal-buttons">
                <button className="btn btn-primary" onClick={handleDelete}>Yes, Delete</button>
                <button className="btn btn-secondary cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Item;
