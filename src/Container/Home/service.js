import React, { Component } from "react";
import Header from "../../Common/header";
import Footer from "../../Common/footer";
import serviceImage from "../../images/service/s1.jpg";
import moneyBagIcon from "../../images/service/money-bag-icon.png";
import NewsLetter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";
import Common from "../../Common/common";
import { Link } from "react-router-dom";

export default class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    RestApi.categories().then((res) => {
      // console.log("servicePage: ", res.data.data);
        let groupedData = Common.groupBy(['sequence_no'])(res.data.data)
     
      // let groupedData = Common.groupBy(['category_id'])(res.data.data);
      if (res.data.status) {
        this.setState({
          data: groupedData,
        });
      }
    });
  }
  render() {
    const { data } = this.state;
    return (
      <>
        <div id="home-page">
          <div className="breadcrumbpane">
            <div className="container">
              <h1 className="pull-left">Explore Our Services</h1>
            </div>
          </div>
          {/* <!-- start: service section --> */}
          <section>
            <div className="our_department_area">
              <div className="container">
                <div className="row">
                  {Object.entries(data).length > 0 &&
                    Object.entries(data).map((each) => {
                      return (
                        <div key={each[0]} className="col-xl-3 col-md-6 col-lg-3">
                          <div className="single_department">
                            <div className="department_thumb">
                              <img src={each[1][0].category_image} alt="" />
                            </div>
                            <div className="department_content">
                              <div className="iconimagetitle">
                                {/* <!-- <i className="fa fa-usd" aria-hidden="true"></i> -->  */}
                                <img src={moneyBagIcon} />
                                <h3  className={each[1][0].category_name.length < 34 ? `service-heading`: `service-if-text`}>
                                  <Link to={`/service-details/${each[1][0].category_id}`}>{each[1][0].category_name}
                                  </Link>
                                </h3>
                                <p>
                                  {each[1][0].category_description.length > 130
                                    ? each[1][0].category_description.slice(0, 130)+"..."
                                    : each[1][0].category_description}
                                </p>
                                <Link to={`/service-details/${each[1][0].category_id}`} className={each[1][0].category_name.length < 34 ? `readmore readmore-if-greater-text`: `readmore r`}>
                            Read More...
                            
                          </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {/* <div className="col-xl-3 col-md-6 col-lg-3">
                    <div className="single_department">
                      <div className="department_thumb">
                        <img src={serviceImage} alt="" />
                      </div>
                      <div className="department_content">
                        <div className="iconimagetitle">
                          <img src={moneyBagIcon} />
                          <h3>
                            <a href="#"> &nbsp;&nbsp;Corporate Advisory</a>
                          </h3>
                          <p>
                            Under corporate advisory we provide the following
                            services to our esteemed...
                          </p>
                          <a href="#" className="readmore">
                            Read More...
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </section>
          {/* <!-- end: service section--> */}
          <NewsLetter />
          <Footer />
        </div>
      </>
    );
  }
}
