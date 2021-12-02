import React, { Component } from "react";
import RestApi from "../../services/api";
import Footer from "../../Common/footer";
import Newsletter from "../../Components/home/subscribeNewsletter";

export default class eventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    let id = this.props.match.params.id;
    if (id) {
      RestApi.eventDetails(id).then((res) => {
        // console.log("event Details", res);
        if (res.data.status) {
          this.setState({
            data: res.data.data,
          });
        }
      });
    }
  }
  render() {
    return (
      <>
        <section className="blog_area single-post-area section-padding">
          <div className="breadcrumbpane">
            <div className="container">
              <h1 className="pull-left">Event</h1>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="blog_left_sidebar">
                  <article className="blog_item post">
                    <div className="blog_item_img entry-content p-0">
                      {this.state.data.event_image && (
                        <img
                          className="card-img rounded-0"
                          src={this.state.data.event_image}
                          alt="event"
                        />
                      )}
                      {this.state.data?.date && (
                        <div className="entry-date">{this.state.data.date}</div>
                      )}
                    </div>
                    <div className="blog_details p-20">
                      <a className="d-inline-block" href="#">
                        {this.state.data?.heading && (
                          <h2>{this.state.data.heading}</h2>
                        )}
                      </a>
                      {this.state.data?.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: this.state.data?.description,
                          }}
                        />
                      )}
                    </div>
                  </article>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="blog_right_sidebar">
                  <aside className="single_sidebar_widget search_widget">
                    <form action="#">
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
                    <h4 className="widget_title">Related Events</h4>
                    <ul className="list cat-list">
                      <li>
                        <a href="#" className="d-flex">
                          <p>Formation of Business Entity</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Statutory Registrations</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Project Evaluation & Viability Studies</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Techno Economic Viability</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Accounting and Book Keeping</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Providing a virtual office</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Statutory Returns filing</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="d-flex">
                          <p>Start up Counseling</p>
                        </a>
                      </li>
                    </ul>
                  </aside>
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
