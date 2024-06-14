import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Modal.css';

function Customer() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/customer/getCustomer")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  const handleDelete = () => {
    if (deleteCustomerId !== null) {
      axios
        .delete("http://localhost:4000/customer/delete/" + deleteCustomerId)
        .then((res) => {
          if (res.data.Status === "Success") {
            setData(data.filter(item => item.c_id !== deleteCustomerId));
            closeModal();
          } else {
            alert("Error deleting customer");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const openModal = (c_id) => {
    setDeleteCustomerId(c_id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteCustomerId(null);
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
              <h5 className="card-title">Customer Table</h5>
              <table className="table datatable">
                <thead>
                  <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Mobile No.</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.c_name}</td>
                      <td>{item.c_phone}</td>
                      <td>
                        <Link
                          to={`/edit_customer/` + item.c_id}
                          className="btn btn-primary btn-sm me-2"
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={(e) => { e.preventDefault(); openModal(item.c_id); }}
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
          <Link to="/insert_customer" className="btn m-3 btn-primary">
            Add Customer
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

export default Customer;
