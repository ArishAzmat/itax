import React, { Component } from "react";
import Footer from "../../Common/footer";
import Newsletter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";

export default class videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featured: [],
      others: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    RestApi.videos().then((res) => {
      // console.log("videos", res);
      this.setState({
        featured: res.data.data.featured,
        others: res.data.data.others,
      });
    });
  }
  render() {
     
      return (
        <div>
          <div className="breadcrumbpane">
            <div className="container">
              <h1 className="pull-left">Videos</h1>
            </div>
          </div>
          <section>
            {this.state.featured.length > 0 && (
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="section-title text-center">
                      <h2>Featured Videos</h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="show-videos">
                    {this.state.featured.map((each, key) => {
                      let videoUrl = each.video_link.slice(
                        each.video_link.lastIndexOf("=") + 1,
                        each.video_link.length
                      );
                      return (
                        <div className="col-md-3" key={key}>
                          <div className="videos">
                            <iframe
                              width="100%"
                              height="226"
                              src={`https://www.youtube.com/embed/${videoUrl}`}
                              frameBorder="0"
                              allowfullscreen=""
                            ></iframe>
                            <div className="videosdesc">
                              <h5>{each.video_heading}</h5>
                              <p>{each.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr />
              </div>
            )}
            {this.state.others.length > 0 && (
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="section-title text-center">
                      <h2>Other Videos</h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="show-videos">
                    {this.state.others.map((each, key) => {
                      let videoUrl = each.video_link.slice(
                        each.video_link.lastIndexOf("=") + 1,
                        each.video_link.length
                      );
                      return (
                        <div className="col-md-3" key={key}>
                          <div className="videos">
                            <iframe
                              width="100%"
                              height="226"
                              src={`https://www.youtube.com/embed/${videoUrl}`}
                              frameBorder="0"
                              allowfullscreen=""
                            ></iframe>
                            <div className="videosdesc">
                              <h5>{each.video_heading}</h5>
                              <p>{each.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {this.state.featured < 1 && this.state.others < 1 && <div className="row">
          <div className="col-md-12">
            <div className="section-title text-center">
              <h2>No Videos</h2>
            </div>
          </div>
        </div>}
          </section>

          {/* <!---------------------------Newsletter Section----------------------------> */}
          <Newsletter />
          <Footer />
        </div>
      );
    
  }
}
