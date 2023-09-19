import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import '../../css/login.css';

const Login = () => {
  const [loginInfo, setLogin] = useState({});
  useEffect(()=>{
    if (loginInfo !== {}){
      axios({
        method: 'post',
        url: 'http://localhost/Team30API/api/loginval.php',
        headers: { 'content-type': 'application/json' },
        data:loginInfo
      })
      .then(res =>{
        console.log(res);
        if (res.data.sent){
          localStorage.setItem('username', res.data.session);
          navigate('/');
        }
      }) .catch(err =>{ 
        console.log(err);
      })
    }
  },[loginInfo])
  const navigate = useNavigate();
  const handleSubmit =  (e) => {
    e.preventDefault();
    setLogin({
      username: e.target[0].value,
      password: e.target[1].value
    });
    console.log(loginInfo)
    axios({
      method: 'post',
      url: 'http://localhost/Team30API/api/loginval.php',
      headers: { 'content-type': 'application/json' },
      data:loginInfo
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
      <div id="login">
        <div id="loginarea">
            <h1>Sign <span>In</span></h1>
            <form onSubmit={handleSubmit}>
                <label for="username" style={{width:"90%"}}>Username</label>
                <input className="login-input" id="username bar" type="text" name = "username" style={{width:"90%"}}  required/><br/>
                <label for="password" style={{width:"90%"}}>Password</label>
                <input className="login-input" id="password bar" type="password" name="password" style={{width:"90%"}}  required/><br/>
                <span className="helper-text" data-error="wrong" data-success="right">Don't have an account? <Link to="/register"><a><u>Create an Account</u></a></Link></span><br/>
                <button className="btn save-button" type="submit" name="signin" style={{margintop:"30px",background:"#149BBB"}}>Sign In
                    <i className="material-icons right">send</i>
                </button><br/>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Login;
