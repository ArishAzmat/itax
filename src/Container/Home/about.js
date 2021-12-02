import React, { Component } from "react";
import OurTeam from "../../Components/home/ourTeam";
import Header from "../../Common/header";
import Footer from "../../Common/footer";
import NewsLetter from "../../Components/home/subscribeNewsletter";
import aboutImage from "../../images/about/about.png";
import teamWorkImage from "../../images/about/teamwork.jpg";
import RestApi from "../../services/api";
export default class about extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {
        heading: "",
        description: "",
        image: "",
      },
      teams: {
        heading: '',
        data: []
      },
      about6T: {
        heading: "",
        content: [],
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    RestApi.aboutUs().then((response) => {
      // console.log(response.data);
      if (response.data.status) {
        let about = {
          heading: response.data.data.about_us_profile_heading,
          description: response.data.data.about_us_profile.aboutus_content,
          image: response.data.data.about_us_profile.image,
        };
        let teams = {data: response.data.data.about_us_team, heading: response.data.data.about_us_team_heading};
        let about6T = {
          heading: response.data.data.about_us_6t_heading,
          content: response.data.data.about_us_6t,
        };
        this.setState({
          about,
          teams,
          about6T,
        });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {" "}
        <Header />
        <div id="home-page">
          <div className="breadcrumbpane">
            <div className="container">
              <h1 className="pull-left">About Us</h1>
            </div>
          </div>
          {/* <!-- start: about section --> */}
          <section>
            <div className="container">
              {/* {" description starts"} */}

              <div className="row">
                <div className="col-md-12">
                  <div className="section-title text-center">
                    <h2>{this.state.about.heading}</h2>
                  </div>
                  {/* <!-- /.section-title --> */}
                </div>
              </div>

              <div className="about-info">
                <div className="row">
                  <div className="col-md-7">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.state.about.description,
                      }}
                    />
                  </div>

                  <div className="col-md-5">
                    <img
                      src={this.state.about.image}
                      alt="about img"
                      className="img-responsive center-block about-image"
                      // style={{ width: "100%", height: "285px" }}
                    />
                  </div>
                </div>
              </div>
              {/* <!-- /.about-info --> */}
            </div>
          </section>
          {/* <!-- end: about section-->
<!-- start: 6-T section --> */}
          <section className="dark-gray-bg">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-title text-center">
                    <h2>{this.state.about6T.heading}</h2>
                    <p></p>
                  </div>
                </div>
                {this.state.about6T.content.map((each, key) => {
                  return (
                    <div key={key} className="col-md-6">
                      <div className="about-service">
                        <div className="row">
                          <div className="col-md-12">
                            <h2>{each.header}</h2>
                            <p>
                              <img
                                src={each.image}
                                alt="TEAM WORK"
                                className="img-responsive"
                              />{each.description}
                              <em>
                                <strong>‘One plus One Makes Eleven’</strong>
                              </em>
                              .<br />
                              <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* <div className="col-md-6">
                  <div className="about-service">
                    <div className="row">
                      <div className="col-md-12">
                        <h2>TEAM WORK</h2>
                        <p>
                          <img
                            src={teamWorkImage}
                            alt="TEAM WORK"
                            className="img-responsive"
                          />{" "}
                          We are a team of well professionally qualified persons
                          having vast experience in distinctive financial and
                          legal services. The total experience of our team for
                          more than 40 years is enough to show you our strength.
                          We work as a team as we believe in the concept of{" "}
                          <em>
                            <strong>‘One plus One Makes Eleven’</strong>
                          </em>
                          .<br />
                          <br />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                */}
              </div>
            </div>
          </section>
          {/* <!-- end: 6-T section --> */}
          {this.state.teams.data.length > 0 && <OurTeam teams={this.state.teams} />}
          {/* <!-- start: team section --> */}
          <NewsLetter />
        </div>{" "}
        <Footer/>
      </React.Fragment>
    );
  }
}
