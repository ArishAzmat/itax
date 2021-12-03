import React, {useState } from "react";
import { connect } from "react-redux";
import Footer from "../../Common/footer";
import Header from "../../Common/header";
import NewsLetter from "../../Components/home/subscribeNewsletter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RestApi from '../../services/api'
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  name: yup.string().required("Name is required"),
  phone: yup.string()
    .required("Phone is required")
    .matches("^[0-9]{10}$", "Phone number is not valid"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});
function ContactUs(props) {
  const  [message, setMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandle = (data) => {
    RestApi.contactUs(data).then((res)=>{
      // console.log(res)
      if(res.data.message){
        reset()
        // toast.success(res.data.message, {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 5000,
        // });
        setMessage(res.data.message)
      }
    })
    
  };

  const styles = {
    error: {
      borderColor: "#bf1f24",
    },
  };
  return (
    <div>
      <Header />
      <div className="breadcrumbpane">
        <div className="container">
          <h1 className="pull-left"> Contact Us</h1>
        </div>
      </div>

      <section className="internalcontent">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <p>
                  Feel free to talk to our online representative at any time you
                  please using our Live Chat system on our website or one of the
                  below instant messaging programs.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="contactinfo" style={{ boxShadow: "none" }}>
                <h3>Contact info</h3>
                {props.contactDetails?.content && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.contactDetails.content,
                    }}
                  />
                )}
              </div>
              {/* <!-- <hr>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.8595725040977!2d72.82809960000003!3d18.937608900000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1de1c3f1dc9%3A0x88328bf32b9dcd66!2sSNDT+Women's+University!5e0!3m2!1sen!2sin!4v1443429933230" 
                width="100%" height="250" frameborder="0" style="border:0" allowfullscreen=""></iframe> --> */}
            </div>
            <div class="col-md-6">
              <div class="contactinfo">
                <h3>Contact Form</h3>
                <form
                  onSubmit={handleSubmit(onSubmitHandle)}
                  id="sky-form"
                  class="sky-form"
                  method="POST"
                  action="#"
                >
                  <fieldset>
                    <input type="hidden" name="id" />
                    <div class="row">
                      <section class="col col-md-12">
                        <label class="input contactUs-input">
                          <p>Name</p>
                          <i
                            style={{ top: "18px" }}
                            class="icon-append fa fa-user"
                          ></i>
                          <input 
                          style={errors["name"] && styles.error}
                          {...register("name")}
                           type="text"  />
                           {errors["name"] && (
                                <span style={{ color: "#bf1f24" }}>
                                  {errors["name"].message}
                                </span>
                              )}
                        </label>
                      </section>
                    </div>
                    <div class="row">
                      <section class="col col-md-12">
                        <label class="input contactUs-input">
                          <p>Email</p>

                          <i
                            style={{ top: "18px" }}
                            class="icon-append fa fa-envelope"
                          ></i>
                          <input
                          style={errors["email"] && styles.error}
                          {...register("email")}
                           type="text"  />
                            {errors["email"] && (
                                <span style={{ color: "#bf1f24" }}>
                                  {errors["email"].message}
                                </span>
                              )}
                        </label>
                      </section>
                    </div>
                    <div class="row">
                      <section class="col col-md-12">
                        <label class="input contactUs-input">
                          <p>Mobile</p>
                          <i
                            style={{ top: "18px" }}
                            class="icon-append fa fa-phone"
                          ></i>
                          <input
                          style={errors["phone"] && styles.error}
                          {...register("phone")}
                            type="text" />
                              {errors["phone"] && (
                                <span style={{ color: "#bf1f24" }}>
                                  {errors["phone"].message}
                                </span>
                              )}
                        </label>
                      </section>
                    </div>
                    <div class="row">
                      <section class="col col-md-12">
                        <label class="input contactUs-input">
                          <p>Subject</p>
                          <i
                            style={{ top: "18px" }}
                            class="icon-append fa fa-tag"
                          ></i>
                          <input
                          style={errors["subject"] && styles.error}
                          {...register("subject")}
                            type="text"  />
                              {errors["subject"] && (
                                <span style={{ color: "#bf1f24" }}>
                                  {errors["subject"].message}
                                </span>
                              )}
                        </label>
                      </section>
                    </div>
                    <div class="row">
                      <section class="col col-md-12">
                        <label class="textarea contactUs-input">
                          <p>Message</p>
                          <i
                            style={{ top: "18px" }}
                            class="icon-append fa fa-comment"
                          ></i>
                          <textarea 
                          style={errors["message"] && styles.error}
                          {...register("message")}
                            rows="5"></textarea>
                              {errors["message"] && (
                                <span style={{ color: "#bf1f24" }}>
                                  {errors["message"].message}
                                </span>
                              )}
                        </label>
                      </section>
                    </div>
                    <div class="row" style={{ textAlign: "-webkit-center" }}>
                     {message.length > 0 && 
                     <div className="subscirbeMessage">
                        <div className="alert alert-success">
                        {message}</div></div>
                        }
                      <button class="button col" type="submit">
                        Submit
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NewsLetter />
      <Footer />
    </div>
  );
}
export default connect((state, props) => {
  return {
    contactDetails: state.contactDetails,
  };
})(ContactUs);
