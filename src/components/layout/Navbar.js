import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../../css/navbar.css';

const Navbar = () => {
  const [status, changeStatus] = useState(["Login", "Register"]);
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  });
  const logout = () => {
    localStorage.clear();
    changeStatus(["Login", "Register"]);
    axios({
      method: 'post',
      url: 'http://localhost/Team30API/api/logout.php',
      headers: { 'content-type': 'application/json' }
    })
    .then(res =>{
    }) .catch(err =>{ 
      console.log(err);
    })
    navigate("/login");
    window.location.reload(false);
  }
  useEffect(()=>{
    if (localStorage.getItem('username')){
      setUsername(localStorage.getItem('username'));
    }
    axios({
      method: 'post',
      url: 'http://localhost/Team30API/api/navbar.php',
      headers: { 'content-type': 'application/json' },
      data:{Username: username}
    })
    .then(res =>{
      
      if (res.data.status === "admin"){
        changeStatus(["Admin","Logout","Cart"]);
      }else if (res.data.status === "reg"){
        changeStatus(["Logout","Cart"]);
      }else{
        changeStatus(["Login","Register"]);
      }
    }) .catch(err =>{ 
      console.log(err);
    })
  })

  return (
    <div>
      <nav className="z-depth-0">
        <div className="nav-wrapper">
          <Link to="/"><a className="brand-logo">S<span className="material-icons black-icons" id="globe">travel_explore</span>S</a></Link>
          <a href="" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons" id="hamburger">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/"><a>Home</a></Link></li>
            <li><Link to="/about"><a>About</a></Link></li>
            <li><Link to="/products"><a>Products</a></Link></li>
            <li><Link to="/review"><a>Reviews</a></Link></li>
            <li><Link to="/contact"><a>Contact</a></Link></li>
            {status && status.map((tab, id) =>{
              if (tab == "Admin"){
                return (
                  <li key = {id}><Link to="/admin"><a>Admin</a></Link></li>
                );
              } else if (tab == "Logout"){
                return (
                  <li key = {id}><a onClick={logout}>Logout</a></li>
                );
              } else if (tab == "Cart"){
                return (
                  <li key = {id}><Link to="/shoppingcart"><a><i className='material-icons'>shopping_cart</i></a></Link></li>
                );
              } else if (tab == "Login"){
                return (
                  <li key = {id}><Link to="/login"><a>Login</a></Link></li>
                );
              } else if (tab == "Register"){
                return (
                  <li key = {id}><Link to="/register"><a>Register</a></Link></li>
                );
              } 
            })}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/"><a>Home</a></Link></li>
        <li><Link to="/about"><a>About</a></Link></li>
        <li><Link to="/products"><a>Products</a></Link></li>
        <li><Link to="/review"><a>Reviews</a></Link></li>
        <li><Link to="/contact"><a>Contact</a></Link></li>
        {status && status.map((tab, id) =>{
              if (tab == "Admin"){
                return (
                  <li key = {id}><Link to="/admin"><a>Admin</a></Link></li>
                );
              } else if (tab == "Logout"){
                return (
                  <li key = {id}><a onClick={logout}>Logout</a></li>
                );
              } else if (tab == "Cart"){
                return (
                  <li key = {id}><Link to="/shoppingcart"><a><i className='material-icons'>shopping_cart</i></a></Link></li>
                );
              } else if (tab == "Login"){
                return (
                  <li key = {id}><Link to="/login"><a>Login</a></Link></li>
                );
              } else if (tab == "Register"){
                return (
                  <li key = {id}><Link to="/register"><a>Register</a></Link></li>
                );
              } 
            })}
      </ul>
    </div>
  )
}

export default Navbar