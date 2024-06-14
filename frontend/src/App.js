import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Insert_customer from './components/insert_customer';
import Edit_customer from './components/edit_customer';
import Customer from './components/customer';
import Dashboard from './components/dashboard';
import Item from './components/item';
import Insert_item from './components/insert_item';
import Edit_item from './components/edit_item';
import Test from './components/test';
import Estimate from './components/estimate';
import Insert_estimate from './components/insert_estimate';
import Edit_estimate from './components/edit_estimate';
import Estimate_item from './components/estimate_item';
import Estimate_view from './components/estimate_view';
import { EstimateProvider } from './components/EstimateContext';

function App() {
  return (
    
    <BrowserRouter>
    <EstimateProvider>
      <Routes>
      <Route path='/' element={<Dashboard />}>
      <Route path='/insert_customer' element={<Insert_customer />}></Route>
      <Route path='/edit_customer/:c_id' element={<Edit_customer />}></Route>
      <Route path='/customer' element={<Customer />}></Route>
      <Route path='/item' element={<Item />}></Route>
      <Route path='/edit_item/:p_id' element={<Edit_item />}></Route>
      <Route path='/insert_item' element={<Insert_item />}></Route>
      <Route path='/estimate' element={<Estimate />}></Route>
      <Route path='/insert_estimate' element={<Insert_estimate />}></Route>
      <Route path='/edit_estimate/:est_id' element={<Edit_estimate />}></Route>
      <Route path='/estimate_view' element={<Estimate_view />}></Route>
     <Route path='/estimate_item' element={<Estimate_item />}></Route>
      
      </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/test' element={<Test />}></Route>
      </Routes>
      </EstimateProvider>
    </BrowserRouter>
  );
}

export default App;
