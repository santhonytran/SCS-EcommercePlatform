import React from 'react'
import '../../css/about.css';
import david from '../../img/david.png';
import sera from '../../img/sera.png';
import anthony from '../../img/anthony.png';

const About = () => {
  return (
    <div>
      <div id="about-desc">
        <h1>Our <span>Goal</span></h1>
        <p>We strive to make online shopping easier, more accessible, and environmentally friendly. We provide smart green delivery services for the products on our website to help reduce your stress and frustration.</p>
        </div>
        <div id="about-team">
            <h1>Meet Our <span>Team</span></h1>
            <div id="team">
                <div className="members">
                    <img src={anthony} alt="Anthony" width="200" height="200"/>
                    <h3>Anthony Tran</h3>
                </div>
                <div className="members">
                    <img src={david}alt="David" width="200" height="200"/>
                    <h3>David Tran</h3>
                </div>
                <div className="members">
                    <img src={sera} alt="Sera" width="200" height="200"/>
                    <h3>Sera Wong</h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About