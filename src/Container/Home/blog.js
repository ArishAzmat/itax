import React, { Component } from "react";
import Footer from "../../Common/footer";
import Header from "../../Common/header";
import blogImage from "../../images/blog/blog1.png";
import NewsLetter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";
import { Link, withRouter } from "react-router-dom";
import ModalRoot from "../../Components/modal/modalRoot";
import { connect } from 'react-redux';

class blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      nextPage: 1,
      prevPage: 1,
      totalPages: 1,
      monthlyArchives: [],
      blogsByCategory: [],
      search: this.props.match.params.search
        ? this.props.match.params.search
        : "",
      month: "",
      year: "",
      cId: "",
      paginateSeries: 1,
      isSearch: false,
      keyword: "",
      isOpen: false,
      // subscriberName:'',
      // subscriberEmail:'',
      subscriber: {
        name: '',
        email: ''
      }
    };
  }
  isSubscribed = false;
  componentDidMount() {
    let { currentPage, search, month, year, cId } = this.state;
    if (this.props.match.params.search) {
      this.fetchData(1, search, "", "", "");
    } else {
      this.fetchData(currentPage, search, month, year, cId);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let { currentPage, search, month, year, cId } = this.state;
    if (prevState.currentPage != currentPage) {
      this.fetchData(currentPage, search, month, year, cId);
    }
  }
  fetchData(currentPage, search, month, year, cId) {
    RestApi.blogs(currentPage, search, month, year, cId).then((res) => {
      // console.log("blog", res);
      if (res.data.status) {
        let nextPage = res.data.data.blog_list.next_page_url?.slice(
          res.data.data.blog_list.next_page_url.lastIndexOf("=") + 1,
          res.data.data.blog_list.next_page_url.length
        );
        let prevPage = res.data.data.blog_list.prev_page_url?.slice(
          res.data.data.blog_list.prev_page_url.lastIndexOf("=") + 1,
          res.data.data.blog_list.prev_page_url.length
        );
        let isSearch = false, keyword = "";
        if (search.length > 0) {
          isSearch = true;
          keyword = search
        }
        this.setState({
          data: res.data.data.blog_list.data,
          totalPages: res.data.data.blog_list.last_page,
          nextPage,
          prevPage,
          monthlyArchives: res.data.data.months_archive,
          blogsByCategory: res.data.data.blogs_by_category,
          isSearch,
          keyword
        });
      } else if (res.data.status == false) {
        this.setState({
          data: [],
          currentPage: 1,
          nextPage: 1,
          prevPage: 1,
          totalPages: 1,
          monthlyArchives: [],
          blogsByCategory: [],
          search: "",
        });
      }
    });
  }
  handleReadMore(id) {
    for (let i = 0; i < 6; i++) {
      console.log(this.props.isLoggin);
    }
    const isSubscribed = JSON.parse(sessionStorage.getItem('isSubscribed'));
    if (this.props.isLoggin) {
      this.setState({
        isOpen: false
      });
      this.props.history.push(`/blog-details/${id}`);

    } else if (isSubscribed !== null) {
      this.setState({
        isOpen: false
      });
      this.props.history.push(`/blog-details/${id}`);

    } else {
      this.props.history.push('/blog');
      this.setState({
        isOpen: true
      });
    }

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
  handleSearch(e) {
    this.setState({
      search: e.target.value,
    });
  }
  handleReset() {
    this.setState({
      search: "",
    });
    this.fetchData(1, "", "", "", "");
  }
  handleSubmit(e) {
    e.preventDefault();
    let { currentPage, search, month, year, cId } = this.state;
    this.fetchData(1, search, "", "", "");
  }
  handleBlogVariant = (month, year, cId) => {
    this.setState({ month, cId, search: "" });
    this.fetchData(1, "", month, year, cId);
  };
  inputHandler(e) {
    const data = this.state.subscriber;
    if (e.target.name === 'firstname') {
      data.name = e.target.value;
    }
    if (e.target.name === 'emailaddress') {
      data.email = e.target.value;
    }
    this.setState({ subscriber: data });
    console.log(this.state.subscriber);

  }
  accessBlog(e) {
    e.preventDefault();
    let params = this.state.subscriber;
    RestApi.blogAccess(params)
      .then(data => {
        console.log('blog data', data);
        console.log(data.data.message);
        this.setState({ subscriber: { name: '', email: '' } });
        if (data.data.message === 'This email id is already subscribed.') {
          sessionStorage.setItem('isSubscribed', JSON.stringify(params));
          alert(data.data.message);
          // this.isSubscribed = true;
        } if (data.data.status) {
          sessionStorage.setItem('isSubscribed', JSON.stringify(params));
          // this.isSubscribed = true;
        }
        this.setState({
          isOpen: false
        });
      })
      .catch(
        err => console.log(err)
      );

  }
  render() {
    let {
      monthlyArchives,
      blogsByCategory,
      data,
      isSearch,
      keyword
    } = this.state;
    const styles = {
      display: {
        display: "none",
        color: "red",
      },
    };
    return (
      <div>
        <Header />
        <div className="breadcrumbpane">
          <div className="container">
            <h1 className="pull-left">Blog</h1>
          </div>
        </div>
        {/* <!-- start: blog section --> */}
        <section className="blog_area section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="blog_left_sidebar">
                  {isSearch && (
                    <div className="serviceSearchResults">
                      {data.length} results found for search keyword "{keyword}".{" "}
                      <span
                        className="select-click-here "
                        onClick={() => {
                          this.handleReset();
                        }}
                      >
                        Click to view all blogs
                      </span>{" "}
                      or search using some other keywords.{" "}
                    </div>
                  )}
                  {data.length > 0 &&
                    data.map((each, key) => {
                      return (
                        <>
                          <div className="media post_item">
                            <div className="col-md-3">
                              <img
                                src={each.blog_image}
                                alt="blog"
                                className="post-img"
                              />
                            </div>
                            <div className="col-md-9">
                              <div className="media-body">
                                <a className="not-hover">
                                  <h3>{each.heading}</h3>
                                </a>
                                <strong>{each.published_date}</strong>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: each.short_description,
                                  }}
                                />

                                {/* <Link to={`/blog-details/${each.id}`}> */}
                                <a
                                  onClick={() => this.handleReadMore(each.id)}
                                  className="readmore"
                                  data-toggle="modal"
                                // data-target="#blogModal"
                                >
                                  Read More...
                                </a>
                                {/* </Link> */}
                              </div>
                            </div>
                          </div>
                          <hr />
                        </>
                      );
                    })}

                  {/*  <div className="media post_item">
                    <div className="col-md-3">
                      <img src={blogImage} alt="blog" className="post-img" />
                    </div>
                    <div className="col-md-9">
                      <div className="media-body">
                        <a href="#">
                          <h3>Corporate Advisory</h3>
                        </a>
                        <strong>January 12, 2021</strong>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                        <a
                          href="#"
                          className="readmore"
                          data-toggle="modal"
                          data-target="#blogModal"
                        >
                          Read More...
                        </a>
                      </div>
                    </div>
                  </div>
                   
                  <hr />*/}
                  {data.length > 0 && (
                    <nav className="blog-pagination">
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
                    </nav>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="blog_right_sidebar">
                  <aside className="single_sidebar_widget search_widget">
                    <form action="#">
                      <div className="form-group">
                        <div className="input-group " style={{ display: "" }}>
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.search}
                            placeholder="Search Keyword"
                            onChange={(e) => this.handleSearch(e)}
                            onfocus="this.placeholder = ''"
                            onblur="this.placeholder = 'Search Keyword'"
                          />
                          <div className="input-group-append">
                            <button
                              onClick={(e) => this.handleSubmit(e)}
                              className="btn"
                              type="button"
                            >
                              <i className="fa fa-search"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                        type="submit"
                        onClick={(e) => this.handleSubmit(e)}
                      >
                        Search
                      </button>
                    </form>
                  </aside>
                  <aside className="single_sidebar_widget post_category_widget">
                    <h4 className="widget_title">Blog By Category</h4>
                    <ul className="list cat-list">
                      {blogsByCategory.length > 0 &&
                        blogsByCategory.map((each, key) => {
                          return (
                            <li>
                              <a
                                onClick={() =>
                                  this.handleBlogVariant(
                                    "",
                                    "",
                                    each.category_id
                                  )
                                }
                                className="d-flex anchor-link"
                              >
                                <p>{each.category_name}</p>
                                <p>{`(${each.total_count})`}</p>
                              </a>
                            </li>
                          );
                        })}
                      {/* <li>
                        <a href="#" className="d-flex">
                          <p>Corporate Advisory</p>
                          <p>(10)</p>
                        </a>
                      </li>  */}
                    </ul>
                  </aside>
                  <aside className="single_sidebar_widget post_category_widget">
                    <h4 className="widget_title">Months / Archive</h4>
                    <ul className="list cat-list">
                      {monthlyArchives.length > 0 &&
                        monthlyArchives.map((each, key) => {
                          let year = each.year;
                          let date = new Date(year, each.month - 1);
                          let month = date.toLocaleString("en-us", {
                            month: "long",
                          });

                          return (
                            <li key={key}>
                              <a
                                onClick={() =>
                                  this.handleBlogVariant(
                                    each.month,
                                    each.year,
                                    ""
                                  )
                                }
                                className="d-flex anchor-link"
                              >
                                <p>{`${month} ${year} `}</p>
                                <p>{`(${each.total_count})`}</p>
                              </a>
                            </li>
                          );
                        })}
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- end: blog section -->

<!-- Modal --> */}
        <div className="modal fade" id="blogModal" role="dialog">
          <div className="modal-dialog" style={{ width: "480px" }}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Blog</h4>
              </div>
              <div className="modal-body">
                <p>
                  Enter your name and email address to get access of blog
                  section.
                  <br />* Don't Worry You'll Not be Spammed
                </p>
                <div className="row center" style={{ width: "360px" }}>
                  <form method="post">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        className="form-control inputpane"
                        placeholder="Enter Your Name"
                      />
                      <span
                        id="error"
                        className="error"
                      // style={styles.display}
                      >
                        Enter User Name
                      </span>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="emailaddress"
                        id="emailaddress"
                        className="form-control inputpane"
                        placeholder="Enter Your Email Address"
                      />
                      <span
                        id="err"
                        className="error"
                      // style={styles.display}
                      >
                        Enter email address
                      </span>
                    </div>
                    <div className="text-center">
                      <a
                        href="#"
                        className="button newsletter no-pip"
                        name=""
                        id=""
                      >
                        Submit
                        <span>
                          <i className="fa fa-envelope-o"></i>
                        </span>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <NewsLetter />
        <Footer />
        <ModalRoot
          title={"Confirm"}
          close={() => this.setState({ isOpen: false })}
          isOpen={this.state.isOpen}
          // width={"75%"}
          body={
            <div className="modal-body">
              <p>
                Enter your name and email address to get access of blog
                section.
                <br />* Don't Worry You'll Not be Spammed
              </p>
              <div className="row center" style={{ width: "360px" }}>
                <form method="post" onSubmit={(e) => this.accessBlog(e)}>
                  <div className="col-md-12">
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      className="form-control inputpane"
                      placeholder="Enter Your Name"
                      required
                      onChange={(e) => this.inputHandler(e)}
                    />
                    <span
                      id="error"
                      className="error"
                    // style={styles.display}
                    >
                      Enter User Name
                    </span>
                  </div>
                  <div className="col-md-12">
                    <input
                      type="email"
                      name="emailaddress"
                      id="emailaddress"
                      className="form-control inputpane"
                      placeholder="Enter Your Email Address"
                      required
                      onChange={(e) => this.inputHandler(e)}
                    />
                    <span
                      id="err"
                      className="error"
                    // style={styles.display}
                    >
                      Enter email address
                    </span>
                  </div>
                  <div className="text-center">
                    {/* <a
                      // href="#"
                      className="button newsletter no-pip"
                      name=""
                      id=""
                    >
                      Submit */}
                    <button className="button newsletter no-pip" type="submit">Submit<span>
                      <i className="fa fa-envelope-o"></i>
                    </span></button>

                    {/* </a> */}
                  </div>
                </form>
              </div>
            </div>
          }
        />
      </div>
    );
  }
};


export default connect((state) => {
  return {
    isLoggin: state.isLogged
  }
})(withRouter(blog));
