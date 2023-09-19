import React from 'react'
import '../../css/contact.css';

const Contact = () => {
  return (
    <div>
      <div id="contact-container">
        <div id="contact">
            <h1>Contact <span>Us</span></h1>
            <p><i className="material-icons" style={{color: "#149BBB"}}>email</i><b> Email:</b> helpservices@SCS.ca</p>
            <p><i className="material-icons" style={{color: "#149BBB"}}>local_phone</i><b> Phone:</b> 437-231-2369</p>
            <p><i className="material-icons" style={{color: "#149BBB"}}>location_on</i><b> Main Address:</b> 350 Victoria St, Toronto, ON M5B 2K3</p>
            <p><i className="material-icons" style={{color: "#149BBB"}}>local_printshop</i><b> Fax:</b> 232412</p>
        </div>
          <div id="teaminfo">
              <h1>Our <span>Team</span></h1>
              <div className="infomembers">
                  <h3><u>Anthony Tran</u></h3>
                  <p><i className="material-icons" style={{color: "#149BBB"}}>email</i><b> Email:</b> anthony.h.tran@ryerson.ca</p>
              </div>
              <div className="infomembers">
                  <h3><u>David Tran</u></h3>
                  <p><i className="material-icons" style={{color: "#149BBB"}}>email</i><b> Email:</b> d11tran@ryerson.ca</p>
              </div>
              <div className="infomembers">
                  <h3><u>Sera Wong</u></h3>
                  <p><i className="material-icons" style={{color: "#149BBB"}}>email</i><b> Email:</b> sera.wong@ryerson.ca</p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Contact