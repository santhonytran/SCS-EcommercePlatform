import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/greyfooter.css';

const Footer = () => {
  return (
    <div>
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 ><span className="highlight">Smart</span> Customer <span className="highlight">Services</span></h5>
              <p>Providing green delivery services around the world. We serve in over 50 countries and more than 
                500 customers worldwide. SCS is always looking to improve and expand on our green solution.
              </p>
            </div>
            <div className="col l4 offset-l2 s12 quicklinks">
              <h5 ><span className="highlight">Quick</span> links</h5>
              <ul>
                <li><Link to="/"><a>Home</a></Link></li>
                <li><Link to="/about"><a>About</a></Link></li>
                <li><Link to="/products"><a>Products</a></Link></li>
                <li><Link to="/review"><a>Reviews</a></Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
          Copyright © 2022 <span class="highlight">Smart</span> Customer <span className="highlight">Services</span>
          <Link to="/contact"><a className="right" style={{color: "#FDFDFF"}}><span className="highlight">Questions? </span><u>Contact us!</u></a></Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer