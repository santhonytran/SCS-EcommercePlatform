import React, {useState} from 'react'
import axios from 'axios';
import '../../css/search.css';

const Search = () => {
  const [search, changeSearch] = useState();
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(e.target[0].id);
    if (e.target[0].id === "userid"){
      axios({
        method: 'post',
        url: 'http://localhost/Team30API/api/search.php',
        headers: { 'content-type': 'application/json' },
        data:{userid: e.target[0].value}
      })
      .then(res =>{
        if (res.data.sent){
          changeSearch(res.data.rows);
        }
      }) .catch(err =>{ 
        console.log(err);
      })
    }else if (e.target[0].id === "orderid"){
      axios({
        method: 'post',
        url: 'http://localhost/Team30API/api/search.php',
        headers: { 'content-type': 'application/json' },
        data:{orderid: e.target[0].value}
      })
      .then(res =>{
        if (res.data.sent){
          changeSearch(res.data.rows);
        }
      }) .catch(err =>{ 
        console.log(err);
      })
    }
  }
  return (
    <div>
      <div id="searchbox">
        <div id="headings">
            <h1>Order <span>Tracking</span></h1>
        </div>
        <form onSubmit={handleSubmit}>
            <label for="userid">User ID</label><br/>
            <input type="text" id="userid" name="userid" style={{color:"black"}}/><br/>
            <button className="btn track-button" type="submit" name="track" style={{margintop:"30px",background:"#149BBB"}}>Search
                <i className="material-icons right">send</i>
            </button><br/>
        </form>
        <form onSubmit={handleSubmit}>
            <label for="orderid">Order ID</label><br/>
            <input type="text" id="orderid" name="orderid" style={{color:"black"}}/><br/>
            <button className="btn track-button" type="submit" name="trackOrder" style={{margintop:"30px",background:"#149BBB"}}>Search
                <i className="material-icons right">send</i>
            </button><br/>
        </form>
        <div>
          <table className='responsive-table striped centered'>
              <thead>
              <tr>
                  <th>Order Id</th>
                  <th>Date Issued</th>
                  <th>Date Completed</th>
                  <th>Order Price</th>
              </tr>
              </thead>
              <tbody>
                {search && search.map((row) =>{
                  return (
                    <tr>
                      <td>{row.order_id}</td>
                      <td>{row.date_issued}</td>
                      <td>{row.date_completed}</td>
                      <td>{row.order_price}</td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
          </div>
      </div>
    </div>
  )
}

export default Search;