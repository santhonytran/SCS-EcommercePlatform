import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../../css/invoicecomplete.css';

const InvoiceComplete = () => {
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [branch, setBranch] = useState('');
  const [address, setAddress] = useState('');
  const [car, setCar] = useState('');
  const [orderID, setOrderID] = useState('');
  useEffect(()=>{
      axios({
        method: 'post',
        url: 'http://localhost/Team30API/api/invoice.php',
        headers: { 'content-type': 'application/json' }
      })
      .then(res =>{
        console.log(res.data);
        setDate(res.data.date);
        setPrice(res.data.price);
        setAddress(res.data.address);
        setBranch(res.data.branch);
        setCar(res.data.car);
        setOrderID(res.data.orderID);
      }) .catch(err =>{ 
        console.log(err);
      })
    
  })
  return (
    <div>
      <div id="invoice-container">
        <div id="invoice-box">
            <span><i className="large material-icons">thumb_up</i></span>
            <h1>Thank you! Your order has been recieved.</h1>
            <p>Payment has been confirmed. You will be recieving a confirmation email with order details.</p>
            <p style={{margin:"5px"}}><b style={{color:"#149bbb"}}>Order ID:</b> {orderID}</p>
            <p style={{margin:"5px"}}><b style={{color:"#149bbb"}}>Delivery Date:</b> {date}</p>
            <p style={{margin:"5px"}}><b style={{color:"#149bbb"}}> Total Price:</b> ${price}</p>
            <p style={{margin:"5px"}}><b style={{color:"#149bbb"}}>Branch:</b> {branch}</p>
            <p style={{margin:"5px"}}><b style={{color:"#149bbb"}}>Destination:</b> {address}</p>
            <p style={{margin:"5px"}}><b style={{color:"#149bbb"}}>Car Model:</b> {car}</p>
            <Link to={'/products'}><button className="btn" href="products.php" style={{background: "#149BBB"}}><i className="material-icons left">shopping_basket</i>More Products</button></Link>
        </div>
      </div>
    </div>
  )
}

export default InvoiceComplete;