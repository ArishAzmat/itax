import React, { Component } from "react";
import Footer from "../../Common/footer";
import NewsLetter from '../../Components/home/subscribeNewsletter'
import RestApi from "../../services/api";
import PartnerRegister from "../../Components/home/partnerRegister";
export default class partnerWithUs extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: ''
    }
  }

  componentDidMount(){
    this.fetchData()
  }
  fetchData(){
    RestApi.parterWithUs().then((res)=> {
      // console.log("parter: ",res)
      if(res.data.status){
        this.setState({
          content : res.data.data.content
        })
      }
     
    })
  }
  render() {
    const styles = {
      top: {
        // top: "6px",
      },
      display: {
        display: "none",
        color: "red",
      },
    };
    return (
      <div>
        <div className="breadcrumbpane">
          <div className="container">
            <h1 className="pull-left">PARTNER WITH US</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 partnerContent">
            <div
                      dangerouslySetInnerHTML={{
                        __html: this.state.content,
                      }}
                    /> 
            </div>

           <PartnerRegister />
          </div>
        </div>

       <NewsLetter/>
       <Footer/>
      </div>
    );
  }
}
