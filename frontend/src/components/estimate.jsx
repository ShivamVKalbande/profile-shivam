import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Modal.css';

function Estimate() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteEstimateId, setDeleteEstimateId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/estimate/getEstimate")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        console.error("Error fetching estimate data:", error);
      });
  }, []);

  const handleDelete = () => {
    if (deleteEstimateId !== null) {
      axios
        .delete("http://localhost:4000/estimate/delete/" + deleteEstimateId)
        .then((res) => {
          if (res.data.Status === "Success") {
            setData(data.filter(item => item.est_id !== deleteEstimateId));
            closeModal();
          } else {
            alert("Error deleting Estimate");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const openModal = (est_id) => {
    setDeleteEstimateId(est_id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteEstimateId(null);
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
              <h5 className="card-title">Estimate Table</h5>
              <table className="table datatable">
                <thead>
                  <tr>
                    <th scope="col">Estimate Date</th>
                    <th scope="col">Estimate No.</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Edit</th> 
                    <th scope="col">Delete</th> 
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td><Link to="/estimate_view" >{item.est_date}</Link></td>
                      <td><Link to="/estimate_view" >{item.est_no}</Link></td>
                      <td><Link to="/estimate_view" >{item.est_customer_name}</Link></td>
                      <td><Link to="/estimate_view" >{item.est_grand_total}</Link></td>
                      {/* <td>{item.est_date}</td>
                      <td>{item.est_valid_date}</td> */}
                      <td>
                        <Link
                          to={`/edit_estimate/` + item.est_id}
                          className="btn btn-primary btn-sm me-2"
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={(e) => { e.preventDefault(); openModal(item.est_id); }}
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
          <Link to="/insert_estimate" className="btn m-3 btn-primary">
            Add Estimate
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

export default Estimate;
