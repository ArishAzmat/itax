import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Common/footer";
import Header from "../../Common/header";
import NewsLetter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";
import userImage from "../../images/user.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Modal from "../../Components/registerModal";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email ")
    .required("Email is required"),
  agree: Yup.boolean().oneOf([true]),
  register_as:Yup.string().required('').default('Individual'),
  phone: Yup.string()
    .required("Phone is required")
    .matches("^[0-9]{10}$", "Phone number is not valid"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Alphabat, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .when("password", (password, schema) => {
      if (password) return schema.required("Confirm Password is required");
    })
    .oneOf([Yup.ref("password")], "Passwords must match"),
}) .when((values, schema) => {
  if (values.register_as == 'Company' || values.register_as == 'Partner' ) {
    return schema.shape({
      company_name: Yup.string().required("Company name is required"),
      sign_in_authority: Yup.string().required("Sign in authority name is required"),
     
    });
  }
  else {
    return schema.shape({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
    }); 
  }
});
function CustomerRegister(props) {
  const history = useHistory();
  const [placeHolder, setPlaceHolder] = useState({});
  const [responseError, setResponseError] = useState([]);
  const [message, setMessage] = useState('');
  const [registerType, setRegisterType] = useState("Individual");

  useEffect(() => {
    RestApi.placeholder("customer-register").then((res) => {
      // console.log("placeHolder: customer-register: ", res);
      setPlaceHolder(res.data.data);
      setRegisterType("Individual")
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandle = (data) => {
    setResponseError([])
    setMessage("")
    let form = new FormData();
    for (var i in data) {
      form.append(i, data[i]);
    }
    if (registerType != "Individual") {
      form.append("first_name", getValues("company_name"));
    }
    RestApi.register(form).then((res) => {
      // console.log("resss", res);
      if (res.data.status == true) {
        // toast.success(res.data.message, {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 2000,
        // });
        reset();  
        //if get token after registration
        // props.dispatch({
        //   type: "LOGIN",
        //   payload: res.data.data,
        // });
        setMessage(res.data.message)
        setRegisterType('Individual')
      // setInterval(() => {
        // history.push(`/login`);
      // }, 2000);
      }
      if (res.data.error) {
        let { error } = res.data;
        //  console.log(err)
        let array = Object.entries(error).map((e) => {
          return { [e[0]]: e[1][0] };
        });
        setResponseError(array);
        // error.email && toast.error(error.email[0]);
        // error.password && toast.error(error.password[0]);
        // res.data.message && toast.error(res.data.message);

        // alert(res.data.message);
      } else {
        // alert(res.data.message);
        // setResponseError({});
      }
    });
  };
  const handleChange = (e) => {
    setRegisterType(e.target.value);
    setValue("register_as", e.target.value);
  };
  const styles = {
    error: {
      borderColor: "#bf1f24",
    },
  };

  return (
    <div>
      <Header />
      <div id="home-page">
        <div className="breadcrumbpane">
          <div className="container">
            <h1 className="pull-left"> Customer Register</h1>
          </div>
        </div>

        <div className="container">
          <div className="login_register_box clearfix">
            <div className="sign-in-panel">
              <h4>Create your Account</h4>
              <div className="login-content">
                <div className="login-details align-content-center">
                  <form
                    onSubmit={handleSubmit(onSubmitHandle)}
                    id="sky-form"
                    method="POST"
                    className="sky-form"
                  >
                    <fieldset>
                      <section className="customer-reg-section">
                        <div class="row">
                          <div class="col col-10">
                            <label class="input"  style={{marginRight:'20px'}}>
                              <select
                              style={{height:'23px'}}
                                onChange={(e) => handleChange(e)}
                                id="register"
                                class="customer-register-type form-control selectpicker customer_down_arrow"
                                data-style="btn-white" 
                              >
                                <option selected="1" disabled>
                                  Register As
                                </option>
                                <option
                                  selected={
                                    registerType == "Individual" && "selected"
                                  }
                                  value="Individual"
                                >
                                  Individual
                                </option>
                                <option
                                  selected={
                                    registerType == "Company" && "selected"
                                  }
                                  value="Company"
                                >
                                  Company
                                </option>
                                <option
                                  selected={
                                    registerType == "Partner" && "selected"
                                  }
                                  value="Partner"
                                >
                                  Partner
                                </option>
                              </select>
                              {errors["register_as"] && (
                                <span style={{ color: "#bf1f24" }}>
                                  {errors["register_as"].message}
                                </span>
                              )}
                            </label>
                          </div>
                        </div>
                      </section>
                      <section className="customer-reg-section">
                        <div className="row">
                          <div className="col col-10">
                            <label className="input">
                              <i className="icon-append fa fa-envelope-o"></i>
                              {/* {errors["email"] && (
                                <>
                                  <br />
                                  <p className="alert-danger alert">
                                    {" "}
                                    {errors["email"]?.message}
                                  </p>
                                </>
                              )} */}
                              <input
                                type="hidden"
                                {...register("is_customer")}
                                value="yes"
                                autoComplete="off"
                              />
                              <input
                                type="hidden"
                                {...register("is_service_provider")}
                                value="no"
                              />
                              <input
                                style={errors["email"] && styles.error}
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                autoComplete="off"
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
                      {(registerType == "Company" || registerType == "Partner") ?( <>
                      <section className="customer-reg-section">
                        <div className="row">
                          <div className="col col-10">
                            <label
                              className="input" 
                            >
                              <i className="icon-append fa fa-user-o"></i>
                              <input
                                type="text"
                                {...register("company_name")}
                                placeholder="Company Name"
                                autocomplete="off"
                              />
                               {errors["company_name"] && (
                                <span style={{ color: "#bf1f24" }}>
                                  {errors["company_name"].message}
                                </span>
                              )}
                              {/* extra */}
                              {/* <input
                                type="hidden"
                                {...register("first_name")}
                                value={getValues("company_name")}
                                placeholder="Company Name"
                                autocomplete="off"
                              /> */}
                              {/* extra */}
                            </label>
                          </div>
                        </div>
                      </section>
                      <section className="customer-reg-section">
                        <div className="row">
                          <div className="col col-10">
                            <label
                              className="input"
                            >
                              <i className="icon-append fa fa-user-o"></i>
                              <input
                                type="text"
                                {...register("sign_in_authority")}
                                placeholder="Sign In Authority"
                                autocomplete="off"
                              />
                                {errors["sign_in_authority"] && (
                                <span style={{ color: "#bf1f24" }}>
                                  {errors["sign_in_authority"].message}
                                </span>
                              )}
                            </label>
                          </div>
                        </div>
                      </section>
                    </> ) : 
                     (
                      <>
                    <section className="customer-reg-section">
                      <div className="row">
                        <div className="col col-10">
                          <label className="input">
                            <i className="icon-append fa fa-user-o"></i>
                            <input
                              style={errors["first_name"] && styles.error}
                              type="text"
                              placeholder="First Name"
                              {...register("first_name")}
                              autoComplete="off"
                            />
                            {errors["first_name"] && (
                              <span style={{ color: "#bf1f24" }}>
                                {errors["first_name"].message}
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </section>
                    <section className="customer-reg-section">
                      <div className="row">
                        <div className="col col-10">
                          <label className="input">
                            <i className="icon-append fa fa-user-o"></i>

                            <input
                              type="text"
                              placeholder="Middle Name"
                              name="middle_name"
                              {...register("middle_name")}
                              autoComplete="off"
                            />
                          </label>
                        </div>
                      </div>
                    </section>
                    <section className="customer-reg-section">
                      <div className="row">
                        <div className="col col-10">
                          <label className="input">
                            <i className="icon-append fa fa-user-o"></i>
                            <input
                              type="text"
                              placeholder="Last Name"
                              {...register("last_name")}
                              autocomplete="off"
                            />
                             {errors["last_name"] && (
                              <span style={{ color: "#bf1f24" }}>
                                {errors["last_name"].message}
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </section>
                    </>
                    ) }
                      <section className="customer-reg-section">
                        <div className="row">
                          <div className="col col-10">
                            <label className="input">
                              <i className="icon-append fa fa-mobile"></i>
                              {/* {errors["phone"] && (
                                <>
                                  <br />
                                  <p className="alert-danger alert">
                                    {" "}
                                    {errors["phone"]?.message}
                                  </p>
                                </>
                              )} */}
                              <input
                                style={errors["phone"] && styles.error}
                                type="text"
                                placeholder="Mobile"
                                {...register("phone")}
                                autocomplete="off"
                              />
                              {errors["phone"] && (
                                <span style={{ color: "#bf1f24" }}>
                                  {errors["phone"].message}
                                </span>
                              )}
                            </label>
                          </div>
                        </div>
                      </section>
                      <section className="customer-reg-section">
                        <div className="row">
                          <div className="col col-10">
                            <label className="input">
                              <i className="icon-append fa fa-lock"></i>
                              {/* {errors["password"] && (
                                <>
                                  <br />
                                  <p className="alert-danger alert">
                                    {" "}
                                    {errors["password"]?.message}
                                  </p>
                                </>
                              )} */}
                              <input
                                style={errors["password"] && styles.error}
                                type="password"
                                {...register("password")}
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
                      <section className="customer-reg-section">
                        <div className="row">
                          <div className="col col-10">
                            <label className="input">
                              <i className="icon-append fa fa-lock"></i>
                              {/* {errors["confirmPassword"] && (
                                <>
                                  <br />
                                  <p className="alert-danger alert">
                                    {" "}
                                    {errors["confirmPassword"]?.message}
                                  </p>
                                </>
                              )} */}
                              <input
                                style={
                                  errors["confirmPassword"] && styles.error
                                }
                                type="password"
                                {...register("confirmPassword")}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                              />
                              {errors["confirmPassword"] && (
                                <span style={{ color: "#bf1f24" }}>
                                  {errors["confirmPassword"].message}
                                </span>
                              )}
                            </label>
                          </div>
                        </div>
                      </section>
                      <div
                        style={{ marginLeft: "30px" }}
                        className="chkbox-group"
                      >
                        <input
                          type="checkbox"
                          name="agree"
                          {...register("agree")}
                        />
                        <span style={errors["agree"] && { color: "#bf1f24" }}>
                          I have read and agree to all the{" "}
                        </span>
                        <a
                          style={errors["agree"] && { color: "#bf1f24" }}
                          href="#"
                        >
                          Term & Condition
                        </a>
                      </div>
                    </fieldset> 
                    {responseError.length > 0 &&
                      responseError.map((er) => {
                        console.log(er);
                        return (
                          <>
                          <br/>
                          <div className="careerErrorMessage">
                            {" "}
                            <span className="alert alert-danger">
                              {Object.values(er)}
                            </span>
                          </div>
                          </>
                        );
                      })}
                    
                    <div className="sign-btn">
                      <button
                        style={{ width: "83.5%", marginLeft: "28px" }}
                        type="submit"
                        name="sign_in"
                        className="button col"
                      >
                        Create Account
                      </button>
                    </div>
                    {message.length > 0 && 
                  <> <br/>
                     <div className="subscirbeMessage">
                        <div className="alert alert-success">
                        {message}</div></div></>
                        }
                  </form>
                  <div
                    
                    className="login-footer clearfix login-footer-customer"
                  >
                    <p className="pull-left cust_log">
                      Already have an account?
                    </p>
                    <Link
                      to="/login"
                      className="btn btn-login pull-right cust_login"
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {placeHolder?.image && placeHolder?.description && (
              <div className="Register_benefits">
                {/* <h4>Member / Registered User Benefits...</h4>
              <h5>
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
        <NewsLetter />
      </div>
      <Footer />
    </div>
  );
}

export default connect(function (state, props) {
  return {
    isLogged: state?.isLogged,
    userDetails: state?.userDetails,
  };
})(CustomerRegister);
