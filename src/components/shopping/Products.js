import React, { useState, useEffect } from "react";
import "../../css/products.css";
import axios from "axios";

const Products = () => {
  const [tableData, setTableData] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const LOCAL_STORAGE_KEY = "cart";
  var cartCount = 0;
  console.log(cart);

  useEffect(() => {
    generateProducts();
    const storedCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedCart) setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  function generateProducts() {
    axios({
      method: "post",
      url: "http://localhost/Team30API/api/select.php",
      headers: { "content-type": "application/json" },
      data: "product",
    })
      .then((res) => {
        setTableData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function cartBtn(id) {
    setCart((oldCart) => [...oldCart, id]);
  }

  function removeCart(id) {
    let str = id.target.id;
    let removeTarget = str.substring(str.length - 1);
    const newCart = cart.filter((ele, i) => i != removeTarget - 1);
    setCart(newCart);
  }

  return (
    <div>
      <div class="row">
        <div class="col s12 m12 l8">
          <h1>Products</h1>
          <div id="productlist">
            {tableData.map((item, tableindex) => {
              const tableCol = Object.keys(tableData[0]);
              const counter = tableData[tableindex][tableCol[0]];
              const name = tableData[tableindex][tableCol[1]];
              const price = tableData[tableindex][tableCol[2]];
              const imgurl = tableData[tableindex][tableCol[3]];

              const img = "http://localhost/Team30API/" + imgurl;
              return (
                <div class="card" id={counter}>
                  <div class="card-image valign-wrapper" id="productsonly">
                    <img class="img-products" id={"img" + counter} src={img} />
                    <a
                      class="btn-floating halfway-fab"
                      onClick={() => cartBtn(counter)}
                      style={{ background: "#149BBB" }}
                    >
                      <i class="material-icons left">add</i>
                    </a>
                  </div>
                  <div class="card-content">
                    <span
                      class="cardspan card-title"
                      style={{ color: "black", fontWeight: "bold" }}
                      id={"name" + counter}
                    >
                      {name}
                    </span>
                    <p id={"price" + counter}>{"$" + price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div class="col s12 m12 l4" id="full">
          <div id="div1">
            <h1>Cart</h1>
            <form name="myform">
              <input type="hidden" name="customer" />
            </form>
            {cart.map((item) => {
              cartCount++;
              const name = tableData[item - 1]["prod_name"];
              const price = tableData[item - 1]["prod_price"];
              const imgurl = tableData[item - 1]["img_url"];

              const img = "http://localhost/Team30API/" + imgurl;

              return (
                <div class="card horizontal" id={"card" + cartCount}>
                  <div class="card-image cart-img">
                    <img class="cartimg" src={img} />
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <span
                        class="cardspan card-title"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        {name}
                      </span>
                      <p>${price}</p>
                    </div>
                    <div class="card-action">
                      <a
                        href="javascript:void(0);"
                        id={"remove" + cartCount}
                        onClick={(e) => removeCart(e)}
                      >
                        <i id={"removes" + cartCount} class="material-icons" style={{color:"#149bbb"}}>
                          delete
                        </i>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
