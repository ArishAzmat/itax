import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Common/footer";
import Newsletter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";

export default class events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upComing: [],
      previous: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    RestApi.events().then((res) => {
      // console.log("events", res);
      if (res.data.status) {
        this.setState({
          upComing: res.data.data.upcoming,
          previous: res.data.data.previous,
        });
      }
    });
  }
  render() {
    // let id = this.props.match.params.id
    return (
      <>
        <section>
          <div className="breadcrumbpane">
            <div className="container">
              <h1 className="pull-left">Events</h1>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="divider bg-light">
                <div className="container">
                  <div className="col-lg-8">
                    <div className="section-title text-center">
                      <h2 className="mt-0">Upcoming Events</h2>
                    </div>
                    {this.state.upComing.length > 0 ? (
                      <div className="events-new">
                        {this.state.upComing.map((each) => {
                          return (
                            <>
                              <div
                                className="card card-1"
                                onmouseover="_card_more1()"
                                onmouseout="_card_less1()"
                              >
                                <div
                                  className="card-img"
                                  style={{
                                    backgroundImage: `url(${each.image})`,
                                  }}
                                ></div>
                                <div className="card-text">
                                  <h3 className="card-title bold-700">
                                    {each.heading}
                                  </h3>
                                  <p
                                    className="card-subtitle regular-400"
                                    id="card-subtitle-1"
                                  >
                                    {each.date}
                                  </p>

                                  <Link
                                    to={`/event-details/${each.id}`}
                                    className="card-button click"
                                    // data-toggle="modal"
                                    // data-target="#eventModal"
                                  >
                                    More Info
                                  </Link>
                                </div>
                              </div>
                            </>
                          );
                        })}

                        {/* <div
                        className="card card-2"
                        onmouseover="_card_more2()"
                        onmouseout="_card_less2()"
                      >
                        <div className="card-img card-img-2"></div>
                        <div className="card-text">
                          <h3 className="card-title bold-700">Annual Meeting</h3>
                          <p
                            className="card-subtitle regular-400"
                            id="card-subtitle-2"
                          >
                            Sat, 27 July, 2021
                          </p>
                          <a
                            href="#"
                            className="card-button click"
                            data-toggle="modal"
                            data-target="#eventModal"
                          >
                            More Info
                          </a>
                        </div>
                      </div> */}
                      </div>
                    ) : (
                      <div className="events-noData">No Upcoming Events</div>
                    )}

                    <div className="section-title text-center">
                      <h2 className="mt-0">Previous Events</h2>
                    </div>
                    {this.state.previous.length > 0 ? (
                      <div className="events-new">
                        {this.state.previous.map((each) => {
                          return (
                            <>
                              <div
                                className="card card-1"
                                onmouseover="_card_more1()"
                                onmouseout="_card_less1()"
                              >
                                <div
                                  className="card-img"
                                  style={{
                                    backgroundImage: `url(${each.image})`,
                                  }}
                                ></div>
                                <div className="card-text">
                                  <h3 className="card-title bold-700">
                                    {each.heading}
                                  </h3>
                                  <p
                                    className="card-subtitle regular-400"
                                    id="card-subtitle-1"
                                  >
                                    {each.date}
                                  </p>

                                  <Link
                                    to={`/event-details/${each.id}`}
                                    className="card-button click"
                                    // data-toggle="modal"
                                    // data-target="#eventModal"
                                  >
                                    More Info
                                  </Link>
                                </div>
                              </div>
                            </>
                          );
                        })}
                        {/* <div
                        className="card card-1"
                        onmouseover="_card_more1()"
                        onmouseout="_card_less1()"
                      >
                        <div className="card-img card-img-1"></div>
                        <div className="card-text">
                          <h3 className="card-title bold-700">Pandemic Discount</h3>
                          <p
                            className="card-subtitle regular-400"
                            id="card-subtitle-1"
                          >
                            12 July, 2021 till 22 July, 2021
                          </p>
                          <a
                            href="#"
                            className="card-button click"
                            data-toggle="modal"
                            data-target="#eventModal"
                          >
                            More Info
                          </a>
                        </div>
                      </div>
                     */}
                      </div>
                    ) : (
                      <div className="events-noData">No Previous Events</div>
                    )}
                  </div>
                  <div className="col-lg-4">
                    <div className="blog_right_sidebar">
                      <aside className="single_sidebar_widget search_widget">
                        <form action="event-detail">
                          <div className="form-group">
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search Keyword"
                                onfocus="this.placeholder = ''"
                                onblur="this.placeholder = 'Search Keyword'"
                              />
                              <div className="input-group-append">
                                <button className="btn" type="button">
                                  <i className="fa fa-search"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <button
                            className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                            type="submit"
                          >
                            Search
                          </button>
                        </form>
                      </aside>
                      <aside className="single_sidebar_widget post_category_widget">
                        <h4 className="widget_title">Events By Category</h4>
                        <ul className="list cat-list">
                          <li>
                            <a href="#event-detail" className="d-flex">
                              <p>Business Startup Services</p>
                              <p>(37)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>Corporate Advisory</p>
                              <p>(10)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>Financial Funding and Debt Mgmt.</p>
                              <p>(03)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>Outsourcing Services</p>
                              <p>(11)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>Foreign Company Setup in India</p>
                              <p>(21)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>Income tax Advisory</p>
                              <p>(09)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>International Taxation</p>
                              <p>(05)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>FEMA and FERA Advisory</p>
                              <p>(12)</p>
                            </a>
                          </li>
                        </ul>
                      </aside>
                      <aside className="single_sidebar_widget post_category_widget">
                        <h4 className="widget_title">Months / Archive</h4>
                        <ul className="list cat-list">
                          <li>
                            <a href="#" className="d-flex">
                              <p>May 2021</p>
                              <p>(37)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>April 2021</p>
                              <p>(10)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>March 2021</p>
                              <p>(03)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>June 2021</p>
                              <p>(11)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>January 2021</p>
                              <p>(21)</p>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="d-flex">
                              <p>February 2021</p>
                              <p>(09)</p>
                            </a>
                          </li>
                        </ul>
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Modal --> */}
        <div className="modal fade" id="eventModal" role="dialog">
          <div className="modal-dialog" style={{ width: "480px" }}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Events</h4>
              </div>
              <div className="modal-body">
                <p>
                  Enter your name and email address to get access of event
                  section.
                  <br />* Don't Worry You'll Not be Spammed
                </p>
                <div className="row center" style={{ width: "360px" }}>
                  <form method="post">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        className="form-control inputpane"
                        placeholder="Enter Your Name"
                      />
                      <span
                        id="error"
                        className="error"
                        style={{ display: "none", color: "red" }}
                      >
                        Enter User Name
                      </span>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="emailaddress"
                        id="emailaddress"
                        className="form-control inputpane"
                        placeholder="Enter Your Email Address"
                      />
                      <span
                        id="err"
                        className="error"
                        style={{ display: "none", color: "red" }}
                      >
                        Enter email address
                      </span>
                    </div>
                    <div className="text-center">
                      <a
                        href="#"
                        className="button newsletter no-pip"
                        name=""
                        id=""
                      >
                        Submit
                        <span>
                          <i className="fa fa-envelope-o"></i>
                        </span>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Newsletter />
        <Footer />
      </>
    );
  }
}
