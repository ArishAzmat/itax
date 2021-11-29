import React, { Component } from "react";
import Footer from "../../Common/footer";
import RestApi from "../../services/api";
import Common from "../../Common/common";
import Newsletter from "../../Components/home/subscribeNewsletter";
import { Link } from "react-router-dom";
import ModalRoot from "../../Components/modal/modalRoot";
import CaseLawModal from "../../Components/modal/caseLawModal";
import PdfIcon from '../../images/pdf-icon.png'
export default class CaseLaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: [],
      columns: [
        { key: "all", value: "All" },
        { key: "under_law", value: "Under Law" },
        { key: "under_section", value: "Under Section" },
        { key: "case_name", value: "Case Name" },
        { key: "case_number", value: "Case No." },
        { key: "citation", value: "Citation" },
        { key: "date_of_order", value: "Date Of Order" },
        { key: "keyword", value: "Keyword" },
      ],
      previewContent: "",
      previewHeading: "",
      currentPage: 1,
      totalPages: 1,
      selectedColumn: "all",
      search: "",
      paginateSeries: 1,
      perPage: 10,
      sNo: 0,
      isSearch: false,
      keyword: "",
      totalRecords: 0,
    };
  }

  componentDidMount() {
    this.fetchData(1);
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log("update",this.state.currentPage)
    if (prevState.currentPage != this.state.currentPage) {
      this.fetchData(this.state.currentPage);
    }
    if (prevState.perPage != this.state.perPage) {
      this.fetchData(1);
    }
  }
  fetchData(pageNo) {
    let { currentPage, selectedColumn, search, perPage } = this.state;
    RestApi.caseLaw(pageNo, selectedColumn, search, perPage)
      .then((res) => {
        console.log(" case law: ", res);
        //   let grouped = Common.groupBy(['Service_category_id'])(res.data.data);
        if (res.data.status && res.data.data.data) {
          let isSearch = false,
            keyword = "";
          if (search.length > 0) {
            isSearch = true;
            keyword = search;
          }
          this.setState({
            data: res.data.data.data,
            currentPage: res.data.data.current_page,
            totalPages: res.data.data.last_page,
            sNo: res.data.sno,
            isSearch,
            keyword,
            totalRecords: res.data.data.total,
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
  handleClick(previewContent, previewHeading) {
    this.setState({
      previewContent,
      previewHeading,
      isOpen: true,
    });
  }
  changePage(currentPage) {
    console.log(currentPage);
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
  handleColumnChange(e) {
    this.setState({
      selectedColumn: e.target.value,
      search: "",
    });
  }
  handleSearch(e) {
    this.setState({
      search: e.target.value,
    });
  }
  handleSubmit() {
    console.log("handleSubmit");
    this.fetchData(1);
  }
  handleReset() {
    this.setState({
      search: "",
    });
   setTimeout(() => {
    this.fetchData(1);
   }, 20);
  }
  render() {
    console.log("state", this.state);
    let {
      sNo,
      data,
      columns,
      pageNo,
      totalRecords,
      selectedColumn,
      keyword,
      isSearch,
    } = this.state;
    console.log(data);
    return (
      <div>
        <div className="breadcrumbpane">
          <div className="container">
            <h1 className="pull-left">Case law</h1>
          </div>
        </div>
        <section>
          <div className="container-fluid">
            <div className="row">
              <div class="col-md-12">
                <div class="col col-md-5"></div>
                <div class="col col-md-7">
                  <div class="search_help case-search">
                    <select
                      className="form-control case-law-select"
                      onChange={(e) => this.handleColumnChange(e)}
                    >
                      {/* <option value="">All</option> */}
                      {columns.map((each) => {
                        return (
                          <option
                            selected={selectedColumn == each && "selected"}
                            value={`${each.key}`}
                          >{`${each.value}`}</option>
                        );
                      })}
                    </select>
                    <input
                      onChange={(e) => this.handleSearch(e)}
                      type={selectedColumn == "date_of_order" ? "date" : "text"}
                      value={this.state.search}
                      class={
                        selectedColumn == "date_of_order"
                          ? "date form-control inputpane"
                          : "form-control inputpane"
                      }
                      placeholder={
                        selectedColumn == "date_of_order"
                          ? "dd-mm-yyyy"
                          : "Search.."
                      }
                    />
                    <button
                      className="case-law-btn"
                      onClick={() => this.handleSubmit()}
                    >
                      search
                    </button>
                  </div>
                  {/* <button class="but_feild button">search</button> */}
                </div>
                <div class="current-opening">
                  {isSearch && (
                    <div className="serviceSearchResults">
                      {totalRecords} results found for search keyword "{keyword}
                      ".{" "}
                      <span
                        className="select-click-here "
                        onClick={() => {
                          this.handleReset();
                        }}
                      >
                        <u> Click to view all Cases</u>
                      </span>{" "}
                      or search using some other keywords.{" "}
                    </div>
                  )}
                  {data.length > 0 && (
                    <table class="table form-border text-center">
                      <tbody>
                        <tr class="job-summary">
                          <td
                            width="6%"
                            class="cal-right-wht txt-center cal-header"
                          >
                            No.
                          </td>
                          <td width="11%" class="cal-right-wht txt-center">
                            Law
                          </td>
                          <td width="9%" class="cal-right-wht txt-center">
                            Section
                          </td>
                          <td width="18%" class="cal-right-wht txt-center">
                            Case Name
                          </td>
                          <td width="10%" class="cal-right-wht txt-center">
                            Case Number
                          </td>
                          <td width="8%" class="cal-right-wht txt-center">
                            Order Date
                          </td>
                          <td width="16%" class="cal-right-wht txt-center">
                            Citation
                          </td>
                          <td width="16%" class="cal-right-wht txt-center">
                            Keyword
                          </td>
                          <td width="8%">Judgement</td>
                        </tr>
                        {data.map((each, key) => {
                          return (
                            <tr>
                              <td>{++sNo}</td>
                              <th class="cal-border case-text">
                                {each.under_law}
                              </th>
                              <th class="cal-border case-text">
                                {each.under_section}
                              </th>
                              <th class="cal-border case-text">
                                {each.case_name}
                              </th>
                              <th class="cal-border case-text">
                                {each.case_number}
                              </th>
                              <th class="cal-border txt-center case-text">
                                {each.date_of_order}
                              </th>
                              <th class="cal-border case-text">
                                {each.citation != null ? each.citation : "NA"}
                              </th>
                              <th class="cal-border case-text">
                                {each.keyword != null ? each.keyword : "NA"}
                              </th>
                              <td>
                                {each.judgement != null && (
                                  <a
                                    target="_blank"
                                    href={each.judgement}
                                    download=""
                                  >
                                    
                                    <img
                                      src={PdfIcon}
                                      style={{ width: "22%" }}
                                    />
                                  </a>
                                )}
                                {each.gist != null && each.gist.length > 0 && (
                                  <a
                                    onClick={() =>
                                      this.handleClick(each)
                                    }
                                    className="case-law-view"
                                  >
                                    {" "}
                                    View
                                  </a>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <nav className="blog-pagination">
                  {data.length > 0 && (
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link showRecords">
                          <span className="showText">Show</span>
                          <select
                            onChange={(e) =>
                              this.setState({ perPage: e.target.value })
                            }
                          >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                          </select>
                        </a>
                      </li>
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
        </section>
        <Newsletter />
        <Footer />
        <ModalRoot
          title={this.state.previewContent.case_name}
          close={() => this.setState({ isOpen: false })}
          isOpen={this.state.isOpen}
          width={"75%"}
          body={
            <CaseLawModal
              content={this.state.previewContent}
            />
          }
        />
        )
      </div>
    );
  }
}
