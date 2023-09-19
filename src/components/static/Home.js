import React from 'react';
import {Link} from 'react-router-dom';
import '../../css/home.css';
import eCommerce from '../../img/homeimg.svg';
import questions from '../../img/question.svg';


const Home = () => {
  return (
    <div>
      <div id="searchcontainer">
        <p style={{color:"#FDFDFF", fontWeight:"600", textAlign:"center", background:"#149BBB"}}>15% Off Sale Storewide!</p>
        <a className="searchbtn" href="/search" ><i className="material-icons" style={{color:"#393D3F"}}>search</i></a>
      </div>
      <div id="home">
          <div id ="home-info">
              <h1>Welcome to <span className="highlight">Smart Customer Services.</span></h1>
              <h2>Learn more about our Products and Services.</h2>
              <Link to={'/products'}><button className="btn" href="/products" style={{background: "#149BBB"}}><i className="material-icons left">shopping_basket</i>Products</button></Link>
          </div>
          <img src={eCommerce} alt="Ecommerce" width="400" height="400"/>
      </div>
      <div id = "about-sec">
          <div id = "about-area">
              <h2>Want to learn more about <span className="highlight">us?</span></h2>
              <Link to={'/about'}><button className="btn" href="/about" style={{background: "#149BBB"}}><i className="material-icons left">assignment</i>About Us</button></Link>
          </div>  
      </div>
      <div id="contact-sec">
          <div id= "contact-area">
              <h1>Got any <span className="highlight">questions?</span></h1>
              <h2>Find our contact information here.</h2>
              <Link to={'/contact'}><button className="btn" href="/contact" style={{background: "#149BBB"}}><i className="material-icons left">question_answer</i>Contact Us</button></Link>
          </div>
          <img src={questions} style={{borderradius:"5px"}} alt="Contact-Us" width="400" height="400"/>
      </div>
    </div>
  )
}

export default Home;