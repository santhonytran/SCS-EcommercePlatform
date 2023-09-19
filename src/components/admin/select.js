import React, {useState,useEffect} from 'react';
import axios from 'axios';
import '../../css/select.css';

const Select = () => {
    const [tables, setTables] = useState("");
    const [tableData, setTableData] = useState([]);
   
    useEffect(()=>{
      if (tableData[0]){
        var insert="";
        var tableCol =[];
        tableCol = (Object.keys(tableData[0]));
        for(let i=0;i<tableCol.length;i++){
          insert += "<th>" + tableCol[i] + "</th>"
        }
        document.getElementById("colname").innerHTML = insert;
      }
    },[tableData])

    const handleSubmit =  (e) => {
      e.preventDefault();
      if (tables != ""){
        axios({
          method: 'post',
          url: 'http://localhost/Team30API/api/select.php',
          headers: { 'content-type': 'application/json' },
          data:tables
        })
        .then(res =>{
          setTableData(res.data);
        }) .catch(err =>{ 
          console.log(err);
        })
      }
    }
    return (
      <div>
        <div id="insertheight-div">
          <div className="container">
              <div className="row">
                  <h1 id="title">Database <span className="highlight">Administration</span></h1>
                  <h2 id="title2">Select data below</h2>
              </div>
              <div className="row table_select">
              <form onSubmit={handleSubmit}>
                  <div className="col s8 m6 offset-m3" onChange={(e)=> {
                    const selectedTable = e.target.value;
                    setTables(selectedTable)
                  }}>
                      <select className="browser-default choice" id="selection" name="tablename">
                      <option disabled selected>Select table</option>
                      <option value="branch">Branch</option>
                      <option value="car">Car</option>
                      <option value="orders">Orders</option>
                      <option value="product">Product</option>
                      <option value="review">Review</option>
                      <option value="shopping">Shopping</option>
                      <option value="trip">Trip</option>
                      <option value="users">Users</option>
                      </select>
                  </div>
                  <div className="col s1 m3">
                  <button className="btn save-button" type="submit" name="tables_submit" style={{background:"#149BBB"}}>Select</button>
                  </div>
              </form>
              </div>  
          </div>
          <table className='responsive-table striped centered'>
            <thead>
              <tr id="colname">
              </tr>
            </thead>
            <tbody id="insertData">
                  {
                    tableData.map((item, tableindex) => {
                      const tableCol = (Object.keys(tableData[0]));
                      return (
                        <tr>
                          {
                            tableCol.map((col, index) => {
                              return <td>{tableData[tableindex][tableCol[index]]}</td>
                            })
                          }
                        </tr>
                      )
                    })
                  }
            </tbody>
          </table>
      </div>
    </div>
    )
  }
  
  export default Select