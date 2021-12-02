import React, { Component, useEffect } from "react";
import HomePages from "../Container/Home/main";
import MainCustomer from "../Container/Customer/main";
import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";
import RestApi from "../services/api";
import { connect } from "react-redux";
import Common from "../Common/common";
// import PartnerIndex from "../Container/Partner/index";
// import { loadProgressBar } from 'axios-progress-bar'
class Index extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.checkLogin();
    this.contactData();
  }
  checkLogin() {
    if (!this.props.isLogged) {
      let data = sessionStorage.getItem("userDetails");
      let userDetails = JSON.parse(data);
      let dash = sessionStorage.getItem("dashboard");
      let dashboard = JSON.parse(dash);
      if (typeof userDetails == "object") {
        // Common.saveState(userDetails);
        this.props.dispatch({
          type: "LOGIN",
          payload: data,
        });
      }
      // if(dashboard != "null"){
      //   alert(dashboard)
      //   this.props.dispatch({
      //     type: "DASHBOARD",
      //     payload: dashboard,
      //   });
      // }
    }
  }
  contactData() {
    RestApi.contact().then((res) => {
      // let categoryOne = []
      // let categoryTwo = []

      // res.data.data.category_list.map((each,i)=> {
      //   if (i <= 9) {
      //     categoryOne.push(each);
      //   } else {
      //     categoryTwo.push(each);
      //   }
      // })
      this.props.dispatch({
        type: "CONTACT",
        payload: {
          socialIcons: res.data.data.social_media_link,
          contactDetails: res.data.data.contact_details,
          categories: res.data.data.category_list,
        },
      });
    });
  }
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/">
              {this.props.isLogged && <MainCustomer />}
              <HomePages />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    isLogged: state.isLogged,
  };
})(Index);
