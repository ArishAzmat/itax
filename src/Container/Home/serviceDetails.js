import React, { Component } from "react";
import { set } from "react-hook-form";
import Footer from "../../Common/footer";
import Newsletter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";
import ApplySerive from "../../Components/home/applyService";
import { Link } from "react-router-dom";

export default class ServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: {},
      services: [],
      relatedServices: [],
      applyForm: false,
      activeService: {},
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.id != this.props.match.params.id || prevProps.match.params.Sid != this.props.match.params.Sid ){
      this.fetchData();
    }
  }
  fetchData() {
    let id = this.props.match.params.id;
    let sId = this.props.match.params.sId;
    if (id) {
      RestApi.services(id).then((res) => {
        console.log("sevices", res);
        let activeService={}
        let applyForm = false
        if (res.data.status) {
          if(sId){
            activeService = res.data.data.services.filter((e)=>e.id == sId)
            applyForm = true
          }
          this.setState({
            title: res.data.data.category.category_name,
            category: res.data.data.category,
            services: res.data.data.services,
            relatedServices: res.data.data.related_services,
            activeService,
            applyForm,
          });
        }
      });
    
    }
  }
  handelApply(service) {
    if (!this.state.applyForm) {
      this.setState({
        activeService: service,
        applyForm: true,
      });
    } else {
      this.setState({
        activeService: {},
        applyForm: false,
      });
    }
  }

  render() {
  console.log(this.props.match.params.sId,this.state)
    let {
      title,
      category,
      services,
      relatedServices,
      applyForm,
      activeService,
    } = this.state;
    return (
      <>
        <div class="breadcrumbpane">
          <div class="container">
            <h1 class="pull-left"> {title}</h1>
          </div>
        </div>
        <section id="about">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="section-title text-center">
                  {/* <p>Business Startup Services</p>  */}
                </div>
                {/* <!-- /.section-title --> */}
              </div>
            </div>

            <div class="about-info">
              <div class="row">
                {!applyForm ? (
                  <div class="col-md-8">
                    <p class="p-10 mb-0">{category.description}</p>
                    <div class="panel-group" id="accordion">
                      {services.length > 0 &&
                        services.map((each) => {
                          return (
                            <div class="panel panel-default">
                              <a
                                class="accordion-toggle"
                                data-toggle="collapse"
                                data-parent="#accordion"
                                href={`#collapse${each.id}`}
                              >
                                <div class="panel-heading panel-heading-active">
                                  <h4 class="panel-title">
                                    <i class="fa fa-gg" aria-hidden="true"></i>{" "}
                                    {each.service_name}
                                  </h4>
                                </div>
                              </a>
                              <div
                                id={`collapse${each.id}`}
                                class="panel-collapse collapse in"
                              >
                                <div class="panel-body">
                                  <div class="col-md-1">
                                    <i
                                      class="fa fa-briefcase fa-3x"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div class="col-md-11">
                                    <p>{each.description}</p>
                                    <a
                                      onClick={() => this.handelApply(each)}
                                      class="readmore"
                                    >
                                      Apply Now
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      {/* <div class="panel panel-default">
                      <a
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapse2"
                      >
                        <div class="panel-heading">
                          <h4 class="panel-title">
                            <i class="fa fa-gg" aria-hidden="true"></i>{" "}
                            Statutory Registrations
                          </h4>
                        </div>
                      </a>
                      <div id="collapse2" class="panel-collapse collapse">
                        <div class="panel-body">
                          <div class="col-md-1">
                            <i
                              class="fa fa-briefcase fa-3x"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <div class="col-md-11">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim
                              veniam, quis nostrud exercitation ullamco laboris
                              nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <a href="#" class="readmore">
                              Apply Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="panel panel-default">
                      <a
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapse3"
                      >
                        <div class="panel-heading">
                          <h4 class="panel-title">
                            <i class="fa fa-gg" aria-hidden="true"></i> Project
                            Evaluation & Viability Studies
                          </h4>
                        </div>
                      </a>
                      <div id="collapse3" class="panel-collapse collapse">
                        <div class="panel-body">
                          <div class="col-md-1">
                            <i
                              class="fa fa-briefcase fa-3x"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <div class="col-md-11">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim
                              veniam, quis nostrud exercitation ullamco laboris
                              nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <a href="#" class="readmore">
                              Apply Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    </div>
                  </div>
                ) : (
                  <ApplySerive  service={activeService} />
                )}

                <div class="col-md-4">
                  <div class="mb-10">
                    <a href="#" class="readmore create-new-service">
                      Create Your Own Services
                    </a>
                  </div>
                  <div class="servicebox">
                    <h3>Our Related Services</h3>
                    <div class="relatedservicesbox">
                      <a >
                        {/* <h4>Financial Funding and Debt Mgmt.</h4> */}
                        <ul>
                          {relatedServices.length > 0 &&
                            relatedServices.map((each, key) => {
                              return (
                              <Link to={`/service-details/${each.category_id}/${each.id}`}>  <li>
                                  <i class="fa fa-cog"></i>{each.service_name}
                                </li>
                                </Link>
                              );
                            })}
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Newsletter />
        <Footer />
      </>
    );
  }
}
