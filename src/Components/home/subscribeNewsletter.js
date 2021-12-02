import React, { useEffect, useState } from "react";
import newsletterImage from "../../images/newsletter-text.png";
import RestApi from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  name: yup.string().required("Name is required"),
});

function Newsletter() {
  const [message,setMessage]=useState("")
  const [errorMessage,setErrorMessage]=useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    // lifecycle here
  }, []);

  const onSubmitHandle = (data) => {
    RestApi.subscribe(data).then((res) => {
      // console.log("subs", res);

      if (res.data.message && res.data.status == false) {
        // toast.error(res.data.message,{
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 10000,
        // });
        setErrorMessage(res.data.message)
        setMessage("")
      }
      if (res.data.message && res.data.status) {
        reset();
        setMessage(res.data.message)
        setErrorMessage("")
        // console.log("subs", res.data.message);
        // toast.success(response.data.message, {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 2000,
        // });
        // toast.success(res.data.message, {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 10000,
        // });
      }
    });
  };
  // console.log(errors)
  const styles = {
    top: {
      top: "6px",
    },
    error: {
      borderColor: "#bf1f24",
    },
  };
  return (
    <section className="newslettersubscription_pane">
      <div className="container">
        <div className="newsletter-section">
          <div className="newslettersection-left">
            <img src={newsletterImage} />
          </div>
          <div className="newslettersection-subcribeform">
            <p>
              Enter Your Name and Email Address To Receive All Tax And Finance
              Related News From Our Website
              <br />* Don't Worry You'll Not be Spammed
            </p>
            <div className="row">
              <div>
                <form onSubmit={handleSubmit(onSubmitHandle)}>
                  <div className="col-md-4">
                    <input
                      type="text"
                      style={errors["name"] && styles.error}
                      {...register("name")}
                      // name="firstname"
                      // onChange={(e) => setName(e.target.value)}
                      id="firstname"
                      className="form-control inputpane"
                      placeholder="Enter Your Name"
                    />
                    {errors["name"] && (
                      <span style={{ color: "#bf1f24" }}>
                        {errors["name"].message}
                      </span>
                    )}
                    <span
                      id="error"
                      className="error"
                      style={{ display: "none", color: "red" }}
                    >
                      Enter User Name
                    </span>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      style={errors["email"] && styles.error}
                      {...register("email")}
                      // name="emailaddress"
                      // onChange={(e) => setEmail(e.target.value)}
                      id="emailaddress"
                      className="form-control inputpane"
                      placeholder="Enter Your Email Address"
                    />
                    {errors["email"] && (
                      <span style={{ color: "#bf1f24" }}>
                        {errors["email"].message}
                      </span>
                    )}
                    <span
                      id="err"
                      className="error"
                      style={{ display: "none", color: "red" }}
                    >
                      Enter email address
                    </span>
                  </div>
                  <div className="col-md-4">
                    <button
                      className="button newsletter no-pip"
                      name="newsletter"
                      id="newsletter"
                    >
                      Subscribe Newsletter
                      <span>
                        <i className="fa fa-envelope-o"></i>
                      </span>
                    </button>
                  </div>
                  {message.length > 0 && <div className=" m-10 subscirbeMessage col-md-10">
                    <br/>
                    <div className="alert alert-success">{message}</div>
                    </div>}
                    {errorMessage.length > 0 && <div className="m-10 subscirbeMessage col-md-10">
                    <br/><div className="alert alert-danger">{errorMessage}</div>
                    </div>}
                </form>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
