import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import '../../css/register.css';

const Register = () => {
  const [regInfo, setReg] = useState({});
  useEffect(()=>{
    if (regInfo !== {}){
    axios({
      method: 'post',
      url: 'http://localhost/Team30API/api/signup.php',
      headers: { 'content-type': 'application/json' },
      data:regInfo
    })
    .then(res =>{
      console.log(res);
      if (res.data.sent){
        localStorage.setItem('username', res.data.session);
        navigate('/')
      }
    }) .catch(err =>{ 
      console.log(err);
    }) }
  })
  const navigate = useNavigate();
  const handleSubmit =  (e) => {
    e.preventDefault();
    if (e.target[0].value !== "" || e.target[1].value !== "" || e.target[2].value !== "" || e.target[2].value.search("@") !== -1 || e.target[3].value !== "" || e.target[4].value !== "" || e.target[5].value !== "" || e.target[6].value !== "" || e.target[7].value !== ""){
      setReg({
        fname: e.target[0].value,
        lname: e.target[1].value,
        email: e.target[2].value,
        phone: e.target[3].value,
        address: e.target[4].value,
        postal: e.target[5].value,
        username: e.target[6].value,
        password: e.target[7].value
      });
    }
    console.log(regInfo)
    axios({
      method: 'post',
      url: 'http://localhost/Team30API/api/signup.php',
      headers: { 'content-type': 'application/json' },
      data:regInfo
    })
    .then(res =>{
      console.log(res);
      if (res.data.sent){
        localStorage.setItem('username', res.data.session);
        navigate('/')
      }
    }) .catch(err =>{ 
      console.log(err);
    })
  }
  return (
    <div>
      <div id="register">
        <div id="regarea">
            <h1>Create an <span>Account</span></h1>
            <form onSubmit={handleSubmit}>
                <label for="fname" style={{width:"90%"}}>First Name</label><br/>
                <input className="register-input" id="fname bar" type="text" name = "fname" style={{width:"90%"}}  required/><br/>
                <label for="lname" style={{width:"90%"}}>Last Name</label><br/>
                <input className="register-input" id="lname bar" type="text" name = "lname" style={{width:"90%"}}  required/><br/>
                <label for="email" style={{width:"90%"}}>Email</label><br/>
                <input className="register-input" id="email bar" type="email" name = "email" style={{width:"90%"}} required/><br/>
                <label for="phone" style={{width:"90%"}}>Phone Number</label><br/>
                <input className="register-input" id="phone bar" type="tel" name = "phone" style={{width:"90%"}} required/><br/>
                <label for="address" style={{width:"90%"}}>Address</label><br/>
                <input className="register-input" id="address bar" type="text" name = "address" style={{width:"90%"}}  required/><br/>
                <label for="postal" style={{width:"90%"}}>Postal Code</label><br/>
                <input className="register-input" id="postal bar" type="text" name = "postal" style={{width:"90%"}} required/><br/>
                <label for="username" style={{width:"90%"}}>Username</label><br/>
                <input className="register-input" id="username bar" type="text" name = "username" style={{width:"90%"}} required/><br/>
                <label for="password" style={{width:"90%"}}>Password</label><br/>
                <input className="register-input" id="password bar" type="password" name="password" style={{width:"90%"}}   required/><br/>
                <span className="helper-text" data-error="wrong" data-success="right">Already have an account? <Link to="/login"><a><u>Sign in</u></a></Link></span><br/>
                <button className="btn save-button" type="submit" name="signin" style={{margintop:"30px",background:"#149BBB"}}>Create Account
                    <i className="material-icons right">send</i>
                </button><br/>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register