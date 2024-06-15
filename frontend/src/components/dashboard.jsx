import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import axios from "axios";
import './Modal.css';

function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/customer/")
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:4000/admin/logout/")
      .then((res) => {
        localStorage.removeItem("authToken");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingRight: "0",
        backgroundColor: "white",
      }}
    >
      <aside
        id="sidebar"
        className="sidebar"
        style={{
          marginBottom: "auto",
          marginTop: "-65px",
          borderRadius: "8px",
          backgroundColor: "black",
        }}
      >
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/customer">
              <i className="bi bi-menu-button-wide"></i>
              <span>Customer</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/item">
              <i className="bi bi-menu-button-wide"></i>
              <span>Item</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/estimate">
              <i className="bi bi-menu-button-wide"></i>
              <span>Estimate</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/estimate">
              <i className="bi bi-menu-button-wide"></i>
              <span>Estimate</span>
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#logout" onClick={(e) => { e.preventDefault(); openModal(); }}>
              <i className="bi bi-box-arrow-in-left"></i>
              <span>Logout</span>
            </a>
          </li>
          {/* Add other menu items as needed */}
        </ul>
      </aside>
      <Outlet />
       {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="logout-overlay" onClick={closeModal}>
          <div id="logoutModal" className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <p>Are you sure you want to logout?</p>
              <div className="modal-buttons">
                <button className="btn btn-primary" onClick={handleLogout}>Yes, Logout</button>
                <button className="btn btn-secondary cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    
    </div>
    
  );
}

export default Dashboard;
