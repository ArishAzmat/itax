import React, { Component } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import RestApi from "../services/api";
import axios from "axios";

export default class userHeader extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
  }
  handleLogout() {
    RestApi.logout().then((res)=> {
      // console.log(res)
    })
    .catch((error)=> {
      console.log("error!",error);
    });
  }
  render() {
    return (
      <div
        data-spy="scroll"
        data-target="#main-nav-collapse"
        data-offset="100"
        style={{ marginTop: "6%" }}
      >
        <nav
          id="mainNavigation"
          class="navbar navbar-fixed-top hidden-xs"
          role="navigation"
        >
          <div class="container-fluid">
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#main-nav-collapse"
                aria-expanded="false"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>

              <div class="navbar-brand">
                <span class="sr-only"></span>
                <Link to="/">
                  <img
                    src={logo}
                    class="img-responsive center-block logo"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
            <div
              class="collapse navbar-collapse main-nav-collapse"
              id="main-nav-collapse"
            >
              <ul class="cont-detail logreg hidden-xs">
                <div class="socialtop">
                  <ul>
                    <li>
                      <a href="http://www.facebook.com" target="_new">
                        <i class="fa fa-facebook fb"></i>
                      </a>
                    </li>
                    <li>
                      <a href="http://www.twitter.com" target="_new">
                        <i class="fa fa-twitter twitt"></i>
                      </a>
                    </li>
                    <li>
                      <a href="http://www.linkedin.com" target="_new">
                        <i class="fa fa-linkedin in"></i>
                      </a>
                    </li>
                    <li>
                      <a href="http://www.googleplus.com" target="_new">
                        <i class="fa fa-google-plus plus"></i>
                      </a>
                    </li>
                    <li>
                      <a href="http://www.youtube.com" target="_new">
                        <i class="fa fa-youtube youtube"></i>
                      </a>
                    </li>
                    <li>
                      <a href="http://www.rss.com" target="_new">
                        <i class="fa fa-rss blog"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <li>
                  <a href="mailto:cavinitmangal@gmail.com">
                    <i class="fa fa-envelope"></i> cavinitmangal@gmail.com
                  </a>
                </li>
                &nbsp;
                <li>
                  <a href="tel:+919870201645">
                    <i class="fa fa-phone"></i> +91 9870201645
                  </a>
                </li>
                <li>
                  {" "}
                  <Link to="/customer/dashboard" class="btn button">
                    {" "}
                    My Dashboard
                  </Link>
                  <button
                    type="submit"
                    class="button save-btn dash-logout"
                    title="Logout"
                    onClick={this.handleLogout}
                  >
                    <i class="fa fa-power-off"></i>
                  </button>
                </li>
                <li></li>
              </ul>
              <ul class="nav navbar-nav navbar-right text-uppercase">
                <li class="active">
                  <Link to="/">home</Link>
                  {/* <a href="/"></a> */}
                </li>
                <li>
                  <Link to="/about">about us</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/partner_with_us">Partners With Us</Link>
                </li>

                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/career_with_us">Career</Link>
                </li>
                <li>
                  <Link to="/contact-us">contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div class="w3-bar w3-top w3-black w3-large" style={{ zIndex: "4" }}>
          <button
            class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey"
            onclick="w3_open();"
          >
            <i class="fa fa-bars"></i>  Menu
          </button>
          <span class="w3-bar-item w3-right">
            <Link to="/">
              <img
                src={logo}
                class="img-responsive center-block"
                alt="logo"
                style={{ height: "28px", background: "#fff", margin: "0" }}
              />
            </Link>
          </span>
        </div>
      </div>
    );
  }
}
