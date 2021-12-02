import React, { Component } from "react";
import { connect } from "react-redux";
import Common from "../../Common/common";
import Footer from "../../Common/footer";
import Newsletter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";
class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      activeService: "",
      responseData:[],
      search:'',
      categories:[],
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    RestApi.faq().then((res) => { 
      // console.log(res);
      if (res.data.status) {
        let grouped = Common.groupBy(["category_id",'service_name'])(res.data.data);

        let categoryIDs =[];
        let totalRecords = res.data.data
        res.data.data.map((c)=> {
          if(!categoryIDs.includes(c.category_id)){
            categoryIDs.push(c.category_id)
          }
        })
        let category = this.props.categories.filter((i)=> categoryIDs.includes(i.id))
        this.setState({
          services: grouped,
          responseData: res.data.data,
          activeService: category[0]?.id,
          categories:category,
          totalRecords
        });
      }
    }).catch((e)=> {
      console.log("Error: ",e)
      this.setState({
        services: [],
        responseData: [],
        activeService: "",
        categories:[],
      });
    });
  }
  handleActiveServie(serviceId){
    this.setState({
      activeService:serviceId,
    })
  }
  handleSearch(e) {
    let search = e
    let data = []
    if(search.length > 0) { 
      // filterArray takes (array,keyword,and keys) parameters and returns search result
      data = Common.filterArray(this.state.responseData,search,['service_name','question','answer'])
    } else { 
      data = this.state.responseData
    }
    let totalRecords = data.length
    let services = Common.groupBy(["category_id",'service_name'])(data);
    let activeService = Object.keys(services)[0]
    this.setState({
      search,
      services,
      activeService,
      totalRecords
    })
  }
  render() {
    let { services,activeService,categories,search,totalRecords } = this.state;
    return (
      <div>
        <div class="breadcrumbpane">
          <div class="container">
            <h1 class="pull-left">Frequently Asked Questions</h1>
          </div>
        </div>
        <div class="container clearfix">
          <div class="row">
            <div class="col-md-4 services_list services_heading">
              <h3>Our services list</h3>
             <div className="current-opening">
             <ul class="nav nav-pills flex-column" role="tablist">
                {(categories).map((each, key) => {
                    return (
                      <li key={key} onClick={()=>this.handleActiveServie(each.id)}  
                      class={`nav-item ${services[each.id] && search.length > 0 && each.id != activeService && "searchHasService"} ${each.id == activeService && 'active'}`}>
                        <a
                          href={`#${each.id}`}
                          aria-controls={each.id}
                          data-toggle="pill"
                        >
                          <strong>{each.category_name}</strong>
                        </a>
                      </li>
                    );                  
                })}
              </ul>
             </div>
            </div>

            <div className="center-align-content">
            <div class="col-md-8">
              <div class="search_help">
                <form class="sky-form" novalidate="novalidate">
                  <fieldset>
                    <section>
                      <div class="row">
                        <div class="col col-12">
                          <label class="input">
                              <i class="s-search-icon icon-append fa fa-search"></i>
                            
                            <input
                              onChange={(e) => this.handleSearch(e.target.value)}
                              type="text"
                              value={this.state.search}
                              placeholder="Search.."
                            />
                          </label>
                        </div>
                      </div>
                    </section>
                  </fieldset>
                </form>
              </div>
              </div>
            </div>
              <div class="col-md-8">
              
              <div class="tab-content tab_con current-opening">
                {/* <!----financial-----> */}
                {/* <ReactFilter
                 value={this.state.search}
                 data={this.props.categories}
                 renderResults={results => (
                   <div>
                     {results.map((el) => {
                       console.log(el)
                       return(
                        <div>
                          <span>{el.name}</span>
                          <span>{el.email}</span>
                        </div>
                      )
                     })}
                   </div>
                 )} /> */}
                 {search.length > 0 && Object.entries(services).length > 0 &&  (
                          <div className="serviceSearchResults">
                            {totalRecords} results found for
                            search keyword "{search}".{" "}
                            <span
                              className="select-click-here "
                              onClick={() => {
                                this.handleSearch("");
                              }}
                            >
                               Click to view all 
                            </span>{" "}
                            or search using some other keywords.{" "}
                          </div>
                        )}
                {Object.entries(services).length > 0 ? Object.entries(services).map((each, key) => {
                  // console.log(each)
                 return <div key={key} role="tabpanel" class={` mt-10 tab-pane ${activeService == each[0] && 'active'}`}  id={each[0]}>
                    <div class="panel-group" id={`accordion${each[0]}`}>
                      {Object.entries(each[1]).length > 0 &&
                        Object.entries(each[1]).map((item,iKey) => { 
                          // console.log("item",item)
                          return (
                            <div class="panel panel-default services_details clearfix">
                              <a
                                class="accordion-toggle collapsed"
                                data-toggle="collapse"
                                data-parent={`#accordion${each[0]}`}
                                href={`#collapse${each[0]}${iKey}`}
                                aria-expanded="false"
                              >
                                <h4 class="panel-title">
                                  <i
                                    class="fa fa-asterisk"
                                    aria-hidden="true"
                                  ></i>
                                  {" "}{item[0]}
                                  <i class="arrow fa fa-angle-down"></i>
                                </h4>
                              </a>
                              <div
                                id={`collapse${each[0]}${iKey}`}
                                class="panel-collapse collapse"
                                aria-expanded="false"
                              >
                                <div class="panel-body">
                                  <div class="col-md-12">
                                   { item[1].map((i)=> {
                                     return   (<div > <h5 className="bold">Q.{"  "}&nbsp; {i.question}</h5>
                                      <p className="faqAnswer"><b>A.</b> {i.answer}</p> 
                                      </div>)
                                   })
                                   
                                   }
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>;
                }) : 
                <div className="serviceSearchResults">
                {" "}
                No search results found for the keyword "{search}". Try
                using some other keywords or{" "}
                <span
                  className="select-click-here "
                  onClick={() => {
                    this.handleSearch("");
                  }}
                >
                  <u> click to view all services</u>{" "}
                </span>{" "}
              </div>
              }
              </div>
            </div>
          </div>
        </div>
        <Newsletter />
        <Footer />
      </div>
    );
  }
}
Faq.defaultProps = {
  categories: [],
  activeMenu: "home",
};
export default connect((state,props)=> {
  return {
    categories: state?.categories
  }
})(Faq)
