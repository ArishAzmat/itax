import React, { Component } from "react";
import Footer from "../../Common/footer";
import RestApi from "../../services/api";
import Common from "../../Common/common";
import Newsletter from "../../Components/home/subscribeNewsletter";
export default class downloadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: {},
      data: [],
      activeCategory: 0,
      response: [],
    };
  }

  componentDidMount() {
    this.fetchData();
    this.placeHolderAPI();
  }

  placeHolderAPI() {
    RestApi.placeholder("download-forms").then((res) => {
      // console.log("placeHolder: downloadFOrm: ", res);

      this.setState({ placeholder: res.data.data });
    });
  }
  fetchData() {
    RestApi.downloadForm().then((res) => {
      // console.log("downloadFOrm: ", res);
      let grouped = Common.groupBy(["Service_category_id"])(res.data.data);
      if (res.data.status) {
        this.setState({
          data: grouped,
          response: res.data.data,
          activeCategory:0,
        });
      }
    });
  }
  handleChange(e) {
    this.setState({
      activeCategory: e.target.value,
    });
  }
  render() {
    let formData = [];
    // console.log("state", this.state);
    let { data, response,activeCategory } = this.state;
    if (activeCategory == "0") {
      formData = response;
    } else {
      formData = data[activeCategory];
    } 
    return (
      <div>
        <div className="breadcrumbpane">
          <div className="container">
            <h1 className="pull-left">Download Forms</h1>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12 section-title">
                <div className="form-group alignitem-horizontal-center clearfix">
                  <div className="pull-left">
                    <span>SELECT SERVICES CATEGORY</span>
                  </div>
                  <div className="pull-right col-md-5">
                    <select
                      onChange={(e) => this.handleChange(e)}
                      id="myselect1"
                      className="form-control selectpicker bs-select-hidden"
                      readonly=""
                      data-style="btn-white"
                    >
                      <option value="0">All Service</option>
                      {Object.entries(data).map((category, k) => { 
                        return (
                          <option
                            selected={
                              activeCategory == category[0] && "selected"
                            }
                            key={k}
                            value={category[0]}
                          >
                            {category[1][0].category_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="current-opening">
                  <table className="table form-border text-center">
                    <tbody>
                      <tr className="job-summary">
                        <td
                          width="8%"
                          className="cal-right-wht txt-center cal-header"
                        >
                          No.
                        </td>
                        <td width="45%" class="cal-right-wht txt-center">
                          Description
                        </td>
                        <td className="cal-right-wht txt-center">Form Name</td>
                        <td width="20%" className="text-center">
                          Download
                        </td>
                      </tr>
                      {formData?.map((each, key) => { 
                        return (
                          <tr ket={key}>
                            <td>{key + 1}</td>
                            <th scope="row" class="cal-border cal-header">
                              {each.description}{" "}
                            </th>
                            <th scope="row" className="cal-border cal-header">
                              {each.form_name}
                            </th>
                            <td>
                              <ul>
                                {
                                  <li className="doc-li">
                                    <a
                                      target="_blank"
                                      title="title"
                                      href={each.document_doc}
                                      download=""
                                    >
                                      {each.document_doc ? (
                                        <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/ms-world-icon.png" />
                                      ) : (
                                        <div> </div>
                                      )}
                                    </a>
                                  </li>
                                }
                                {
                                  <li className="doc-li">
                                    <a
                                      target="_blank"
                                      href={each.document_pdf}
                                      download=""
                                    >
                                      {each.document_pdf && (
                                        <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                      )}
                                    </a>
                                  </li>
                                }

                                {
                                  <li className="doc-li">
                                    {" "}
                                    <a
                                      target="_blank"
                                      href={each.document_excel}
                                      download=""
                                    >
                                      {each.document_excel && (
                                        <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/excel-icon.png" />
                                      )}
                                    </a>
                                  </li>
                                }
                              </ul>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              {this.state.placeholder?.image && (
                <div className="col-md-4">
                  <div className="blog_right_sidebar text-justify">
                    <aside className="single_sidebar_widget">
                      <img
                        src={this.state.placeholder.image}
                        style={{ width: "100%" }}
                      />
                      {this.state.placeholder?.header && (
                        <h4 className="place_title">
                          {this.state.placeholder.header}
                        </h4>
                      )}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.placeholder.description,
                        }}
                      />
                    </aside>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <Newsletter/>
        <Footer />
      </div>
    );
  }
}
