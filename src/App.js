import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/static/Home';
import About from './components/static/About';
import Contact from './components/static/Contact';
import Review from './components/review/Review';
import Products from './components/shopping/Products';
import InvoiceComplete from './components/shopping/InvoiceComplete';
import ShoppingCart from './components/shopping/ShoppingCart';
import Search from './components/static/Search';
import Login from './components/validation/Login';
import Register from './components/validation/Register';
import Select from './components/admin/select';
import Admin from './components/admin/admin';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/review' element={<Review/>}></Route>
        <Route path='/invoice' element={<InvoiceComplete/>}></Route>
        <Route path='/shoppingcart' element={<ShoppingCart/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/select' element={<Select/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
