import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import About from "./about";
import Service from "./service";
import PartnerWithUs from "./partnerWithUs";
import Blog from "./blog";
import Career from "./careerWithUs";
import Contact from "./contactUs";
import Login from "./login";
import CustomerRegister from "./customerRegister";
import PartnerRegister from "./partnerRegister";
import Pages from "./pages";
import Index from "./index";
import Newsletter from "./newsletter";
import Header from "../../Common/header";
import Footer from "../../Common/footer";
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Videos from './videos';
import DownloadForm from './downloadForm';
import BlogDetails from './blogDetails';
import Events from './events';
import EventDetails from './eventDetails'
import Calendar from './calendar';
import Faq from './faq';
import CaseLaw from './caseLaw';
import ServiceDetails from './serviceDetails';
import ServiceSearch from './serviceSearch';
import ApplyForm from './applyForm';

class Main extends Component {
  constructor(props){
    console.log("props",props)
    super(props)
    this.state = {
      activeForm: 'customer',
    }
  }
  setActiveForm (changeForm){
    this.setState({
      activeForm: changeForm
    })
  }
  componentDidMount() {
  }
  componentDidUpdate(){
    
  }
  render() {
    return (
      <>
      <Header socialIcons={this.state.socialIcons} />
      <Switch>
        <Route exact path={"/"} component={() => <Index/>} />
        <Route exact path={`/about`} component={About} />
        <Route exact path={`/partner_with_us`} component={PartnerWithUs} />
        <Route exact path={`/blog`} component={Blog} />
        <Route exact path={`/blog/:search`} component={Blog} />
        <Route exact path={`/blog-details/:id`} component={BlogDetails} />
        <Route exact path={`/career`} component={Career} />
        <Route exact path={`/contact`} component={Contact} />
        <Route exact path={`/services`} component={Service} />
        <Route exact path={`/service-details/:id`} component={ServiceDetails} />
        <Route exact path={`/service-details/:id/:sId`} component={ServiceDetails} />
        <Route exact path={`/apply-form/:cid/:sId`} component={ApplyForm} />
        <Route exact path={`/search/:id`} component={ServiceSearch} />
        <Route exact path={`/search/`} component={ServiceSearch} />
        <Route exact path={`/videos`} component={Videos} />
        <Route exact path={`/newsletters`} component={Newsletter} />
        <Route exact path={`/newsletters`} component={Newsletter} />
        <Route exact path={`/download_form`} component={DownloadForm} />
        <Route exact path={`/events`} component={Events} />
        <Route exact path={`/events/:id`} component={Events} />
        <Route exact path={`/event-details/:id`} component={EventDetails} />
        <Route exact path={`/calendar/:month/:year`} component={Calendar} />
        <Route exact path={`/faq`} component={Faq} />
        <Route exact path={`/case-law`} component={CaseLaw} />
        <Route
          exact
          path={`/privacy_policy`}
          component={() => (
            <Pages title="PRIVACY POLICY" page="privacy-policy" />
          )}
        />
        <Route
          exact
          path={`/term_condition`}
          component={() => (
            <Pages title="TERMS AND CONDITION" page="terms-and-conditions" />
          )}
        />
        <Route
          exact
          path={`/login`}
          component={() => (
            <Login activeForm={this.state.activeForm} setActiveForm={(changeForm) =>this.setActiveForm(changeForm)} />
          )}
        />
         <Route exact path={`/register`}> <CustomerRegister /></Route>
         <Route exact path={`/partner-register`}> <PartnerRegister /></Route>
        {/* <Route exact path={`/register`}>
          {this.state.activeForm == "customer" ? (
            <PartnerRegister />
          ) : (
            <CustomerRegister />
          )}
        </Route> */}



        {/* <Route path="*">
            <NoMatch />
          </Route> */}
      </Switch> 
      {/* <Footer /> */}
    </>
    )
  }
}
export default withRouter(Main)

function NoMatch() {
  // let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code> helloe </code>
      </h3>
    </div>
  )
}