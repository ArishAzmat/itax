import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Common/header";
import NewsLetter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";
import userImage from "../../images/user.png";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "../../Components/modal/modalRoot";
import { toast } from "react-toastify";
import Footer from "../../Common/footer";
import Common from "../../Common/common";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

function Login(props) {
  const history = useHistory();
  const [showRegisterModal, setShowRegisterModal] = useState({
    status: false,
    message: "",
  });
  const [placeHolder, setPlaceHolder] = useState({});
  const [apiResponse, setApiResponse] = useState({message:'',error:''});
  const [responseError, setResponseError] = useState("");
  useEffect(() => {
    let params =
      props.activeForm == "serviceProvider"
        ? "business-partner-login"
        : "customer-login";
    RestApi.placeholder(params)
      .then((res) => {
        // console.log("placeholder login: ", res);
        setPlaceHolder(res.data.data);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandle = (data) => {
   handleFormLogin(data)
  };


  const handleResponse = (response) => {
    setApiResponse({error:'',message: "Login SuccessFull"});
    // console.log(response);
    RestApi.defaultToken(response.data.access_token);
    let res = response.data;
    let data = {
      name: res.data.first_name,
      email: res.data.email,
      phone: res.data.phone,
      last_name: res.data.last_name,
      middle_name: res.data.middle_name,
      photo: res.data.photo,
      isCustomer: res.data.is_customer,
      isServiceProvider: res.data.is_service_provider,
      isSubscribed: res.data.is_subscribed,
      _token: res.access_token,
    };
    Common.saveState(data, props.activeForm);
    props.dispatch({
      type: "LOGIN",
      payload: data,
    });
    let activeDashboard = '';
    if(data.isCustomer == 'yes' && data.isServiceProvider == 'yes'){
      activeDashboard = props.activeForm
    } else if (data.isServiceProvider == "yes") {
      activeDashboard = "serviceProvider";
    } else if (data.isCustomer == "yes") {
      activeDashboard = "customer";
    }
    props.dispatch({
      type: "DASHBOARD",
      payload: activeDashboard,
    });
   

    // setMessage("Login SuccessFull");

    setTimeout(() => {
      history.push(`/dashboard`);
    }, 1000);
  };
  const responseFacebook = (res) => {
    // handleShowMessageClick()
    // console.log(res);
    if (res.userID) {
      let data = {
        login_type: "facebook",
        profile_id: res.userID,
        first_name: res.name,
        is_customer: props.activeForm == "customer" ? "yes" : "no",
        is_service_provider: props.activeForm == "partner" ? "yes" : "no",
      };
      handleSocialLogin(data)
    } else {
      // alert("something went wrong");
    }
  };
  const responseGoogle = (googleRes) => {
    // console.log("data", googleRes);
    if (googleRes.googleId) {
      let data = {
        email: googleRes.profileObj.email,
        login_type: "google",
        profile_id: googleRes.googleId,
        first_name: googleRes.profileObj.givenName,
        last_name: googleRes.profileObj.familyName,
        is_customer: props.activeForm == "customer" ? "yes" : "no",
        is_service_provider: props.activeForm == "serviceProvider" ? "yes" : "no",
      };
      handleSocialLogin(data)
    } else {
      // alert("something went wrong");
    }
  };
  const handleFormLogin = (data) => {
    let { email, password } = data;
    RestApi.login(data).then((response) => {
      // console.log("reponse", response);

      if (response.data.error) {
        reset({ email: email, password: "" });
        let { error } = response.data;
        if(response.data.message){
          setApiResponse({message:'',error: response.data.message});
        }
       
      } else {
        // alert(response.data.message);
        if (response.data.status == false) {
          reset({ email: email, password: "" });
          if (response.data.status_code == 300) {
            setShowRegisterModal({
              status: true,
              message: response.data.message,
              data: {
                email: email,
                password: password,
                is_customer: props.activeForm == "cutsomer" ? "yes" : "no",
                is_service_provider:
                  props.activeForm == "serviceProvider" ? "yes" : "no",
              },
              type: "login",
            });
          } else {
            setApiResponse({message:'',error: response.data.message});
            // toast.error(response.data.message);
          }
        }
        if (response.data.access_token && response.data.status == true) {
          reset({ email: "", password: "" });
          // toast.success(response.data.message, {
          //   position: toast.POSITION.TOP_CENTER,
          //   autoClose: 2000,
          // });
          handleResponse(response);
        }
      }
    });
  }
const handleSocialLogin = (loginData) => {
  RestApi.socialLogin(loginData).then((res) => {
    // console.log("socialLogin: ", res);
    if (res.data.access_token && res.data.status == true) {
      handleResponse(res);
    }
    if (res.data.status == false && res.data.status_code == 300) {
      setShowRegisterModal({
        status: true,
        message: res.data.message,
        data: loginData,
        type: "socialLogin",
      });
    }
  }).catch(function (error) {
    console.log("Error!");
    return Promise.reject(error);
  });;
}
 
  const changeUser = (r) => {
    let data = showRegisterModal.data;
    if (r == true) {
      data.is_customer = "yes";
      data.is_service_provider = "yes";
    } else {
      
      if (data.is_customer == "yes") {
        props.setActiveForm('serviceProvider');
        data.is_customer = "no";
        data.is_service_provider = "yes";
        // changeForm('serviceProvider')
      } else if (data.is_service_provider == "yes") {
        props.setActiveForm('customer');
        data.is_customer = "yes";
        data.is_service_provider = "no";
        
      }
     
    }
    if(showRegisterModal.type == 'socialLogin') {
      handleSocialLogin(data)
    }
    else{
      handleFormLogin(data)
    }
  };
  const changeForm = (form) => {
    props.setActiveForm(form);
  };
  const handlClose = () => {
    showRegisterModal({ status: false, message: "" });
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
          <h1 className="pull-left"> Login</h1>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="login_register_box clearfix">
            <div className="sign-in-panel">
              <h4>Sign-in to your Account</h4>
              <div className="login-content clearfix">
                <img
                  className="pull-left"
                  src="https://itaxdoctor.idossapp.com/assets/front_end/images/lock.png"
                />

                <div className="login-details pull-right">
                  <div>
                    {/* <!-- Nav tabs --> */}
                    <ul className="nav nav-tabs" role="tablist">
                      <li
                        role="presentation"
                        onClick={() => changeForm("customer")}
                        className={`${
                          props.activeForm == "customer" ? "active" : ""
                        }`}
                      >
                        <a
                          // href="#customer"
                          aria-controls="home"
                          role="tab"
                          data-toggle="tab"
                        >
                          Customer
                        </a>
                      </li>
                      <li
                        role="presentation"
                        onClick={() => changeForm("serviceProvider")}
                        className={`${
                          props.activeForm == "serviceProvider" ? "active" : ""
                        }`}
                      >
                        <a
                          // href="#serviceProvider"
                          aria-controls="profile"
                          role="tab"
                          data-toggle="tab"
                        >
                          Business Partner
                        </a>
                      </li>
                    </ul>
                    {/* <!-- Tab panes --> */}
                    <div className="tab-content">
                      <div
                        role="tabpanel"
                        className="tab-pane active"
                        id="customer"
                      >
                        <FacebookLogin
                          appId="4879441725418635"
                          callback={responseFacebook}
                          render={(renderProps) => (
                            <div
                              onClick={renderProps.onClick}
                              style={{ cursor: "pointer" }}
                              className="facebook-box"
                            >
                              <a>
                                <div className="box-icon">
                                  <i className="fa fa-facebook"></i>
                                </div>
                                <div className="fb-box-txt">
                                  Log in with Facebook
                                </div>
                              </a>
                            </div>
                          )}
                        />

                        <GoogleLogin
                          clientId="686619883448-ltju3kbh1o2nmko9tco4h319b5ji7pgp.apps.googleusercontent.com"
                          buttonText="Login"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          cookiePolicy={"single_host_origin"}
                          render={(renderProps) => (
                            <div
                              onClick={renderProps.onClick}
                              className="google-box"
                            >
                              <a style={{ cursor: "pointer" }}>
                                <div className="box-icon">
                                  <i className="fa fa-google"></i>
                                </div>
                                <div className="gp-box-txt">
                                  Log in with Google
                                </div>
                              </a>
                            </div>
                          )}
                        ></GoogleLogin>
                        <div className="or-box">
                          <span>OR</span>
                        </div>
                        <form style={{marginTop:'-9px'}}
                          onSubmit={handleSubmit(onSubmitHandle)}
                          id="sky-form"
                          method="POST"
                          className="sky-form"
                        >
                          {/* {errors["email"] && (
                            <p className="alert-danger alert">
                              {" "}
                              {errors["email"]?.message}
                            </p>
                          )}
                          {errors["password"] && (
                            <p className="alert-danger alert">
                              {" "}
                              {errors["password"]?.message}
                            </p>
                          )} */}
                          <fieldset>
                            <section>
                              <div className="row">
                                <br />
                                <input
                                  {...register("is_customer")}
                                  type="hidden"
                                  name="is_customer"
                                  autocomplete="off"
                                  value={
                                    props.activeForm == "customer"
                                      ? "yes"
                                      : "no"
                                  }
                                />
                                <input
                                  {...register("is_service_provider")}
                                  type="hidden"
                                  name="is_customer"
                                  autocomplete="off"
                                  value={
                                    props.activeForm == "serviceProvider"
                                      ? "yes"
                                      : "no"
                                  }
                                />
                                <div className="col col-12">
                                  <label className="input login-form-input">
                                    <i className="icon-append fa fa-envelope-o"></i>
                                    <input
                                      style={errors["email"] && styles.error}
                                      {...register("email")}
                                      type="text"
                                      placeholder="Email"
                                      name="email"
                                      autocomplete="off"
                                    />
                                    {errors["email"] && (
                                      <span style={{ color: "#bf1f24" }}>
                                        {errors["email"].message}
                                      </span>
                                    )}
                                  </label>
                                </div>
                              </div>
                            </section>
                            <section>
                              <div className="row">
                                <div className="col col-12">
                                  <label className="input login-form-input">
                                    <i className="icon-append fa fa-lock"></i>
                                    <input
                                      style={errors["password"] && styles.error}
                                      {...register("password")}
                                      type="password"
                                      name="password"
                                      placeholder="Password"
                                    />
                                    {errors["password"] && (
                                      <span style={{ color: "#bf1f24" }}>
                                        {errors["password"].message}
                                      </span>
                                    )}
                                  </label>
                                </div>
                              </div>
                            </section>
                          </fieldset>

                          <div className="form-group clearfix">
                            <div className="chkbox-group pull-left">
                              <input style={{marginBottom:'2px'}} type="checkbox" name="remember" />
                              <label> Remember me</label>
                            </div>
                            <div className="pull-right">
                              <a href="#" className="forgot-pw">
                                Forgot password?
                              </a>
                            </div>
                            <div className="text-center">
                              <button
                                style={{ width: "95%", marginLeft: "0px" }}
                                type="submit"
                                name="sign_in"
                                className="button sign_in col"
                              >
                                Ok, Sign in !
                              </button>
                            </div>
                          </div>
                          { apiResponse?.message.length > 0 &&
                            <>
                            <br/>
                                <div style={{marginBottom:'-20px'}} className="careerErrorMessage">
                                  {" "}
                                  <span className="alert alert-success">
                                    {apiResponse?.message}
                                  </span>
                                </div>
                                </>
                          }
                          {apiResponse?.error.length > 0 &&
                      <>
                      <br/>
                          <div style={{marginBottom:'-20px'}} className="careerErrorMessage">
                            {" "}
                            <span className="alert alert-danger">
                              {apiResponse?.error}
                            </span>
                          </div>
                          </>
                      }
                        </form>
                        <div
                          className="login-footer clearfix"
                          style={{ marginRight: "0px" }}
                        >
                          <p className="pull-left">Don't have any account?</p>
                          <Link
                            to={
                              props.activeForm == "serviceProvider"
                                ? "/partner-register"
                                : "/register"
                            }
                            className="btn btn-login pull-right"
                          >
                            Create Account
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {placeHolder?.image && placeHolder?.description && (
              <div className="Register_benefits">
                {/* <h4>Creat an Account</h4> */}
                {/* <h5>
                New User? <span>"Register to Become a Member"</span>
              </h5>
              <p>
                <strong>Registered User Benefits...</strong>
              </p> */}
                <img src={placeHolder.image} />
                <div
                  dangerouslySetInnerHTML={{
                    __html: placeHolder.description,
                  }}
                />
                {/* <ul>
                <li>
                  <i className="fa fa-circle"></i>File Free ITR online
                </li>
                <li>
                  <i className="fa fa-circle"></i>Get an Expert Assistances
                </li>
                <li>
                  <i className="fa fa-circle"></i>Auto Extract of TDS Data
                </li>
                <li>
                  <i className="fa fa-circle"></i>Processing Status of ITR Return
                </li>
                <li>
                  <i className="fa fa-circle"></i>Enjoy more service after upgrading
                  your packages
                </li>
              </ul> */}
              </div>
            )}
          </div>
        </div>
      </section>
      <Modal
        isOpen={showRegisterModal.status}
        title="Confirm"
        close={() => handlClose()}
        body={
          <div className="col">
            {showRegisterModal.message}
            <div className="yes-no-btn" >
              <button
                style={{marginRight: "20px" }}
                onClick={() => changeUser(true)}
              >
                Yes
              </button>
              <button
              style={{ }}
                onClick={() => changeUser(false)}
                className="button save-btn"
              >
                {" "}
                No{" "}
              </button>
            </div>
          </div>
        }
      />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default connect((state, props) => {
  return {
    isLogged: state.isLogged && state.isLogged,
    userDetails: state.userDetails && state.userDetails,
    // dashboard: state?.dashboard
  };
})(Login);
