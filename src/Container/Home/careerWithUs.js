import React, { Component,useState } from "react";
import Header from "../../Common/header";
import NewsLetter from "../../Components/home/subscribeNewsletter";
import sliderImage from "../../images/slider/slider1.jpg";
import RestApi from "../../services/api";
import ModalRoot from "../../Components/modal/modalRoot";
import CareerForm ,{CareerPageForm}from "../../Components/home/careerForm";
import Footer from "../../Common/footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

export default class career extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [],
      openModal: false,
      placeholder: {},
      activePosition:{}
    };
  }

  componentDidMount() {
    this.fetchData();
    this.placeHolderAPI();
  }
  fetchData = () => {
    RestApi.careers().then((res) => {
      // console.log("careers", res);
      let positions = res.data.data;
      this.setState({ positions });
    });
  };
  placeHolderAPI() {
    RestApi.placeholder("career").then((res) => {
      // console.log("placeHolder: career: ", res);
      this.setState({ placeholder: res.data.data });
    });
  }
  render() {
    return (
      <>
        <Header />
        <div>
          <div className="breadcrumbpane">
            <div className="container">
              <h1 className="pull-left">CAREER - JOIN US</h1>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                {this.state.positions.length > 0 &&
                  this.state.positions.map((each, key) => {
                    return (
                      <div className="current-opening">
                        <div className="border" key={key}>
                          <h3 className="job-summary">Position :{each.position}</h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: each.job_details,
                            }}
                          />
                          <div className="text-center">
                            <a
                              className="button newsletter no-pip"
                              data-toggle="modal"
                              data-target="#apply_modal"
                              onClick={() => this.setState({ openModal: true,activePosition: each})}
                            >
                              Apply Now
                              <span>
                                <i className="fa fa-arrow-circle-right"></i>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {/* <div className="current-opening">
                  <div className="border">
                    <h3 className="job-summary">Position : Finance Associate</h3>
                    <div className="jobs-location mt-10">
                      <h4>LOCATION&nbsp;: &nbsp;</h4>Mumbai
                    </div>
                    <div className="jobs-qualification">
                      <h4>QUALIFICATION&nbsp;: &nbsp;</h4>Bachelor’s degree in
                      commerece or ACA.
                    </div>
                    <div className="jobs-experience">
                      <h4>EXPERIENCE&nbsp;: &nbsp;</h4>2-3 Years
                    </div>
                    <div className="jobs-skills">
                      <h4>Job Description:</h4>
                      <br />
                      <li>
                        Good Communication, analytical skills and able to
                        comprehend and resolve complex queries and processes.
                      </li>
                      <li>
                        Identify and make suggestions for improvements when
                        problems and/or opportunities arise.
                      </li>
                      <li>
                        Prepares special audit and control reports by
                        collecting, analyzing, and summarizing operating
                        information and trends.
                      </li>
                      <li>
                        Ensure compliance to high international accounting
                        standards, company policies and protocol and contractual
                        requirements
                      </li>
                      <li>Follow risk management and compliance procedures</li>
                      <li>Good documentation &amp; communication skills.</li>
                      <li>Excellent teamwork</li>
                      <li>
                        Able to contribute and drive continuous process
                        improvements program.
                      </li>
                    </div>
                    <div className="text-center">
                      <a
                        className="button newsletter no-pip"
                        data-toggle="modal"
                        data-target="#apply_modal"
                        href="#"
                      >
                        Apply Now
                        <span>
                          <i className="fa fa-arrow-circle-right"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
               */}
              </div>
              {this.state.placeholder?.image &&
                this.state.placeholder?.description && (
                  <div className="col-md-4">
                    <div className="blog_right_sidebar">
                      <aside className="single_sidebar_widget">
                        <img
                          src={this.state.placeholder.image}
                          style={{ width: "100%" }}
                        />
                        {this.state.placeholder?.header && <h4 className="place_title">{this.state.placeholder.header}</h4>}{" "}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: this.state.placeholder.description,
                          }}
                        />
                      </aside>
                    </div>
                  </div>
                )}

              <div className="col-md-4">
                <CareerPageForm/>
              </div>
            </div>
          </div>
        </div>

        {/* // <!---------------------------modal--------------------------------------------> */}
        {this.state.openModal && <ModalRoot
          title={"CAREER OPPORTUNITIES"}
          close={() => this.setState({ openModal: false })}
          isOpen={this.state.openModal}
          body={<CareerForm service={this.state.activePosition} />}
        />}
        <NewsLetter />
        <Footer />
      </>
    );
  }
}
