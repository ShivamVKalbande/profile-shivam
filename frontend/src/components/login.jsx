import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './assets/img/logo.png';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/vendor/quill/quill.snow.css';
import './assets/vendor/quill/quill.bubble.css';
import './assets/vendor/remixicon/remixicon.css';
import './assets/vendor/simple-datatables/style.css';
import './assets/css/style.css';


function Login() {
  const [values, setValues] = useState({
      username: '',
      password: ''
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:4000/admin/login', values, {
          withCredentials: true,
          crossDomain: true
      })
          .then(res => {
              if (res.data.Status === 'Success') {
                  navigate('/');
              } else {
                  setError(res.data.Error);
              }
          })
          .catch(err => console.log(err));
  };

 

  return (
      <main>
          <div className="container">
              <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                  <div className="container">
                      <div className="row justify-content-center">
                          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                              <div className='text-danger'>
                                  {error && error}
                              </div>
                              <div className="d-flex justify-content-center py-4">
                                  <a href='news.js' className="logo d-flex align-items-center w-auto">
                                      <img src={logo} alt="logo" />
                                      <span className="d-none d-lg-block">Billing App</span>
                                  </a>
                              </div>

                              <div className="card mb-3">
                                  <div className="card-body">
                                      <div className="pt-4 pb-2">
                                          <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                      </div>
                                      <form className="row g-3" 
                                      onSubmit={handleSubmit}
                                      >
                                          <div className="col-12">
                                              <label htmlFor="yourUsername" className="form-label">Username</label>
                                              <input
                                                  type="text"
                                                  name="username"
                                                  onChange={e => setValues({...values, username: e.target.value})}
                                                  className="form-control"
                                                  id="yourUsername"
                                                  required
                                              />
                                          </div>
                                          <div className="col-12">
                                              <label htmlFor="yourPassword" className="form-label">Password</label>
                                              <input
                                                  type="password"
                                                  name="password"
                                                  onChange={e => setValues({...values, password: e.target.value})}
                                                  className="form-control"
                                                  id="yourPassword"
                                                  required
                                              />
                                          </div>
                                          <div className="col-12">
                                              <button className="btn btn-primary w-100" type="submit">Login</button>
                                          </div>
                                      </form>
                                  </div>
                              </div>

                              <div className="credits">
                                  Designed by <a href="">UQ</a>
                              </div>

                          </div>
                      </div>
                  </div>
              </section>
          </div>
      </main>
  );
};

export default Login;

