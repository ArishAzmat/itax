import React, { Component } from "react";
import avatar2 from "../images/avatar2.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class sideBar extends Component {
  constructor(props) {
    super(props);
    let {dashboard,userDetails}  = this.props
    let d = dashboard ? dashboard :
            userDetails.isServiceProvider ==  'yes' ? userDetails.isServiceProvider :
            userDetails.isCustomer ==  'yes' && userDetails.isCustomer 

    this.state = {
      isServiceProvider: userDetails.isServiceProvider,
      isCustomer: userDetails.isCustomer,
      activeDashboard: d,
      drawerSwitch: false,
    };
  }
  componentDidMount() {
    // let { isServiceProvider, isCustomer, activeDashboard } = this.state;
    // if (isServiceProvider == "yes" && isCustomer == "yes") {
    //   activeDashboard = this.props.dashboard;
    // } else if (isServiceProvider == "yes") {
    //   activeDashboard = "serviceProvider";
    // } else if (isCustomer == "yes") {
    //   activeDashboard = "customer";
    // }
    console.log('sideboard',this.props, this.state);
  }

  changeDashboard(e) {
    this.setState({ activeDashboard: e.target.value });
  }
  handleSidebar() {
    this.setState({
      drawerSwitch: !this.state.drawerSwitch,
    });
  }
  dashboardMenu() {
    if (this.state.activeDashboard == "customer") {
      return (
        <>
          <Link
            to="/manage-services"
            className="w3-bar-item w3-button w3-padding"
          >
            <i className="fa fa-eye fa-fw"></i>  Sevice Request
          </Link>
          <Link to="#" className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-eye fa-fw"></i>  Meeting Schedule
          </Link>
          <Link to="#" className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-eye fa-fw"></i>  Report
          </Link>

          <Link to="#" className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-bank fa-fw"></i>  Referal
          </Link>
        </>
      );
    } else if (this.state.activeDashboard == "serviceProvider") {
      return (
        <>
          <a
            onclick="myFunc1()"
            href="javascript:void(0)"
            class="w3-bar-item w3-button w3-padding w3-block w3-left-align"
            id="myService"
          >
            <i class="fa fa-eye fa-fw"></i>  Sevices{" "}
            <i class="fa fa-caret-down"></i>
          </a>
          <div
            id="demoDrop1"
            class="w3-bar-block w3-hide w3-padding-large w3-small"
          >
            <a href="manage-services.php" class="w3-bar-item w3-button">
              <i class="fa fa-caret-right"></i> Manage Sevices
            </a>
            <a href="#" class="w3-bar-item w3-button">
              <i class="fa fa-caret-right"></i> Closed Sevices
            </a>
          </div>
          <a
            onclick="myFunc2()"
            href="javascript:void(0)"
            class="w3-bar-item w3-button w3-padding w3-block w3-left-align"
            id="myMeeting"
          >
            <i class="fa fa-eye fa-fw"></i>  Meetings{" "}
            <i class="fa fa-caret-down"></i>
          </a>
          <div
            id="demoDrop2"
            class="w3-bar-block w3-hide w3-padding-large w3-small"
          >
            <a href="#" class="w3-bar-item w3-button">
              <i class="fa fa-caret-right"></i> New Meetings
            </a>
            <a href="#" class="w3-bar-item w3-button">
              <i class="fa fa-caret-right"></i> Meeting Schedule
            </a>
          </div>
          <a
            onclick="myFunc3()"
            href="javascript:void(0)"
            class="w3-bar-item w3-button w3-padding w3-block w3-left-align"
            id="myMgmt"
          >
            <i class="fa fa-eye fa-fw"></i>  Management{" "}
            <i class="fa fa-caret-down"></i>
          </a>
          <div
            id="demoDrop3"
            class="w3-bar-block w3-hide w3-padding-large w3-small"
          >
            <a href="services_list_invoice.php" class="w3-bar-item w3-button">
              <i class="fa fa-caret-right"></i> Invoice
            </a>
            <a href="#" class="w3-bar-item w3-button">
              <i class="fa fa-caret-right"></i> T & C | N D A
            </a>
          </div>
          <a
            onclick="myFunc4()"
            href="javascript:void(0)"
            class="w3-bar-item w3-button w3-padding w3-block w3-left-align"
            id="myReport"
          >
            <i class="fa fa-eye fa-fw"></i>  Report{" "}
            <i class="fa fa-caret-down"></i>
          </a>
          <div
            id="demoDrop4"
            class="w3-bar-block w3-hide w3-padding-large w3-small"
          >
            <a href="#" class="w3-bar-item w3-button">
              <i class="fa fa-caret-right"></i> Ledger
            </a>
          </div>
          <a
            onclick="myFunc5()"
            href="javascript:void(0)"
            class="w3-bar-item w3-button w3-padding w3-block w3-left-align"
            id="myBlog"
          >
            <i class="fa fa-eye fa-fw"></i>  Blogs{" "}
            <i class="fa fa-caret-down"></i>
          </a>
          <div
            id="demoDrop5"
            class="w3-bar-block w3-hide w3-padding-large w3-small"
          >
            <a href="#" class="w3-bar-item w3-button">
              <i class="fa fa-caret-right"></i> New Blogs
            </a>
            <a href="#" class="w3-bar-item w3-button">
              <i class="fa fa-caret-right"></i> Manage Blogs
            </a>
            <a href="#" class="w3-bar-item w3-button">
              <i class="fa fa-caret-right"></i> Published Blogs
            </a>
          </div>
          <a href="#" class="w3-bar-item w3-button w3-padding">
            <i class="fa fa-bank fa-fw"></i>  Referal
          </a>
          <br />
          <br />
        </>
      );
    }
  }

  render() {
    let { userDetails } = this.props;
    let { isServiceProvider, isCustomer, activeDashboard } = this.state;
    const styles = {
      sideBarMenu: {
        zIndex: "3",
        width: "260px",
        display: this.state.drawerSwitch == true ? "block" : "none",
      },
    };
    var dateObj = new Date();
    const month = dateObj.toLocaleString("default", { month: "long" });
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return (
      <div>
        <nav
          className="w3-sidebar w3-collapse w3-dark-green"
          style={{ zIndex: "3", width: "260px" }}
          id="mySidebar"
        >
          <br />
          <div className="w3-container w3-row">
            <div className="w3-col w3-large s12 w3-bar">
              <Link to="/dashboard">
                <b>
                  <i className="fa fa-dashboard"></i> My Dashboard
                </b>
              </Link>
            </div>
          </div>
          <hr />
          <div className="w3-bar-block w3-medium">
            <a
              href="#"
              className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black"
              onclick={this.handleSidebar}
              title="close menu"
            >
              <i className="fa fa-remove fa-fw"></i>  Close Menu
            </a>
            <Link
              to="/my-profile"
              className="w3-bar-item w3-button w3-padding w3-yellow"
            >
              <i className="fa fa-users fa-fw"></i>  My Profile
            </Link>
            {this.dashboardMenu()}
            <br />
            <br />
          </div>
        </nav>

        {/* <!-- Overlay effect when opening sidebar on small screens --> */}
        <div
          className="w3-overlay w3-hide-large w3-animate-opacity"
          onclick={this.handleSidebar}
          style={{ cursor: "pointer" }}
          title="close side menu"
          id="myOverlay"
        ></div>

        {/* <!-- !PAGE CONTENT! --> */}
        <div
          className="w3-main"
          style={{ marginLeft: "260px", marginTop: "92px" }}
        >
          {/* <!-- Header --> */}
          <header className="w3-container w3-xlarge w3-dark-green w3-padding">
            <p className="w3-left">
              <img
                src={avatar2}
                className="w3-circle w3-margin-right"
                style={{ width: "46px" }}
              />
            </p>
            <p className="w3-left w3-medium">
              <span>
                <strong>
                  {this.props.userDetails &&
                    `${userDetails.name} ${
                      userDetails.middle_name != null
                        ? userDetails.middle_name
                        : ""
                    } ${
                      userDetails.last_name != null ? userDetails.last_name : ""
                    }`}
                </strong>
                {",  "}
                {isServiceProvider == "yes" && isCustomer == "yes" ? (
                  <select
                    onChange={(e) => this.changeDashboard(e)}
                    className="user-change-select"
                  >
                    {" "}
                    <option
                      value="customer"
                      selected={activeDashboard == "customer" && "selected"}
                    >
                      Customer
                    </option>
                    <option
                      value="serviceProvider"
                      selected={
                        activeDashboard == "serviceProvider" && "selected"
                      }
                    >
                      Service Provider
                    </option>{" "}
                  </select>
                ) : isServiceProvider == "yes" ? (
                  "Service Provider"
                ) : (
                  "Customer"
                )}
              </span>
              <br />
              <span className="w3-small">{`${day} ${month} ${year}`}</span>
            </p>
            <p className="w3-right w3-large mt-10">
              <a href="#" className="notification">
                <i className="fa fa-calendar w3-margin-right"></i>
                <span className="badge">1</span>
              </a>
              {/* <a href="#" className="notification">
                <i className="fa fa-envelope w3-margin-right"></i>
                <span className="badge">2</span>
              </a> */}
              <a href="#" className="notification">
                <i className="fa fa-bell w3-margin-right"></i>
                <span className="badge">3</span>
              </a>
            </p>
          </header>
        </div>
      </div>
    );
  }
}
sideBar.defaultProps = {
  dashboard: ["customer"],
};
export default connect((state) => {
  return {
    dashboard: state?.dashboard,
    userDetails: state?.userDetails,
  };
})(sideBar);
