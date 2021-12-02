import React, { Component } from "react";
import { Link } from "react-router-dom";
import RestApi from "../../services/api";

export default class blogDetails extends Component {
    constructor(props){
        super(props)
        this.state= {
            data:{},
            relatedBlogs:[],
            id:this.props.match.params.id,
            search:''
        }
    }
    componentDidMount(){
        this.fetchData()
    }
    componentDidUpdate(prevProps,prevState){
      if(prevState.id != this.state.id){
        this.fetchData()
      }
    }
    fetchData(){
      //  if(id){
        RestApi.blogDetails(this.state.id).then((res)=> {
          // console.log("details",res)
          if(res.data.status){
              this.setState({
                  data: res.data.data.blog_details,
                  relatedBlogs: res.data.data.related_blogs
              })
          }
      })
      .catch((e)=> {
        console.log("Error API: ",e)
        this.setState({
          data:{}
        })
      })
      //  }
    }
    changeID(id){
      this.setState({
        id
      })
    }
    handleSearch = (e)=>{
      this.setState({
        search:e.target.value
      })
    }
    handleSubmit = (e) =>{
      e.preventDefault();
      let { currentPage, search, month, year, cId } = this.state;
      this.props.history.push(`/blog/${search}`)
    }
  render() {
    let {data,relatedBlogs} = this.state
    return (
      <div>
        <div className="breadcrumbpane">
          <div className="container">
            <h1 className="pull-left">Blog</h1>
          </div>
        </div>
        {/* <!-- start: blog sections --> */}
        <section className="blog_area single-post-area section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="blog_left_sidebar">
                  <article className="blog_item">
                    <div className="blog_item_img">
                      {data?.blog_image && <img
                        className="card-img rounded-0"
                        src={data.blog_image}
                        alt="blog"
                      />}
                      <a href="#" className="blog_item_date">
                        {data?.published_date && <p>{data.published_date}</p>}
                      </a>
                    </div>
                    <div className="blog-author">
                      <div className="media align-items-center">
                        <div className="media-body text-right">
                          <a href="#">
                            {data?.user_name && <h4>{data.user_name}</h4>}
                          </a>
                        </div>
                        {data?.user_image && <img src={data.user_image} alt="author" />}
                      </div>
                    </div>

                    <div className="blog_details">
                      <a className="d-inline-block" href="#">
                        <h2>{data?.heading}</h2>
                      </a>
                      {data?.description && 
                       <div
                       dangerouslySetInnerHTML={{
                         __html: data.description
                       }}
                     /> }
                    </div>
                  </article>

                </div>
              </div>
              <div className="col-lg-4">
                <div className="blog_right_sidebar">
                  <aside className="single_sidebar_widget search_widget">
                    {/* <form action="#"> */}
                      <div className="form-group">
                        <div className="input-group">
                          <input onChange={(e)=>this.handleSearch(e)}
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
                      onClick={(e)=>this.handleSubmit(e)}
                        className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                        type="submit"
                      >
                        Search
                      </button>
                    {/* </form> */}
                  </aside>
                  <aside className="single_sidebar_widget post_category_widget">
                    <h4 className="widget_title">Related Blogs</h4>
                    <ul className="list cat-list">
                     {relatedBlogs.length > 0 && relatedBlogs.map((each,key)=>{
                       return <li key={key}>
                       <a  onClick={()=>this.changeID(each.id)} className="pointer d-flex">
                         <p>{each.heading}</p>
                       </a>
                     </li>
                     }) }
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
