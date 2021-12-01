import React, { useState, useEffect } from "react";
import RestApi from "../../services/api";
import Images from "../../images/index";
import { Link } from "react-router-dom";
import Marquee from "react-easy-marquee";
export function Calender(props) {
  const [year, setYear] = useState(new Date().getFullYear());
  console.log(year);
  return (
    <div className="col-xl-3 col-md-6 col-lg-3">
      <div className="single_department other-act">
        <div className="department_content">
          <h3>Calendar</h3>
          <div className="circle">
            <h2>
              <i
                style={{
                  fontSize: "31px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => setYear(year - 1)}
                className="fa fa-angle-left"
              />{" "}
              <span className="calender-year"> {year}</span>{" "}
              <i
                style={{
                  fontSize: "31px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => setYear(year + 1)}
                className="fa fa-angle-right"
              />
            </h2>
            <Link to={`calendar/1/${year}`}>
              <img
                className="jan"
                title="January"
                data-toggle="tooltip"
                id="jan"
                src={Images.jan}
              />
            </Link>
            <Link to={`calendar/2/${year}`}>
              <img
                className="feb"
                title="February"
                data-toggle="tooltip"
                id="feb"
                src={Images.feb}
              />
            </Link>
            <Link to={`calendar/3/${year}`}>
              <img
                className="mar"
                title="March"
                data-toggle="tooltip"
                id="mar"
                src={Images.march}
              />
            </Link>
            <Link to={`calendar/4/${year}`}>
              <img
                className="apr"
                title="April"
                data-toggle="tooltip"
                id="apr"
                src={Images.april}
              />
            </Link>
            <Link to={`calendar/5/${year}`}>
              <img
                className="may"
                title="May"
                data-toggle="tooltip"
                id="may"
                src={Images.may}
              />
            </Link>
            <Link to={`calendar/6/${year}`}>
              <img
                className="june"
                title="June"
                data-toggle="tooltip"
                id="june"
                src={Images.june}
              />
            </Link>
            <Link to={`calendar/7/${year}`}>
              <img
                className="july"
                title="July"
                data-toggle="tooltip"
                id="july"
                src={Images.july}
              />
            </Link>
            <Link to={`calendar/8/${year}`}>
              <img
                className="aug"
                title="August"
                data-toggle="tooltip"
                id="aug"
                src={Images.august}
              />
            </Link>
            <Link to={`calendar/9/${year}`}>
              <img
                className="sept"
                title="September"
                data-toggle="tooltip"
                id="sept"
                src={Images.sept}
              />
            </Link>
            <Link to={`calendar/10/${year}`}>
              <img
                className="oct"
                title="October"
                data-toggle="tooltip"
                id="oct"
                src={Images.oct}
              />
            </Link>
            <Link to={`calendar/11/${year}`}>
              <img
                className="nov"
                title="November"
                data-toggle="tooltip"
                id="nov"
                src={Images.nov}
              />
            </Link>
            <Link to={`calendar/12/${year}`}>
              <img
                className="dec"
                title="December"
                data-toggle="tooltip"
                id="dec"
                src={Images.dec}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Events() {
  const [data, setData] = useState({ upComing: [], previous: [] });
  useEffect(() => {
    RestApi.homeEvents().then((res) => {
      console.log("events: ", res);
      if (res.data.status) {
        setData({
          upComing: res.data.data.upcoming,
          previous: res.data.data.previous,
        });
      }
    });
  }, []);
  return (
    <div className="col-xl-3 col-md-6 col-lg-3">
      <div className="single_department other-act">
        <div className="department_content">
          <h3>Events</h3>
          {data.upComing.length > 0 || data.previous.length > 0 ? (
            <p>
              <div className="events">
                 {/* <Marquee
  duration={5000}
  height="245px"
  width="100%"
  axis="Y"
  align="start"
  pauseOnHover={true}
  reverse={true}
> */}
                <marquee
                  style={{ height: "240px" }}
                  behavior="scroll"
                  direction="up"
                  scrolldelay="200"
                  onmouseover="stop()"
                  onmouseout="start()"
                >
                  {data.upComing?.length > 0 && (
                    <>
                      <h3>UPCOMING EVENTS</h3>
                      <ul>
                        {data.upComing.map((each, i) => {
                          return (
                            <li key={i}>
                              <Link to={`events`}> {each.heading}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                  {data.previous?.length > 0 && (
                    <>
                      <h3>PREVIOUS EVENTS</h3>
                      <ul>
                        {data.previous.map((each, i) => {
                          return (
                            <li key={i}>
                              <Link to={`events`}>{each.heading}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </marquee>
              </div>
            </p>
          ) : (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              {" "}
              No Events Available{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DownloadForm() {
  return (
    <div className="col-xl-3 col-md-6 col-lg-3">
      <div className="single_department other-act">
        <div className="department_content">
          <h3>Downloads</h3>
          <p>
            <div className="downloadform">
              <ul>
                <a href="#">
                  <Link to="/download_form">
                    {" "}
                    <li>
                      {" "}
                      <i className="fa fa-buysellads"></i>Form{" "}
                    </li>
                  </Link>
                </a>
                <a href="#">
                  <Link to="faq">
                    <li>
                      <i className="fa fa-question-circle"></i>FAQ
                    </li>
                  </Link>
                </a>
                <a href="#">
                  {" "}
                  <Link to="/newsletters">
                    <li>
                      <i className="fa fa-envelope"></i>Newsletter
                    </li>
                  </Link>
                </a>
                <a href="#">
                  <Link to="/videos">
                    {" "}
                    <li>
                      <i className="fa fa-file-video-o"></i>Videos
                    </li>
                  </Link>
                </a>
                <a href="#">
                  <Link to="/case-law">
                    {" "}
                    <li>
                      <i className="fa fa-briefcase"></i>Case Law
                    </li>
                  </Link>
                </a>
              </ul>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

// export default features
