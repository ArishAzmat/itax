import React from "react";
import { Switch, Route, useRouteMatch, BrowserRouter } from "react-router-dom";
import Header from "../../Common/header";
import Footer from "../../Common/footer";
import CustomerIndex from "./index";
import ManageServices from "./manageServices";
import Profile from "./profile";
import ViewService from "./viewService";
import SideBar from "../../Common/customerSideBar";
import UserHeader from "../../Common/header";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'
function Main(props) {
  let { url } = useRouteMatch();
  console.log("Customer",props);
  return (
    <>
      {/* {props.isLogged && props.userDetails && props.userDetails._token != null ? ( */}
        <>
          {/* <UserHeader /> */}
          {/* <SideBar userDetails={props.userDetails} /> */}
          <Switch>
            <Route exact path={`/dashboard`} component={() => <CustomerIndex userDetails={props.userDetails}/>} />
            <Route
              exact
              path={`/manage-services`}
              component={() => <ManageServices userDetails={props.userDetails}/>}
            />
            <Route exact path={`/my-profile`}>
              <Profile userDetails={props.userDetails} />
            </Route>
            <Route exact path={`/view`} component={() => <ViewService userDetails={props.userDetails}/>} />
          </Switch>
        </>
      {/* ) : 
      props.history.push('/')
      } */}
    </>
  );
}

export default connect(function (state, props) {
  return {
    isLogged: state?.isLogged,
    userDetails: state?.userDetails,
    dashboard : state?.dashboard
  };
})(withRouter(Main));
