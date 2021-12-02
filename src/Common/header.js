import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import RestApi from "../services/api";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ModalRoot from "../Components/modal/modalRoot";
import { withRouter } from "react-router";
import Common from "./common";
function Header(props) {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleLogout = () => {
    // setOpenLogoutModal(false);
    RestApi.logout()
      .then((res) => {
        props.dispatch({
          type: "LOGOUT",
        });
        RestApi.defaultToken(null);
        Common.logout();
        props.history.replace("/");
        // toast.success("Logout successfully");
      })

      .catch((error) => {
        Common.logout();
      });
  };
  const handleClose = () => {
    setOpenLogoutModal(false);
  };
  const changeMenu = (menu) => {
    props.dispatch({
      type: "MENU",
      payload: menu,
    });
  };
  const checkHome = () => {
    let routes = [
      "/",
      "/faq",
      "/newsletters",
      "/case-law",
      "/videos",
      "/events",
    ];
    let s = routes.filter((r) => r == props.location.pathname);
    if (s.length == 1 || props.location.pathname.match(/calendar/)) {
      return true;
    } else {
      return false;
    }
  };
  // console.log("header props: ", props);
  return (
    //  site-navigation start
    <nav
      id="mainNavigation"
      className="navbar navbar-fixed-top"
      role="navigation"
    >
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#main-nav-collapse"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          {/*  navbar logo  */}
          <div className="navbar-brand">
            <span className="sr-only"></span>
            <Link to="/">
              <img
                src={
                  props.contactDetails.company_logo &&
                  props.contactDetails.company_logo
                }
                className="img-responsive center-block logo"
                alt="logo"
              />
            </Link>
          </div>
        </div>
        {/*  /.navbar-header  */}

        {/*  nav links  */}
        <div
          className="collapse navbar-collapse main-nav-collapse"
          id="main-nav-collapse"
        >
          <ul className="cont-detail logreg hidden-xs">
            <div className="socialtop">
              <ul>
                {props.socialIcons && props.socialIcons.facebook && (
                  <li>
                    <a href={props.socialIcons.facebook} target="_new">
                      <i className="fa fa-facebook fb"></i>
                    </a>
                  </li>
                )}

                {props.socialIcons && props.socialIcons.twitter && (
                  <li>
                    <a href={props.socialIcons.twitter} target="_new">
                      <i className="fa fa-twitter twitt"></i>
                    </a>
                  </li>
                )}
                {props.socialIcons && props.socialIcons.linkedin && (
                  <li>
                    <a href={props.socialIcons.linkedin} target="_new">
                      <i className="fa fa-linkedin in"></i>
                    </a>
                  </li>
                )}
                {props.socialIcons && props.socialIcons.google_plus && (
                  <li>
                    <a href={props.socialIcons.google_plus} target="_new">
                      <i className="fa fa-google-plus plus"></i>
                    </a>
                  </li>
                )}
                {props.socialIcons && props.socialIcons.youtube && (
                  <li>
                    <a href={props.socialIcons.youtube} target="_new">
                      <i className="fa fa-youtube youtube"></i>
                    </a>
                  </li>
                )}
                {props.socialIcons && props.socialIcons.rss && (
                  <li>
                    <a href={props.socialIcons.rss} target="_new">
                      <i className="fa fa-rss blog"></i>
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <li>
              <a href={`mailto:${props.contactDetails.header_email}`}>
                <i className="fa fa-envelope"> </i>{" "}
                {props.contactDetails.header_email}
              </a>
            </li>
            &nbsp;
            <li>
              <a href={`tel:${props.contactDetails.header_phone}`}>
                <i className="fa fa-phone"></i>{" "}
                {props.contactDetails.header_phone}
              </a>
            </li>
            {props.isLogged ? (
              <>
                <li>
                  {" "}
                  <Link to="/dashboard" className="btn button dash-btn">
                    {" "}
                    My Dashboard
                  </Link>
                  <button
                    type="submit"
                    className="button save-btn dash-logout"
                    title="Logout"
                    style={{borderRadius:'0px 3px 0px 0px rgb(178 89 1)'}}
                    onClick={() => handleLogout()}
                  >
                    <i className="fa fa-power-off"></i>
                  </button>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                <Link
                  onClick={() => changeMenu("login")}
                  to="/login"
                  className="btn button"
                >
                  <i className="fa fa-user" aria-hidden="true"></i> Login
                </Link>
                </li>
                <li>
                  <Link
                    onClick={() => changeMenu("login")}
                    to="/login"
                    class="button save-btn reg_btn"
                  >
                    <i class="fa fa-file-text" aria-hidden="true"></i>
                    {" "}Register
                  </Link>
                </li>
              </>
            )}
            {/* <li><a href="#" className="btn btn-success"><i className="fa fa-file-text" aria-hidden="true"></i> Register</a></li> */}
          </ul>
          <ul className="nav navbar-nav navbar-right text-uppercase">
            <li className={checkHome() && "active"}>
              <Link to="/">home</Link>
              {/* <a href="/"></a> */}
            </li>
            <li
              className={
                props.history.location.pathname == "/about" && "active"
              }
            >
              <Link to="/about">about us</Link>
            </li>
            <li
              className={
                props.history.location.pathname.indexOf("service") != -1 &&
                "active"
              }
            >
              <Link to="/services">Services</Link>
            </li>
            <li
              className={
                props.history.location.pathname == "/partner_with_us" &&
                "active"
              }
            >
              <Link to="/partner_with_us">Partners With Us</Link>
            </li>
            {/* <li className="dropdown" id="consultancy_tab">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                {" "}
                Services
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-submenu">
                  <a href="#">Service 1</a>
                  <a href="#">Service 2</a>
                  <a href="#">Service 3</a>
                  <a href="#">Service 4</a>
                </li>
              </ul>
            </li> */}
            <li
              className={
                props.history.location.pathname.indexOf("blog") != -1 &&
                "active"
              }
            >
              <Link to="/blog">Blog</Link>
            </li>
            <li
              className={
                props.history.location.pathname.indexOf("career") != -1 &&
                "active"
              }
            >
              <Link to="/career">Career</Link>
            </li>
            <li
              className={
                props.history.location.pathname == "/contact" && "active"
              }
            >
              <Link to="/contact">contact Us</Link>
            </li>
          </ul>
        </div>
        {/*  nav links  */}
      </div>
      {/*  /.container  */}
      {openLogoutModal && (
        <ModalRoot
          isOpen={openLogoutModal}
          close={() => handleClose()}
          title={"logout"}
          body={
            <div className="row">
              <div className="col-md-12">
                <form
                  className="form-horizontal"
                  role="form"
                  method="post"
                  action="#"
                  enctype="multipart/form-data"
                >
                  <div className="form-group text-center">
                    <span style={{ fontSize: "18px" }}>
                      <i className="fa fa-question-circle " aria-hidden="true">
                        &nbsp;
                      </i>
                      Are you Sure you want to logout now?
                    </span>
                  </div>
                  <div className="form-group text-center">
                    <a className="button save-btn" onClick={handleLogout}>
                      Yes
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a
                      className="button"
                      onClick={() => handleClose()}
                      data-dismiss="modal"
                    >
                      No
                    </a>
                  </div>
                </form>
              </div>
            </div>
          }
        />
      )}
    </nav>
  );
}

export default connect((state, props) => {
  return {
    isLogged: state.isLogged,
    socialIcons: state.socialIcons,
    contactDetails: state.contactDetails,
    activeMenu: state?.activeMenu,
  };
})(withRouter(Header));
