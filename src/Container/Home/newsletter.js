import React, { Component } from "react";
import Footer from "../../Common/footer";
import Newsletter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";

export default class newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableOne: [],
      tableTwo: [],
      placeholder: {},
      currentPage: 1,
      nextPage: 1,
      prevPage: 1,
      totalPages: 1,
      paginateSeries: 1,
    };
  }
  componentDidMount() {
    this.fetchData();
    this.placeHolderAPI();
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log("update",this.state.currentPage)
    if (prevState.currentPage != this.state.currentPage) {
      this.fetchData();
    }
  }
  fetchData() {
    RestApi.newsletters(this.state.currentPage)
      .then((res) => {
        // console.log("news", res);
        if (res.data.status) {
          let tableOne = [],
            tableTwo = [];
          res.data.data.data.map((each, i) => {
            let date = new Date(each.year, each.month - 1);
            let month = date.toLocaleString("en-us", {
              month: "short",
            });
            each = { ...each, month };
            if (i <= 5) {
              tableOne.push(each);
            } else {
              tableTwo.push(each);
            }
          });
          let nextPage = res.data.data.next_page_url?.slice(
            res.data.data.next_page_url.lastIndexOf("=") + 1,
            res.data.data.next_page_url.length
          );
          let prevPage = res.data.data.prev_page_url?.slice(
            res.data.data.prev_page_url.lastIndexOf("=") + 1,
            res.data.data.prev_page_url.length
          );

          this.setState({
            tableOne,
            tableTwo,
            totalPages: res.data.data.last_page, // res.data.data.last_page,
            nextPage,
            prevPage,
          });
        } else {
          this.setState({
            tableOne: [],
            tableTwo: [],
            currentPage: 1,
            totalPages: 1,
            paginateSeries: 1,
          });
        }
      })
      .catch((e) => {
        console.log("Error: ", e);
        this.setState({
          data: [],
          currentPage: 1,
          totalPages: 1,
          sNo: 0,
        });
      });
  }
  placeHolderAPI() {
    RestApi.placeholder("newsletters").then((res) => {
      if (res.data.status) {
        this.setState({ placeholder: res.data.data });
      }
    });
  }
  changePage(currentPage) {
    if (currentPage != this.state.currentPage && !isNaN(currentPage)) {
      this.setState({ currentPage });
    }
  }
  handlePagination(paginateSeries) {
    this.setState({
      currentPage: paginateSeries,
      paginateSeries,
    });
  }
  pageNumbers() {
    let { totalPages, currentPage, paginateSeries } = this.state;
    let renderData = [];
    if (totalPages > 10) {
      renderData.push(
        <>
          <li
            onClick={() => this.handlePagination(1)}
            className={
              this.state.currentPage == 1 ? "page-item active" : "page-item"
            }
          >
            <a className="page-link">{"<<"}</a>
          </li>
        </>
      );
    }
    let series = totalPages > 9 ? paginateSeries + 9 : totalPages;
    for (let i = paginateSeries; i <= series; i++) {
      if (i > totalPages) {
        break;
      }
      renderData.push(
        <>
          <li
            onClick={() => this.changePage(i)}
            className={
              this.state.currentPage == i ? "page-item active" : "page-item"
            }
          >
            <a className="page-link">{i}</a>
          </li>
        </>
      );
    }
    if (totalPages > 10) {
      renderData.push(
        <>
          <li
            onClick={() => this.handlePagination(totalPages - 10)}
            className={
              this.state.currentPage == totalPages
                ? "page-item active"
                : "page-item"
            }
          >
            <a className="page-link">{">>"}</a>
          </li>
        </>
      );
    }
    // else {
    //   for (let i = currentPage ; i <= totalPages; i++) {
    //     renderData.push(
    //       <>
    //         <li
    //           onClick={() => this.changePage(i)}
    //           className={
    //             this.state.currentPage == i ? "page-item active" : "page-item"
    //           }
    //         >
    //           <a className="page-link">{i}</a>
    //         </li>
    //       </>
    //     );
    //   }
    // }
    return renderData;
  }
  render() {
    let { tableOne, tableTwo } = this.state;
    return (
      <div>
        <div className="breadcrumbpane">
          <div className="container">
            <h1 className="pull-left">Newsletter</h1>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="current-opening clearfix cal-pad">
                  <div className="col-md-6" style={{ paddingTop: "15px" }}>
                    <table className="table form-border text-center">
                      <tbody>
                        <tr className="job-summary">
                          {/* <td
                            width="20%"
                            className="cal-right-wht txt-center cal-header"
                          >
                            No.
                          </td> */}
                          <td className="txt-center"> Period</td>
                          <td width="15%" className="cal-header "></td>
                        </tr>
                        {/* table one  */}
                        <tr className="newsletter-tr">
                          {/* <td>{tableOne.length >= 1 && 1}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableOne[0]?.month ? tableOne[0]?.month : ""} ${
                              tableOne[0]?.year ? tableOne[0]?.year : ""
                            }`} */}
                            {tableOne[0]?.heading ? tableOne[0]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableOne[0]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableOne[0]?.file && tableOne[0]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>

                        <tr className="newsletter-tr">
                          {/* <td>{tableOne.length >= 2 && 2}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableOne[1]?.month ? tableOne[1]?.month : ""} ${
                              tableOne[1]?.year ? tableOne[1]?.year : ""
                            }`} */}
                             {tableOne[1]?.heading ? tableOne[1]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableOne[1]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableOne[1]?.file && tableOne[1]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="newsletter-tr">
                          {/* <td>{tableOne.length >= 3 && 3}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableOne[2]?.month ? tableOne[2]?.month : ""} ${
                              tableOne[2]?.year ? tableOne[2]?.year : ""
                            }`} */}
                             {tableOne[2]?.heading ? tableOne[2]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableOne[2]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableOne[2]?.file && tableOne[2]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="newsletter-tr">
                          {/* <td>{tableOne.length >= 4 && 4}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableOne[3]?.month ? tableOne[3]?.month : ""} ${
                              tableOne[3]?.year ? tableOne[3]?.year : ""
                            }`} */}
                             {tableOne[3]?.heading ? tableOne[3]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableOne[3]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableOne[3]?.file && tableOne[3]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="newsletter-tr">
                          {/* <td>{tableOne.length >= 5 && 5}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableOne[4]?.month ? tableOne[4]?.month : ""} ${
                              tableOne[4]?.year ? tableOne[4]?.year : ""
                            }`} */}
                             {tableOne[4]?.heading ? tableOne[4]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableOne[4]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableOne[4]?.file && tableOne[4]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="newsletter-tr">
                          {/* <td>{tableOne.length >= 6 && 6}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableOne[5]?.month ? tableOne[5]?.month : ""} ${
                              tableOne[5]?.year ? tableOne[5]?.year : ""
                            }`} */}
                             {tableOne[5]?.heading ? tableOne[5]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableOne[5]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableOne[5]?.file && tableOne[5]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>
                        {/* table one  */}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6" style={{ paddingTop: "15px" }}>
                    <table className="table form-border text-center">
                      <tbody>
                        <tr className="job-summary">
                          {/* <td
                            width="20%"
                            className="cal-right-wht cal-header txt-center"
                          >
                            No.
                          </td> */}
                          <td className="txt-center">Period</td>
                          <td width="15%" className="cal-header"></td>
                        </tr>
                        {/* table two start */}
                        <tr className="newsletter-tr">
                          {/* <td>{tableTwo.length >= 1 && 7}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableTwo[0]?.month ? tableTwo[0]?.month : ""} ${
                              tableTwo[0]?.year ? tableTwo[0]?.year : ""
                            }`} */}
                            {tableTwo[0]?.heading ? tableTwo[0]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableTwo[0]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableTwo[0]?.file && tableTwo[0]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>

                        <tr className="newsletter-tr">
                          {/* <td>{tableTwo.length >= 2 && 8}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableTwo[1]?.month ? tableTwo[1]?.month : ""} ${
                              tableTwo[1]?.year ? tableTwo[1]?.year : ""
                            }`} */}
                            {tableTwo[1]?.heading ? tableTwo[1]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableTwo[1]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableTwo[1]?.file && tableTwo[1]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="newsletter-tr">
                          {/* <td>{tableTwo.length >= 3 && 9}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableTwo[2]?.month ? tableTwo[2]?.month : ""} ${
                              tableTwo[2]?.year ? tableTwo[2]?.year : ""
                            }`} */}
                             {tableTwo[2]?.heading ? tableTwo[2]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableTwo[2]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableTwo[2]?.file && tableTwo[2]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="newsletter-tr">
                          {/* <td>{tableTwo.length >= 4 && 8}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableTwo[3]?.month ? tableTwo[3]?.month : ""} ${
                              tableTwo[3]?.year ? tableTwo[3]?.year : ""
                            }`} */}
                             {tableTwo[3]?.heading ? tableTwo[3]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableTwo[3]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableTwo[3]?.file && tableTwo[3]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="newsletter-tr">
                          {/* <td>{tableTwo.length >= 5 && 11}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableTwo[4]?.month ? tableTwo[4]?.month : ""} ${
                              tableTwo[4]?.year ? tableTwo[4]?.year : ""
                            }`} */}
                             {tableTwo[4]?.heading ? tableTwo[4]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableTwo[4]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableTwo[4]?.file && tableTwo[4]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="newsletter-tr">
                          {/* <td>{tableTwo.length >= 6 && 12}</td> */}
                          <th scope="row" className="cal-left cal-header">
                            {/* {`${tableTwo[5]?.month ? tableTwo[5]?.month : ""} ${
                              tableTwo[5]?.year ? tableTwo[5]?.year : ""
                            }`} */}
                             {tableTwo[5]?.heading ? tableTwo[5]?.heading : ""}
                          </th>
                          <td>
                            <ul>
                              <li>
                                {tableTwo[5]?.file && (
                                  <a
                                    target="_blank"
                                    href={
                                      tableTwo[5]?.file && tableTwo[5]?.file
                                    }
                                    download=""
                                  >
                                    <img src="https://itaxdoctor.idossapp.com/assets/front_end/images/pdf-icon.png" />
                                  </a>
                                )}
                              </li>
                            </ul>
                          </td>
                        </tr>

                        {/* table two end */}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-12">
                    <nav className="blog-pagination">
                      {tableOne.length > 0 && (
                        <ul className="pagination">
                          <li className="page-item">
                            <a
                              onClick={() =>
                                // this.state.currentPage != 1 &&
                                this.handlePagination(
                                  this.state.paginateSeries > 10
                                    ? this.state.paginateSeries - 10
                                    : 1
                                )
                              }
                              className={
                                this.state.paginateSeries != 1
                                  ? "page-link preview"
                                  : "disabled-pagi"
                              }
                              aria-label="Previous"
                            >
                              <i className="fa fa-angle-double-left"></i> Prev.
                            </a>
                          </li>
                          {this.pageNumbers()}
                          <li className="page-item">
                            <a
                              onClick={() =>
                                this.handlePagination(
                                  this.state.paginateSeries + 10 <
                                    this.state.totalPages
                                    ? this.state.paginateSeries + 10
                                    : this.state.paginateSeries
                                )
                              }
                              disabled
                              className={
                                this.state.paginateSeries + 10 <
                                this.state.totalPages
                                  ? "page-link next"
                                  : "disabled-pagi"
                              }
                              aria-label="Next"
                            >
                              Next <i className="fa fa-angle-double-right"></i>
                            </a>
                          </li>
                        </ul>
                      )}
                    </nav>
                  </div>
                </div>
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
                        <div
                          dangerouslySetInnerHTML={{
                            __html: this.state.placeholder.description,
                          }}
                        />
                        {/* <h4 className="place_title">Newsletter Placeholder</h4>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </p>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                    <ul className="list-disc">
                      <li>Lorem Ipsum is simply dummy text</li>
                      <li>Lorem Ipsum is simply dummy text</li>
                      <li>Lorem Ipsum is simply dummy text</li>
                    </ul> */}
                      </aside>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </section>
        {/* <!---------------------------Newsletter Section----------------------------> */}

        <Newsletter />
        <Footer />
      </div>
    );
  }
}
