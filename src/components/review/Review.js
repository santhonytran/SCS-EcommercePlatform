import React, {useState,useEffect} from 'react';
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../../css/reviews.css';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewUsers, setReviewUsers] = useState([]);
  const [submitReview, setSubmitReview] = useState([]);
  const [getProducts, setGetProducts] = useState([]);
  const [didSubmit, setDidSubmit] = useState(false);
  const [chosenReview, setChosenReview] = useState();
  const [getProductReview, setGetProductReview] = useState([]);
  const [productToReview, setProductToReview] = useState([]);
  var star = "star_rate";

  useEffect(() =>{
      var slider = document.querySelectorAll('.carousel');
      M.Carousel.init(slider, {
        dist:0,
        shift:0,
        padding:20,
      });
      axios({
        method: 'post',
        url: 'http://localhost/Team30API/api/review.php',
        headers: { 'content-type': 'application/json' },
        data:""
      })
      .then(res =>{
        setReviews(res.data);
      }) .catch(err =>{ 
        console.log(err);
      })
      axios({
        method: 'post',
        url: 'http://localhost/Team30API/api/get_review_user.php',
        headers: { 'content-type': 'application/json' },
        data:localStorage.getItem('username')
      })
      .then(res =>{
        setReviewUsers(res.data);
      }) .catch(err =>{ 
        console.log(err);
      })
      axios({
        method: 'post',
        url: 'http://localhost/Team30API/api/get_products.php',
        headers: { 'content-type': 'application/json' },
        data: localStorage.getItem('username')
      })
      .then(res =>{
        setProductToReview(res.data);
      }) .catch(err =>{ 
        console.log(err);
      })
      axios({
        method: 'post',
        url: 'http://localhost/Team30API/api/select.php',
        headers: { 'content-type': 'application/json' },
        data: "product"
      })
      .then(res =>{
        setGetProducts(res.data);
      }) .catch(err =>{ 
        console.log(err);
      })
  },[])

  const handleSubmit =  (e) => {
    e.preventDefault();
      if (e.target[0].value !=""){
      setSubmitReview({
        prod_name: e.target[0].value,
        rate: e.target[1].value,
        user: localStorage.getItem('username'),
        text: e.target[2].value
      });
      setDidSubmit(true);
    }
  }

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost/Team30API/api/submit_review.php',
      headers: { 'content-type': 'application/json' },
      data: submitReview
    })
   .catch(err =>{ 
      console.log(err);
    })  
  }, [submitReview])

  useEffect(() => {
    if(chosenReview !== ""){
      axios({
        method: 'post',
        url: 'http://localhost/Team30API/api/get_product_review.php',
        headers: { 'content-type': 'application/json' },
        data: chosenReview
      })
      .then(res =>{
        setGetProductReview(res.data)
      }).catch(err =>{ 
        console.log(err);
      })
    }  
  }, [chosenReview])

  useEffect(() => {
    var slider2 = document.querySelector('.carousel-dynamic');
    if (slider2 && slider2.classList.contains('initialized')){
      slider2.removeClass('initialized')
    }
    M.Carousel.init(slider2, {
      dist:0,
      shift:0,
      padding:20,
    });
  }, [getProductReview])

  useEffect(() => {
   console.log(getProducts)
  }, [getProducts])




  return (
    <div>
      <div id="review-container">
        <div className="container">
          <div className="row" id="title">
              <h1>What people are <span className="highlight">saying</span></h1>
              <h2 id="description">We've had the pleasure of delivering to over 500 customers worldwide. Here's what they've had to say.</h2>
        </div>
      </div>

      <div className="carousel">
        <div className="carousel-item">
            <div className="card horizontal sticky-action">
              <div className="card-stacked">
                  <div className="card-content">
                    <span className="material-icons star">star_rate star_rate star_rate star_rate star_rate</span>
                    <br></br>{reviews[0]?.review_text}
                  </div>
                <div className="card-action">
                  <a href="#" style={{color:"#149BBB"}}>{reviewUsers[0]?.first_name} {reviewUsers[0]?.last_name}</a>
                </div>
            </div>
          </div>
        </div>

        <div className="carousel-item">
            <div className="card horizontal sticky-action">
              <div className="card-stacked">
                  <div className="card-content">
                    <span className="material-icons star">star_rate star_rate star_rate star_rate star_rate</span>
                    <br></br>{reviews[1]?.review_text}
                  </div>
                <div className="card-action">
                  <a href="#" style={{color:"#149BBB"}}>{reviewUsers[1]?.first_name} {reviewUsers[1]?.last_name}</a>
                </div>
            </div>
          </div>
        </div>

        <div className="carousel-item">
            <div className="card horizontal sticky-action">
              <div className="card-stacked">
                  <div className="card-content">
                    <span className="material-icons star">star_rate star_rate star_rate star_rate star_rate</span>
                    <br></br>{reviews[2]?.review_text}
                  </div>
                <div className="card-action">
                  <a href="#" style={{color:"#149BBB"}}>{reviewUsers[2]?.first_name} {reviewUsers[2]?.last_name}</a>
                </div>
            </div>
          </div>
        </div>

        <div className="carousel-item">
            <div className="card horizontal sticky-action">
              <div className="card-stacked">
                  <div className="card-content">
                    <span className="material-icons star">star_rate star_rate star_rate star_rate star_rate</span>
                    <br></br>{reviews[3]?.review_text}
                  </div>
                <div className="card-action">
                  <a href="#" style={{color:"#149BBB"}}>{reviewUsers[3]?.first_name} {reviewUsers[3]?.last_name}</a>
                </div>
            </div>
          </div>
        </div>
    </div>
    {
      didSubmit ? 
      <div className="container" id="thanks">
        <h1><br></br>Thank <span class="highlight">you!</span></h1>
        <h2>We appreciate your feedback.</h2>
      </div> :  
      localStorage.getItem('username') && 
      <div className="container"  id="feedback_title">
        <div className="row">
          <h1><br></br>Tell us what you <span class="highlight">think</span></h1>
        </div>
        <form name="review" id="review" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col s8 m8 l3 offset-l4">
          <label>Product</label>
          <select className="browser-default choice" id="selection" name="prodname">
          {
            productToReview.map((item, index) => {
                return <option key={index} value={productToReview[index].prod_name}>{productToReview[index].prod_name}</option>
            })
          }
          </select>
          </div>
          <div className="col s4 m4 l1">
          <label>Rating</label>
          <select className="browser-default choice" id="selection" name="prodname">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          </div>
          </div>
          <div className="row">
            <div className="input-field reviews s12 col m12 l10 offset-l1">
              <textarea id="reviewarea" name="reviewarea" className="materialize-textarea" type="text" data-length="500"></textarea>
              <label for="reviewarea">Type your review here</label>
            </div>
          </div>
          <div className="row">
            <div className="center-align">
              <button className="btn waves-effect save-button" type="submit" name="review_submit" style={{background:"#149BBB"}}>Submit</button>
            </div>
          </div>
        </form>
      </div>     
    }
    <div className="container">
      <div className="row" id="reviewTitle">
          <h1>View product <span className="highlight">reviews</span></h1>
      </div>
      <div className="row">
        <div className="col s12 m6 offset-m3" onChange={(e)=> {
                    setChosenReview(e.target.value)
                  }}>
            <select className="browser-default choice" id="selection" name="prodname">
            <option value="">Select Product</option>
            {
              getProducts.map((item, index) => {
                  return <option key={index} value={getProducts[index]?.prod_name}>{getProducts[index]?.prod_name}</option>
              })
            }
            </select>
        </div>
      </div>
    </div>
    {
      
      getProductReview.length > 0 && 
      <div className="carousel carousel-dynamic">
        {
        
          getProductReview.map((item, index) => {
            return (
              <div className="carousel-item">
                <div className="card horizontal sticky-action">
                  <div className="card-stacked">
                    <div className="card-content">
                      <span className="material-icons star">{star.repeat(getProductReview[index].preview_rate)}</span>
                      <br></br>{getProductReview[index].preview_text}
                    </div>
                    <div className="card-action">
                      <a href="#" style={{color:"#149BBB"}}>{getProductReview[index].first_name} {getProductReview[index].last_name}</a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    }

    
  </div>
</div>
  )
}

export default Review