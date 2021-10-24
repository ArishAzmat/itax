import React, { Component } from "react";
import RestApi from "../../services/api";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      placeholder: {},
    };
  }
  componentDidMount() {
    this.fetchData();
    this.placeHolderAPI();
  }
  placeHolderAPI() {
    RestApi.placeholder("calendar").then((res) => {
      console.log("placeHolder: calendar: ", res);
      this.setState({ placeholder: res.data.data });
    });
  }
  fetchData() {
    let month = this.props.match.params.month;
    let year = this.props.match.params.year;
    if (month && year) {
      RestApi.calendar(month, year).then((res) => {
        console.log("calender: ", res);
        if (res.data.status) {
          this.setState({
            data: res.data.data,
          });
        }
      });
    }
  }
  render() {
    let { month, year } = this.props.match.params;
    let date = new Date(year, month - 1);
    month = date.toLocaleString("en-us", {
      month: "long",
    });
    return (
      <>
        <div className="breadcrumbpane">
          <div className="container">
            <h1 className="pull-left">CALENDAR</h1>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12 section-title">
                <h2>
                  Schedule for the month -{" "}
                  {month?.toLocaleString("en-us", {
                    month: "short",
                  })}{" "}
                  {year}
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                {this.state.data.length > 0 ? (
                  <table className="table form-border text-center">
                    <tbody>
                      <tr className="job-summary">
                        <td width="8%" className="cal-right-wht">
                          Sr. No.
                        </td>
                        <td width="12%" className="cal-right-wht">
                          Due Date
                        </td>
                        <td width="20%" className="cal-right-wht">
                          Law
                        </td>
                        <td width="40%">Description</td>
                        <td width="20%" className="cal-right-wht">
                          Form
                        </td>
                      </tr>
                      {this.state.data.map((each, key) => {
                        let checkDate = new Date(each.cal_date)
                        let today = new Date()
                        return (
                          <tr key={key} className="passed_date">
                            <td className="cal-right" style={{color:checkDate > today && '#000'}}>{++key}</td>
                            <td className="cal-header" style={{color:checkDate > today && '#000'}}>{each.schedule_date}</td>
                            <td className="cal-header align-justify cal-border" style={{color:checkDate > today && '#000'}}>
                              {each.display_name}
                            </td>
                            <td className="cal-header align-justify" style={{color:checkDate > today && '#000'}}>{each.description}</td>
                            <td className="cal-right align-justify" style={{color:checkDate > today && '#000', border:'1px solid #ddd'}}>{each.form_name_no}</td>
                          </tr>
                        );
                      })}
                      {/* <tr className="passed_date">
                      <td className="cal-right">2</td>
                      <td className="cal-header">15.01.2021</td>
                      <td className="cal-header cal-border">xxxxxx</td>
                      <td className="cal-header">xxxxxx</td>
                    </tr> */}
                    </tbody>
                  </table>
                ) : (
                  <h4>No Data Available</h4>
                )}
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
      </>
    );
  }
}
