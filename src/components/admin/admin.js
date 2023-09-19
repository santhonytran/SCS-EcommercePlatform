import React from 'react';
import '../../css/admin.css';
import { Link } from 'react-router-dom';
const admin = () => {
  return (
    <div id="admin">
        <h1>Database <span>Maintain</span></h1>
        <a target="_blank" href='http://localhost/phpmyadmin/'><button className="btn" href="/products" style={{background: "#149BBB"}}>Insert</button></a>
        <Link to={'/select'}><button className="waves-effect waves-light btn" href="/products" style={{background: "#149BBB"}}>Select</button></Link>
        <a target="_blank" href='http://localhost/phpmyadmin/'><button className="btn" href="/products" style={{background: "#149BBB"}}>Delete</button></a>
        <a target="_blank" href='http://localhost/phpmyadmin/'><button className="btn" href="/products" style={{background: "#149BBB"}}>Update</button></a>
    </div>
  )
}

export default admin