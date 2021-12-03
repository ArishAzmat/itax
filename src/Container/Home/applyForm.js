import React, { Component } from "react";
import { set } from "react-hook-form";
import Footer from "../../Common/footer";
import Newsletter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";
import { Link } from "react-router-dom";
import Common from "../../Common/common";

export default class ApplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions:{monthly:[],quarterly:[],yearly:[]},
      relatedServices: [],
      documentDetails:[],
      financialYear:[],
      options:[],
      payableOptions:{},
      service_details:{},
      isCustomised:false,
      totalAmount:0,
      advanceAmount:0,
      serviceDetails:{},
      onCompletion:0,
      isQuotation:0
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.cid != this.props.match.params.cid || prevProps.match.params.Sid != this.props.match.params.Sid ){
      this.fetchData();
    }
  }
  fetchData() {
    let cid = this.props.match.params.cid;
    let sId = this.props.match.params.sId;
    RestApi.serviceDocument(cid, sId).then((res) => {
        if (res.data.status) { 
            let {data} = res.data;
            let options = [];
            let isCustomised =  data.service_details.is_customized == '0' ? true : false;
            if(isCustomised){
            options = Common.groupBy(['frequency'])(data.options)
            } 
            
            this.setState({
              documentDetails:data.document_details,
              financialYear:data.financial_year,
              options,
              payableOptions:data.payable_options,
              serviceDetails:data.service_details,
              totalAmount:parseFloat(data.service_details.service_charge),
              isCustomised,
              advanceAmount:data.payable_options.advance,
              onCompletion:data.payable_options.on_completion,
              relatedServices:data.related_services,
              isQuotation:data.service_details.quotation_required
  
            });
          
        }
      }).catch((e)=> {
        console.log("Error: ",e)
      });
  }

  handleCheckbox =(e)=> {
    let {totalAmount,selectedOptions} = this.state
      if(e.target.checked) {
        totalAmount += parseFloat(e.target.value)
        selectedOptions[e.target.name] = [...selectedOptions[e.target.name], e.target.value]
      }
      else {
        totalAmount -= parseFloat(e.target.value)
        selectedOptions[e.target.name] = selectedOptions[e.target.name].filter(i => i != e.target.value)
      }
      //push options value to array eg: monthly :{value}
      
      //check for advance fee
      let advanceAmount;
      if(selectedOptions.monthly.length > 0){
        advanceAmount = selectedOptions.monthly[0];
      } else if(selectedOptions.quarterly.length > 0){
        advanceAmount = selectedOptions.quarterly[0];
      } else if(selectedOptions.yearly.length > 0){
        advanceAmount = selectedOptions.yearly[0];
      } else {
        advanceAmount = 0;
      }
      this.setState({totalAmount,selectedOptions,advanceAmount})

  }

  render() {
    let {
      isQuotation,
      relatedServices,
      totalAmount,
      advanceAmount,
      isCustomised,
      documentDetails,
      financialYear,
      serviceDetails,
      payableOptions,
      options
    } = this.state;
    return (
      <>
        <div class="breadcrumbpane">
          <div class="container">
            <h1 class="pull-left"> {serviceDetails.category_name}</h1>
          </div>
        </div>
        <section className={"contact-section"} id="about">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="section-title text-center">
                  {/* <p>Business Startup Services</p>  */}
                </div>
                {/* <!-- /.section-title --> */}
              </div>
            </div>

            <div class="about-info">
              <div class="row">
              <div class="col-lg-8">
        <h3 class="servicehead">{serviceDetails?.service_name}</h3>
        <div class="servicebody">
          <div class="section-title">
            <p>{serviceDetails.description}</p>
          </div>
          <h2 class="contact-title">{ isCustomised ? "SELECT YOUR OPIONS" : "BRIEF DESCRIPTION OF REQUIREMENTS" }</h2>
          <div
            class=""
            style={{
              float: "right",
              marginTop: "6px",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Financial Year:&nbsp;
            <form style={{ float: "right", position: "relative", top: "-3px" }}>
              <select
                name="fyear"
                id="fyear"
                style={{ width: "100px", padding: "4px" }}
              >
                {financialYear?.length > 0 && 
                 financialYear.map((f)=> {
                  return <option value={f.id}>{f.display_name}</option>
                 }) 
                 }
                {/* <option value="2020">2020</option>
                <option value="2019">2019</option> */}
              </select>
            </form>
          </div>
          {isCustomised && <form
            class="form-contact"
            action="#"
            method="post"
            id="contactForm"
            novalidate="novalidate"
          >
            <div class="row">
              <div class="col-md-12  col-padding-normal">
                <table className="apply-form resty">
                  <tbody>
                    <tr>
                      <th width="30%">
                        <div class="pull-left">Monthly Filing</div>
                       {!isQuotation && <div class="pull-right">&nbsp;&nbsp;Fee</div>}
                        <div class="pull-right">
                          All <input  type="checkbox" name="month" />
                        </div>
                      </th>
                      <th width="30%">
                        <div class="pull-left">Quarterly Filing</div>
                        {!isQuotation && <div class="pull-right">&nbsp;&nbsp;Fee</div>}
                        <div class="pull-right">
                          All <input type="checkbox" name="quarter" />
                        </div>
                      </th>
                      <th width="25%">
                        Annual Filing
                       {!isQuotation && <div class="pull-right">&nbsp;&nbsp;Fee</div>}
                      </th>
                      <th width="30%">Total Charges</th>
                    </tr>
                    <tr>
                      <td>
                        {options.Monthly?.length > 0 &&
                        options.Monthly.map((m,k)=> {
                        return <><div key={k} class="pull-left">{m.frequency_stage_period}</div>
                       {!isQuotation && <div class="pull-right">
                          &nbsp;&nbsp;<i class="fa fa-rupee"></i>  {m.fee }
                        </div>
                        }
                        <div class="pull-right">
                          <input onChange={(e)=>this.handleCheckbox(e)} value={m.fee} type="checkbox" name="monthly"  />
                        </div>
                        <br />
                        <hr /> 
                        </>
                        })}
                        {/* <div class="pull-left">May</div>
                        <div class="pull-right">
                          &nbsp;&nbsp;<i class="fa fa-rupee"></i> 1000
                        </div>
                        <div class="pull-right">
                          <input type="checkbox" name="month"  />
                        </div>
                        <br />
                        <hr /> */}
                        
                      </td>
                      <td style={{ verticalAlign: "unset" }}>
                      {options.Quarterly?.length > 0 &&
                        options.Quarterly.map((m,k)=> {
                        return <><div k={k} class="pull-left">{m.frequency_stage_period}</div>
                        {!isQuotation && <div class="pull-right">
                          &nbsp;&nbsp;<i class="fa fa-rupee"></i> {m.fee}
                        </div>}
                        <div class="pull-right">
                          <input onChange={(e)=>this.handleCheckbox(e)} value={!isQuotation ? m.fee : 0} type="checkbox" name="quarterly"  />
                        </div>
                        <br />
                        <hr />
                        </>
                        })}
                        {/* <div class="pull-left">Quarter2</div>
                        <div class="pull-right">
                          &nbsp;&nbsp;<i class="fa fa-rupee"></i> 500
                        </div>
                        <div class="pull-right">
                          <input type="checkbox" name="quarter"  />
                        </div>
                        <br />
                        <hr /> */}
                      </td>
                      <td style={{ verticalAlign: "unset" }}>
                      {options.Yearly?.length > 0 &&
                        options.Yearly.map((m,k)=> {
                        return <> <div  k={k} class="pull-left">{m.frequency_stage_period}</div>
                        {!isQuotation  && <div class="pull-right">
                          &nbsp;&nbsp;<i class="fa fa-rupee"></i> {m.fee }
                        </div>}
                        <div class="pull-right">
                          <input onChange={(e)=>this.handleCheckbox(e)} value={!isQuotation ? m.fee : 0} type="checkbox" name="yearly"  />
                        </div>
                        <br />
                        <hr />
                        </>
                        })}
                      </td>
                      <td
                        style={{ verticalAlign: "unset", textAlign: "center" }}
                      >
                        <i class="fa fa-rupee"></i>{!isQuotation ? totalAmount: 0}
                      </td>
                    </tr>
                    {/* <!-- <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr> --> */}
                  </tbody>
                </table>
              </div>
            </div>
          </form>}
          <br/>
          {isCustomised && <h2 class="contact-title">BRIEF DESCRIPTION OF REQUIREMENTS</h2>}
          <form
            class="form-contact contact_form"
            method="post"
            id="contactForm"
            novalidate="novalidate"
          >
            <div class="row">
              <div class="col-md-12 col-padding-normal">
                <div class="form-group">
                  <textarea
                    class="form-control w-100"
                    name="message"
                    id="message"
                    cols="30"
                    rows="9"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Enter Message'"
                    placeholder="Enter Message"
                  ></textarea>
                </div>
              </div>
              <div class="col-md-12 col-padding-normal">
                <h2 class="contact-title">Documents Required</h2>
                <table className="apply-form resty">
                  <tr>
                    <th width="30%">Documents Type</th>
                    <th width="30%">Select a file to upload</th>
                    <th width="30%">Previous Uploaded Document</th>
                  </tr>
                  {documentDetails?.length > 0 &&
                    documentDetails.map((each, key) => {
                      return (
                        <tr>
                          <td key={key}>
                            {each.display_name}{" "}
                            {each.is_mandatory == "yes" && <span style={{color:'red'}}>*</span>}
                          </td>
                          <td>
                            <input
                              type="file"
                              name="fileToUpload"
                              id="fileToUpload"
                            />
                          </td>
                          <td>Previous Doc.</td>
                        </tr>
                      );
                    })}
                  {/* <tr>
                          <td>
                            PAN Card <span>*</span>
                          </td>
                          <td>
                            <input
                              type="file"
                              name="fileToUpload"
                              id="fileToUpload"
                            />
                          </td>
                          <td>Previous Doc.</td>
                        </tr> */}
                </table>
                {/* <!-- <p style="color: red;">[Note: (*) for Mandatory Field]</p> --> */}
                <div class="col-md-4  col-padding-normal" style={{ padding: "0" }}>
                  <div class="service-charges">
                    <p>
                      <b>
                    {!isQuotation ?
                        <>Service Charges: Rs. <i className="fa fa-rupee" />  totalAmount </>
                        :'Service Charges To Be Provided After Review'}
                      </b>
                      
                    </p>
                    {!isQuotation && 
                    <> <h4>Payable Option</h4>
                    <ol>
                      <li>
                        Advance: <span><i className="fa fa-rupee" /> {advanceAmount}</span>
                      </li>
                      <li>
                        As Per Payment Plan: <span><i className="fa fa-rupee" /> {totalAmount - advanceAmount}</span>
                      </li>
                    </ol> 
                    </>}
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group text-center">
              <a href="doc-submit.php" class="button" style={{ margin: "0" }}>
                Submit
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="#" class="button save-btn" style={{ margin: "0" }}>
                Save
              </a>
            </div>
          </form>
        </div>
      </div>
                <div class="col-md-4">
                <div class="mb-10">
                  <a href="create_own_services.php" class="create_own_services">
                    <i class="fa fa-gg" aria-hidden="true"></i>&nbsp;<h4>Create Your Own Services</h4>
                  </a>
                  </div>
                  <div class="servicebox">
                    <h3>Our Related Services</h3>
                    <div class="relatedservicesbox">
                      <a >
                        {/* <h4>Financial Funding and Debt Mgmt.</h4> */}
                        <ul>
                          {relatedServices.length > 0 &&
                            relatedServices.map((each, key) => {
                              return (
                              <Link to={`/apply-form/${each.category_id}/${each.id}`}>  <li>
                                  <i class="fa fa-cog"></i>{each.service_name}
                                </li>
                                </Link>
                              );
                            })}
                        </ul>
                      </a>
                    </div>
                  </div>
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
