import React, { useEffect, useState } from "react";
import serviceImage from "../../images/service/s1.jpg";
import moneyBagIcon from "../../images/service/money-bag-icon.png";
import RestApi from "../../services/api";
import { Link } from "react-router-dom";
import Common from "../../Common/common";

export default function Services(props) {
  const [data, setDate] = useState([]);

  useEffect(() => {
    RestApi.categories().then((res) => {
      // console.log("service", res);
      if (res.data.status) {
        props.setService(res.data.data)
        let filtered = res.data.data.filter(i => i.show_on_home_page == 1)
        let groupedData = Common.groupBy(['sequence_no'])(filtered)
     
     
        setDate(groupedData);
      }
    });
  }, []);
  return (
    <section>
      <div className="our_department_area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h2>
                  Explore Our <span>Services</span>
                </h2>
                <p>
                  We provide a variety of services to our clients which make us
                  a one stop financial solution under one roof for our clients.
                  The range of services which are provided by us are as under:{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {Object.entries(data).length > 0  &&
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
                            <Link to={`/service-details/${each[1][0].category_id}`} > {each[1][0].category_name}</Link>
                          </h3 >
                          <p>
                            {each[1][0].category_description.length > 130
                              ? each[1][0].category_description.slice(0, 130) + "..."
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
                      Under corporate advisory we provide the following services
                      to our esteemed...
                    </p>
                    <a href="#" className="readmore">
                      Read More...
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
           
          </div>
          <Link to="/services" className="viewall-services">
            View All Services...
          </Link>
        </div>
      </div>
    </section>
  );
}
