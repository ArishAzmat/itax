import React, { useEffect, useState } from "react";
import accuredImage from "../images/accurecode.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Footer(props) {
  const [categoryOne,setCategoryOne] = useState([])
  const [categoryTwo,setCategoryTwo] = useState([])
  useEffect(() => {
    let categoryOne = []
    let categoryTwo = []
    
   if(props.categories && props.categories.length > 0) {
    props.categories.map((each,i)=> {
      if (i <= 9) {
        categoryOne.push(each);
      } else {
        categoryTwo.push(each);
      }
    })
    setCategoryOne(categoryOne)
    setCategoryTwo(categoryTwo)
   }
    window.scrollTo(0, 0);
  }, [props.categories]);
  const changeMenu = (menu) => {
    props.dispatch({
      type: "MENU",
      payload: menu,
    });
  };

  return (
    <div>
      <footer class="footer">
        <div class="footer_top">
          <div class="container">
            <div class="row">
              <div class="col-xl-4 col-md-6 col-lg-4">
                <div class="footer_widget">
                  <h3 class="footer_title">
                    Explore Our <span>Services</span>
                  </h3>
                  <ul>
                    {categoryOne.length > 0 &&
                      categoryOne.map((each, key) => {
                        return (
                          <li key={key}>
                            <Link to={`/service-details/${each.id}`}>{each.category_name}</Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div class="col-xl-4 col-md-6 col-lg-4">
                <div class="footer_widget">
                  <h3 class="footer_title">
                    <br />
                  </h3>
                  <ul>
                    {categoryTwo.length > 0 &&
                      categoryTwo.map((each, key) => {
                        return (
                          <li key={key}>
                            <Link to={`/`}>{each.category_name}</Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div class="col-xl-2 col-md-6 col-lg-2">
                <div class="footer_widget">
                  <h3 class="footer_title">
                    Useful <span>Links</span>
                  </h3>
                  <ul>
                    <li>
                      <Link onClick={() => changeMenu("about")} to="/about">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => changeMenu("services")}
                        to="/services"
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => changeMenu("partner_with_us")}
                        to="/partner_with_us"
                      >
                        Partners With Us
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => changeMenu("blog")} to="/blog">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => changeMenu("career")} to="/career">
                        Career
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => changeMenu("contact")} to="/contact">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => changeMenu("term_condition")}
                        to="/term_condition"
                      >
                        Terms and Conditions
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => changeMenu("privacy_policy")}
                        to="privacy_policy"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-2 col-md-6 col-lg-2">
                <div class="footer_widget">
                  <h3 class="footer_title">
                    <br />
                  </h3>
                  <div class="footer_logo text-right">
                    <a href="#">
                      <img src={accuredImage} alt="accurecode" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div class="footer-area-bottom">
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="copyright text-center">
                <p>
                  <strong>Copyright</strong>&nbsp; © 2021 All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Footer.defaultProps = {
  categories: [],
  activeMenu: "home",
};
export default connect((state, props) => {
  return {
    activeMenu: state?.activeMenu,
    categories: state?.categories,
    // categoryTwo: state?.categoryTwo,
  };
})(Footer);
