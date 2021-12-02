import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import RestApi from "../../services/api";

function AppyService(props) {
  const [ServiceDetails, setServiceDetails] = useState({  
    document_details:[],
    financial_year:[],
    options:[],
    payable_options:{},
    service_details:{},
    isCustomised:false,
    totalAmount:0,
    advanceAmount:0,
  });

  let { id, sId } = useParams();

  useEffect(() => {
    fetchData();
  }, [id, sId]);

  const fetchData = () => {
    RestApi.serviceDocument(id, sId).then((res) => {
      // console.log(res);
      if (res.data.status) { 
          setServiceDetails({
            document_details:res.data.data.document_details,
            financial_year:res.data.data.financial_year,
            options:res.data.data.options,
            payable_options:res.data.data.payable_options,
            service_details:res.data.data.service_details,
            totalAmount:res.data.data.service_details.service_charge,
            isCustomised: res.data.data.service_details.is_customized,

          });
        
      }
    }).catch((e)=> {
      console.log("Error: ",e)
    });
  };
 
  return (
    <>
      <div class="col-lg-8">
        <h3 class="servicehead">{ServiceDetails.service_details?.service_name}</h3>
        <div class="servicebody">
          <div class="section-title">
            <p>{ServiceDetails.service_details?.description}</p>
          </div>
          <h2 class="contact-title">SELECT YOUR OPIONS</h2>
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
                {ServiceDetails.financial_year?.length > 0 && 
                 ServiceDetails.financial_year.map((f)=> {
                  return <option value={f.id}>{f.display_name}</option>
                 }) 
                 }
                {/* <option value="2020">2020</option>
                <option value="2019">2019</option> */}
              </select>
            </form>
          </div>
          {<form
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
                        <div class="pull-right">&nbsp;&nbsp;Fee</div>
                        <div class="pull-right">
                          All <input type="checkbox" name="month" />
                        </div>
                      </th>
                      <th width="30%">
                        <div class="pull-left">Quarterly Filing</div>
                        <div class="pull-right">&nbsp;&nbsp;Fee</div>
                        <div class="pull-right">
                          All <input type="checkbox" name="quarter" />
                        </div>
                      </th>
                      <th width="25%">
                        Annual Filing
                        <div class="pull-right">&nbsp;&nbsp;Fee</div>
                      </th>
                      <th width="30%">Total Charges</th>
                    </tr>
                    <tr>
                      <td>
                        <div class="pull-left">April</div>
                        <div class="pull-right">
                          &nbsp;&nbsp;<i class="fa fa-rupee"></i> 1000
                        </div>
                        <div class="pull-right">
                          <input type="checkbox" name="month" />
                        </div>
                        <br />
                        <hr />
                        <div class="pull-left">May</div>
                        <div class="pull-right">
                          &nbsp;&nbsp;<i class="fa fa-rupee"></i> 1000
                        </div>
                        <div class="pull-right">
                          <input type="checkbox" name="month" checked="" />
                        </div>
                        <br />
                        <hr />
                        
                      </td>
                      <td style={{ verticalAlign: "unset" }}>
                        <div class="pull-left">Quarter1</div>
                        <div class="pull-right">
                          &nbsp;&nbsp;<i class="fa fa-rupee"></i> 500
                        </div>
                        <div class="pull-right">
                          <input type="checkbox" name="quarter" checked="" />
                        </div>
                        <br />
                        <hr />
                        <div class="pull-left">Quarter2</div>
                        <div class="pull-right">
                          &nbsp;&nbsp;<i class="fa fa-rupee"></i> 500
                        </div>
                        <div class="pull-right">
                          <input type="checkbox" name="quarter" checked="" />
                        </div>
                        <br />
                        <hr />
                      </td>
                      <td style={{ verticalAlign: "unset" }}>
                        <div class="pull-left">Yearly</div>
                        <div class="pull-right">
                          &nbsp;&nbsp;<i class="fa fa-rupee"></i> 1000
                        </div>
                        <div class="pull-right">
                          <input type="checkbox" name="yearly" checked="" />
                        </div>
                        <br />
                        <hr />
                      </td>
                      <td
                        style={{ verticalAlign: "unset", textAlign: "center" }}
                      >
                        <i class="fa fa-rupee"></i> 8000.00
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
          <h2 class="contact-title">BRIEF DESCRIPTION OF REQUIREMENTS</h2>
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
                <table className="apply-form">
                  <tr>
                    <th width="30%">Documents Type</th>
                    <th width="30%">Select a file to upload</th>
                    <th width="30%">Previous Uploaded Document</th>
                  </tr>
                  {ServiceDetails.document_details?.length > 0 &&
                    ServiceDetails.document_details.map((each, key) => {
                      return (
                        <tr>
                          <td key={key}>
                            {each.display_name}{" "}
                            {each.is_mandatory == "yes" && <span>*</span>}
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
                <div class="col-md-3  col-padding-normal" style={{ padding: "0" }}>
                  <div class="service-charges">
                    <p>
                      <b>
                        Service Charges: Rs. <i className="fa fa-rupee" /> {ServiceDetails?.service_details?.service_charge}
                      </b>
                    </p>
                    <h4>Payable Option</h4>
                    <ol>
                      <li>
                        Advance: <span><i className="fa fa-rupee" /> {ServiceDetails.payable_options.advance}</span>
                      </li>
                      <li>
                        On Completion: <span><i className="fa fa-rupee" /> {ServiceDetails.payable_options.on_completion}</span>
                      </li>
                    </ol>
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
    </>
  );
}

export default AppyService;
