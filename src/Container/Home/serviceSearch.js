import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Common from "../../Common/common";
import Footer from "../../Common/footer";
import Newsletter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";

class ServiceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      activeService: "",
      responseData: [],
      search: this.props.match.params.id,
      categories: [],
      totalRecords:0
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    RestApi.categories()
      .then((res) => {
        // console.log(res);
        if (res.data.status) {
          let data = [];
          if (this.state.search && this.state.search.length > 0) {
            data = Common.filterArray(res.data.data, this.state.search, [
              "service_name",
              "service_description",
              "category_name",
            ]);
          } else {
            data = res.data.data;
          }
          let totalRecords = data.length
          // console.log("data",data)
          let groupedServices = Common.groupBy(["category_id"])(data);
          let allCategories = Common.groupBy(["category_id"])(res.data.data);
          // console.log("res", res.data.data);
          // let categoryIDs = [];
          // res.data.data.map((c) => {
          //   if (!categoryIDs.includes(c.category_id)) {
          //     categoryIDs.push(c.category_id);
          //   }
          // });
          // let category = this.props.categories.filter((i)=> categoryIDs.includes(i.id))
          // console.log("categories",categoryIDs)
          // console.log("categories",category)
          this.setState({
            services: groupedServices,
            responseData: res.data.data,
            activeService: Object.keys(groupedServices)[0],
            categories: allCategories,
            totalRecords
          });
        }
      })
      .catch((e) => {
        console.log("Error: ", e);
        this.setState({
          services: [],
          activeService: "",
          responseData: [],
          search: this.props.match.params.id,
          categories: [],
        });
      });
  }
  handleActiveServie(serviceId) {
    this.setState({
      activeService: serviceId,
    });
  }
  handleSearch(e) {
    if (this.props.match.params.id && this.props.match.params.id.length > 0) {
      // window.history.pushState({}, document.title, "/" + "search");
    }

    let search = e;
    let data = [];
    if (search.length > 0) {
      // filterArray takes (array,keyword,and keys) parameters and returns search result
      data = Common.filterArray(this.state.responseData, search, [
        "service_name",
        "service_description",
        "category_name",
      ]);
    } else {
      data = this.state.responseData;
    }
    let totalRecords = data.length
    let services = Common.groupBy(["category_id"])(data);
    // console.log("-----",data);
    let activeService = Object.keys(services)[0];
    this.setState({
      services,
      activeService,
      search,
      totalRecords
    });
  }
  // handleReset = () => {
  //   this.setState({
  //     search: "",
  //     activeService: Object.keys(this.state.services)[0],
  //   });
  // };
  render() {
    let { services, search, activeService, totalRecords,categories } = this.state;
    return (
      <div>
        <div class="breadcrumbpane">
          <div class="container">
            <h1 class="pull-left">SERVICE SEARCH RESULT</h1>
          </div>
        </div>
        <div class="container clearfix">
          <div class="row">
            <div class="col-md-4 services_list services_heading">
              <h3>Our services list</h3>
              <div className="current-opening">
                <ul class="nav nav-pills flex-column" role="tablist">
                  {Object.entries(categories).map((each, key) => {
                    //   let category = categories.filter(i => i.id == each[0])
                    // console.log("sss",services[each[0]])
                    return (
                      <li
                        key={key}
                        onClick={() => this.handleActiveServie(each[0])}
                        class={`nav-item ${
                          services[each[0]]?.length > 0 &&
                          search.length > 0 &&
                          each[0] != activeService &&
                          "searchHasService"
                        } ${each[0] == activeService && "active"}`}
                      >
                        <a
                          href={`#${each[0]}`}
                          aria-controls={each[0]}
                          data-toggle="pill"
                        >
                          <strong>{each[1][0].category_name}</strong>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="center-align-content">
            <div class="col-md-8">
              <div class="search_help">
                <form class="sky-form" novalidate="novalidate">
                  <fieldset>
                    <section>
                      <div class="row">
                        <div class="col col-12">
                          <label class="input">
                              <i class="s-search-icon icon-append fa fa-search"></i>
                            
                            <input
                              onChange={(e) => this.handleSearch(e.target.value)}
                              type="text"
                              value={this.state.search}
                              placeholder="Search.."
                            />
                          </label>
                        </div>
                      </div>
                    </section>
                  </fieldset>
                </form>
              </div>
              </div>
            </div>
              <div class="col-md-8">
              {/* <div class="search_help"> 
                <input
                  onChange={(e) => this.handleSearch(e)}
                  type="text"
                  value={this.state.search}
                  class="form-control inputpane"
                  placeholder="Search.."
                />
                <button class="but_feild button">search</button>
              </div> */}
              <div class="tab-content serviceSearchBox current-opening tab_con">
                {/* <!----financial-----> */}
                {/* <ReactFilter
                 value={this.state.search}
                 data={this.props.categories}
                 renderResults={results => (
                   <div>
                     {results.map((el) => {
                       console.log(el)
                       return(
                        <div>
                          <span>{el.name}</span>
                          <span>{el.email}</span>
                        </div>
                      )
                     })}
                   </div>
                 )} /> */}
                  {search.length > 0 && Object.entries(services).length > 0 &&  (
                   
                          <div className="serviceSearchResults">
                            {totalRecords} results found for
                            search keyword "{search}".{" "}
                            <span
                              className="select-click-here "
                              onClick={() => {
                                this.handleSearch("");
                              }}
                            >
                              Click to view all services 
                            </span>{" "}
                            or search using some other keywords.{" "}
                          </div>
                        )}
                {Object.entries(services).length > 0 ? (
                  Object.entries(services).map((each, key) => {
                    // console.log(each)
                    return (
                      <div
                        key={key}
                        role="tabpanel"
                        class={` tab-pane mt-10 ${
                          activeService == each[0] && "active"
                        }`}
                        id={each[0]}
                      >
                       
                        <div class="panel-group" id={`accordion${each[0]}`}>
                          {each[1].length > 0 &&
                            each[1].map((item, iKey) => {
                              // console.log("item",item)
                              return (
                                <div class="panel panel-default services_details clearfix">
                                  <a
                                    class="accordion-toggle collapsed"
                                    data-toggle="collapse"
                                    data-parent={`#accordion${each[0]}`}
                                    href={`#collapse${each[0]}${iKey}`}
                                    aria-expanded="false"
                                  >
                                    <h4 class="panel-title">
                                      <i
                                        class="fa fa-asterisk"
                                        aria-hidden="true"
                                      ></i>{" "}
                                      {item.service_name}
                                      <i class="arrow fa fa-angle-down"></i>
                                    </h4>
                                  </a>
                                  <div
                                    id={`collapse${each[0]}${iKey}`}
                                    class="panel-collapse collapse"
                                    aria-expanded="false"
                                  >
                                    <div class="panel-body">
                                      <div class="col-md-12">
                                        <>
                                          {" "}
                                          <p>{item.service_description}</p>
                                          <p>
                                            <Link
                                              to={`/service-details/${item.category_id}/${item.service_id}`}
                                              class="readmore"
                                            >
                                              Apply Now
                                            </Link>
                                          </p>
                                        </>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="serviceSearchResults">
                    {" "}
                    No search results found for the keyword "{search}". Try
                    using some other keywords or{" "}
                    <span
                      className="select-click-here "
                      onClick={() => {
                        this.handleSearch("");
                      }}
                    >
                      <u> click to view all services</u>{" "}
                    </span>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Newsletter />
        <Footer />
      </div>
    );
  }
}
ServiceSearch.defaultProps = {
  categories: [],
  activeMenu: "home",
};
export default connect((state, props) => {
  return {
    // categories: state?.categories
  };
})(ServiceSearch);
