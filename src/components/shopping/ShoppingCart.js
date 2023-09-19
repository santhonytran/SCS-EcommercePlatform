import * as React from "react";
import { useState, useEffect } from "react";
import "../../css/shoppingcart.css";
import axios from "axios";

import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import PropTypes from "prop-types";

const ExampleDirectionsPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
};

const ShoppingCart = () => {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [response, setResponse] = React.useState(null);
  const [origin, setOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [branch, setBranch] = useState("");
  const [car, setCar] = useState("");
  const [submitPurchase, setSubmitPurchase] = useState([]);
  const [shippingCost, setShipping] = useState(0);
  const [purchaseData, setPurchasedData] = useState([]);

  const LOCAL_STORAGE_KEY = "cart";
  var cartCount = 0;
  var total = 0;
  var cost = 0;
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: 43.65,
    lng: -79.38,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitPurchase({
      branch: e.target[0].value,
      car: e.target[1].value,
      shipping: e.target[2].value,
      name: e.target[3].value,
      num: e.target[4].value,
      expiry: e.target[5].value,
      cvv: e.target[6].value,
      user: localStorage.getItem("username"),
      cost: cost,
    });
    setPurchasedData(cart); 
    setPurchasedData(purchaseData => purchaseData.concat(localStorage.getItem("username")));
    localStorage.removeItem("cart");
    axios({
      method: "post",
      url: "http://localhost/Team30API/api/submit_purchase.php",
      headers: { "content-type": "application/json" },
      data: submitPurchase,
    })
      .then((res) => {
        window.location = "/invoice";
        return false;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost/Team30API/api/submit_purchase.php",
      headers: { "content-type": "application/json" },
      data: submitPurchase,
    }).catch((err) => {
      console.log(err);
    });
  }, [submitPurchase]);

  const directionsCallback = React.useCallback((res) => {
    if (res !== null) {
      if (res.status === "OK") {
        setResponse(res);
      } else {
        console.log("response: ", res);
      }
    }
  }, []);

  useEffect(() => {
    generateProducts();
    const storedCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedCart) setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
   console.log(purchaseData);
   axios({
    method: "post",
    url: "http://localhost/Team30API/api/send_cart.php",
    headers: { "content-type": "application/json" },
    data: purchaseData,
  })
    .catch((err) => {
      console.log(err);
    });
  }, [purchaseData]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  function generateProducts() {
    axios({
      method: "post",
      url: "http://localhost/Team30API/api/get_checkout.php",
      headers: { "content-type": "application/json" },
      data: { user: localStorage.getItem("username") },
    })
      .then((res) => {
        setProduct(res.data.product);
        setOrigin(res.data.address);
        setBranch(res.data.branch);
        setCar(res.data.car);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  return (
    <div>
      <div class="row">
        <div class="container">
          <div class="col s12 m12 l9">
            <h1>Checkout</h1>
            <div id="mapdiv" class="col s12 m12 l9">
              <div id="map">
                <LoadScript googleMapsApiKey="AIzaSyDf5iT2KI8tPal0EAflGoI2WNfnXXp3nHc">
                  <GoogleMap
                    id="direction-example"
                    mapContainerStyle={containerStyle}
                    zoom={9}
                    center={center}
                  >
                    {destination !== "" && origin !== "" && (
                      <DirectionsService
                        options={{
                          destination,
                          origin,
                          travelMode: "DRIVING",
                        }}
                        callback={directionsCallback}
                      />
                    )}

                    {response !== null && (
                      <DirectionsRenderer options={{ directions: response }} />
                    )}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>

            <form id="order" method="post" onSubmit={handleSubmit}>
              <div
                className="input-field col s12"
                onChange={(e) => {
                  const selectedTable = e.target.value;
                  setDestination(selectedTable);
                }}
              >
                <select
                  className="browser-default choice"
                  id="end"
                  name="end"
                  required
                >
                  <option disabled selected>
                    Choose a Branch
                  </option>

                  {branch.map((item) => {
                    return (
                      <option value={item["branch_addy"]}>
                        {item["branch_addy"]}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div class="input-field col s12">
                <select
                  className="browser-default choice"
                  name="car"
                  id="car"
                  required
                >
                  <option value="" disabled selected>
                    Choose a Car
                  </option>

                  {car.map((item) => {
                    return (
                      <option value={item["model"]}>
                        {item["model"] + " - Available"}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                className="input-field col s12"
                onChange={(e) => {
                  const shipCost = e.target.value;
                  setShipping(shipCost);
                }}
              >
                <select
                  className="browser-default choice"
                  name="date"
                  id="date"
                  required
                >
                  <option value="" disabled selected>
                    Choose a Delivery Option
                  </option>
                  <option value="0">FREE - No-Rush Shipping</option>
                  <option value="6.99">$6.99 - One-Day Shipping</option>
                  <option value="5.99">$5.99 - Two-Day Shipping</option>
                </select>
              </div>

              <div className="input-field col s12">
                <input id="first_name" type="text" class="validate" />
                <label for="first_name">Name on Card</label>
              </div>

              <div className="input-field col s12">
                <input id="card_num" type="text" class="validate" />
                <label for="card_num">Card Number</label>
              </div>

              <div className="input-field col s6">
                <input id="expires" type="text" class="validate" />
                <label for="expires">Expiry Date</label>
              </div>

              <div className="input-field col s6">
                <input id="cvv" type="text" class="validate" />
                <label for="cvv">CVV</label>
              </div>

              <input
                type="hidden"
                id="FinalValue"
                name="FinalValue"
                value="128.98"
              ></input>
              <button
                class="btn waves-effect waves-light save-button"
                type="submit"
                name="trip_submit"
                style={{ marginTop: "30px", background: "#149BBB" }}
              >
                Place Order
              </button>
            </form>
          </div>

          <div class="col s12 m12 l3" id="full">
            <div id="div1">
              <h1>Cart</h1>
              <div
                class="card-panel horizontal medium"
                id="card' . $counter . '"
              >
                <div class="card-stacked">
                  <div class="card-content">
                    <span
                      style={{ color: "black", fontWeight: "bold" }}
                      class="card-title"
                    >
                      Summary
                    </span>
                    {cart.map((item) => {
                      const price = product[item - 1]["prod_price"];
                      total += parseFloat(price);
                      cost =
                        Math.round(
                          (total * 1.13 -
                            total * 0.15 +
                            parseFloat(shippingCost)) *
                            100
                        ) / 100;
                    })}

                    <p id="subtotal">
                      {"Subtotal: $" + Math.round(total * 100) / 100}
                    </p>
                    <p id="shipping">
                      {"Shipping & Handling: $" + shippingCost}
                    </p>
                    <p>{"Taxes: $" + Math.round(total * 0.13 * 100) / 100}</p>
                    <p>
                      {"Savings: -$" + Math.round(total * 0.15 * 100) / 100}
                    </p>
                    <p id="total">{"TOTAL: $" + cost}</p>
                  </div>
                </div>
              </div>
              {cart.map((item) => {
                cartCount++;
                const name = product[item - 1]["prod_name"];
                const price = product[item - 1]["prod_price"];
                const imgurl = product[item - 1]["img_url"];

                const img = "http://localhost/Team30API/" + imgurl;

                return (
                  <div class="card horizontal small" id={"card" + cartCount}>
                    <div class="card-image cart-img">
                      <img src={img} />
                    </div>
                    <div class="card-stacked">
                      <div class="card-content">
                        <span
                          class="cardspan card-title"
                          style={{ color: "black", fontWeight: "bold" }}
                        >
                          {name}
                        </span>{" "}
                        <p>${price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ShoppingCart.propTypes = ExampleDirectionsPropTypes;

export default React.memo(ShoppingCart);
