import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Common/footer";
import Header from "../../Common/header";
import NewsLetter from "../../Components/home/subscribeNewsletter";
import RestApi from "../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import userImage from "../../images/user.png";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email ")
    .required("Email is required"),
  // first_name: Yup.string().required("First name is required"),
  agree: Yup.boolean().oneOf([true]),
  // area_of_expertise: up
  // .array()
  // .of(
  //   up.object().shape({
  //     id: up.string(),
  //     name: up.string()
  //   })
  // )
  // .default([])
  // .oneOf([true], "Must choose one"),
  //   last_name: Yup.string().required("Last name is required"),
  // area_of_expertise: Yup.object({checked: Yup.array()
  //   .min(1, 'Select atleast one option of your interest') }),

  phone: Yup.string()
    .required("Phone is required")
    .matches("^[0-9]{10}$", "Phone number is not valid"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Alphabat, One Number and one special case Character"
    ),
  passwordConfirmation: Yup.string()
    .when("password", (password, schema) => {
      if (password) return schema.required("Confirm Password is required");
    })
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
function PartnerRegister(props) {
  const history = useHistory();
  const [responseError, setResponseError] = useState({});
  const [placeHolder, setPlaceHolder] = useState({});
  const [registerType, setRegisterType] = useState("Individual");
  const [categoryOne,setCategoryOne] = useState([])
  const [categoryTwo,setCategoryTwo] = useState([])


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

  useEffect(() => {
    RestApi.placeholder("business-partner-register").then((res) => {
      console.log("placeHolder: business-partner-register: ", res);
      setPlaceHolder(res.data.data);
    });
    let categoryOne = []
    let categoryTwo = []
    
   if(props.categories && props.categories.length > 0) {
    props.categories.map((each,i)=> {
      if (i <= 9) {
        categoryOne.push(each);
      } else {
        categoryTwo.push(each);
      }
    })
    setCategoryOne(categoryOne)
    setCategoryTwo(categoryTwo)
   }
  }, [props.categories]);

  const onSubmitHandle = (data) => {
    console.log(data);
    RestApi.register(data).then((res) => {
      console.log("resss", res);
      if (res.data.status == true) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 10000,
        });
        reset();
        //if get token after registration
        // props.dispatch({
        //   type: "LOGIN",
        //   payload: res.data.data,
        // });
        history.push(`/login`);
      }
      if (res.data.error) {
        let { error } = res.data;
        //  console.log(err)
        // setResponseError(err);
        error.email &&
          toast.error(error.email[0], {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
          });
        error.password &&
          toast.error(error.password[0], {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
          });
        res.data.message &&
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
          });

        // alert(res.data.message);
      } else {
        // alert(res.data.message);
        // setResponseError({});
      }
    });
  };
  console.log(errors);
  const styles = {
    error: {
      borderColor: "#bf1f24",
    },
  };
  const handleChange =(e)=> {
    setRegisterType(e.target.value)
    setValue("register_as", e.target.value)
   console.log( getValues("register_as"))
  }
  return (
    <div>
      <Header />
      <div className="breadcrumbpane">
        <div className="container">
          <h1 className="pull-left"> Partner Register</h1>
        </div>
      </div>

      {/* <!---partner_reg----> */}
      <div className="container">
        <div className="login_register_box clearfix">
          <div className="sign-in-panel">
            <h4>Create your Account</h4>
            <div className="login-content">
              <div className="partner_reg">
                <form
                  id="sky-form"
                  method="POST"
                  className="sky-form"
                  onSubmit={handleSubmit(onSubmitHandle)}
                >
                  <fieldset>
                    <section>
                      <div class="row">
                        <div class="col col-10">
                          <label class="input">
                            {/* <!-- <i class="icon-append fa fa-angle-down"></i> --> */}
                            <select
                              onChange={(e) => handleChange(e) }
                              id="register"
                              // {...register("register_as")}
                              class="form-control selectpicker customer_down_arrow"
                              data-style="btn-white"
                              style={{ width: "95.6%" }}
                            >
                              <option selected={registerType == "Individual" && "selected"} value="Individual">Individual</option>
                              <option selected={registerType == "Company" && "selected"} value="Company">Company</option>
                              <option selected={registerType == "Partner" && "selected"} value="Partner">Partner</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    </section>
                    <section>
                      <div className="row">
                        <div className="col col-10">
                          <input
                            type="hidden"
                            {...register("register_as")}
                            value=""
                          />
                          <input
                            type="hidden"
                            {...register("is_service_provider")}
                            value="yes"
                          />
                          <input
                            type="hidden"
                            {...register("is_customer")}
                            value="no"
                          />
                          <label className="input">
                            <i className="icon-append fa fa-envelope-o"></i>
                            <input
                              type="email"
                              style={errors["email"] && styles.error}
                              placeholder="Email"
                              {...register("email")}
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
                    {/* handleChange */}
                    {registerType == "Individual" ? (
                      <>
                        {" "}
                        <section>
                          <div className="row">
                            <div className="col col-10">
                              <label className="input">
                                <i className="icon-append fa fa-user-o"></i>
                                <input
                                  {...register("first_name")}
                                  type="text"
                                  style={errors["first_name"] && styles.error}
                                  placeholder="First Name"
                                  autocomplete="off"
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
                        <section>
                          <div className="row">
                            <div className="col col-10">
                              <label className="input">
                                <i className="icon-append fa fa-user-o"></i>
                                <input
                                  {...register("middle_name")}
                                  type="text"
                                  placeholder="Middle Name"
                                  autocomplete="off"
                                />
                              </label>
                            </div>
                          </div>
                        </section>
                        <section>
                          <div className="row">
                            <div className="col col-10">
                              <label className="input">
                                <i className="icon-append fa fa-user-o"></i>
                                <input
                                  type="text"
                                  {...register("last_name")}
                                  placeholder="Last Name"
                                  autocomplete="off"
                                />
                              </label>
                            </div>
                          </div>
                        </section>
                      </>
                    ) : (
                      <>
                        <section>
                          <div className="row">
                            <div className="col col-10">
                              <label className="input">
                                <i className="icon-append fa fa-user-o"></i>
                                <input
                                  type="text"
                                  {...register("company_name")}
                                  placeholder="Company Name"
                                  autocomplete="off"
                                />
                                {/* extra */}
                                <input
                                  type="hidden"
                                  {...register("first_name")}
                                  value={getValues("company_name")}
                                  placeholder="Company Name"
                                  autocomplete="off"
                                />
                                {/* extra */}
                              </label>
                            </div>
                          </div>
                        </section>
                        <section>
                          <div className="row">
                            <div className="col col-10">
                              <label className="input">
                                <i className="icon-append fa fa-user-o"></i>
                                <input
                                  type="text"
                                  {...register("sign_in_authority")}
                                  placeholder="Sign In Authority"
                                  autocomplete="off"
                                />
                              </label>
                            </div>
                          </div>
                        </section>
                      </>
                    )}
                    {/* handleChange */}

                    <section>
                      <div class="row">
                        <div className="col col-10">
                          <label className="input">
                            <i className="icon-append fa fa-mobile"></i>
                            <input
                              type="text"
                              placeholder="Mobile"
                              style={errors["phone"] && styles.error}
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

                    <section>
                      <div class="row">
                        <div className="col col-10">
                          <label className="input">
                            <i className="icon-append fa fa-lock"></i>
                            <input
                              {...register("password")}
                              style={errors["password"] && styles.error}
                              type="password"
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
                    <section>
                      <div class="row">
                        <div className="col col-10">
                          <label className="input">
                            <i className="icon-append fa fa-lock"></i>
                            <input
                              {...register("passwordConfirmation")}
                              type="password"
                              style={
                                errors["passwordConfirmation"] && styles.error
                              }
                              placeholder="Confirm Password"
                            />
                            {errors["passwordConfirmation"] && (
                              <span style={{ color: "#bf1f24" }}>
                                {errors["passwordConfirmation"].message}
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </section>

                    <div className="area_expertise clearfix">
                      <h4>Area of expertise</h4>
                      {errors["area_of_expertise"] && (
                              <span style={{ color: "#bf1f24" }}>
                                {errors["area_of_expertise"].message}
                              </span>
                            )}
                      <div className="expertise_left">
                       {categoryOne.length > 0 && 
                       categoryOne.map((e)=> {
                         return <div className="chkbox-group">
                         <input type="checkbox" {...register("area_of_expertise")} />
                         <a href="#">{e.category_name}</a>
                       </div>
                       }) }
                        {/* <div className="chkbox-group">
                          <input type="checkbox" name="agree" />
                          <a href="#">Corporate Advisory</a>
                        </div>
                        <div className="chkbox-group">
                          <input type="checkbox" name="agree" />
                          <a href="#">Income tax Advisory </a>
                        </div>
                        <div className="chkbox-group">
                          <input type="checkbox" name="agree" />
                          <a href="#">Financial Funding and Debt Mgmt.</a>
                        </div> */}
                      </div>
                      <div className="expertise_right">
                       {categoryTwo.length > 0 &&
                       categoryTwo.map((e)=> {
                        return <div className="chkbox-group">
                        <input type="checkbox" value={e.category_id} {...register("area_of_expertise")} />
                        <a href="#">{e.category_name}</a>
                      </div>
                      }) }
                        {/* <div className="chkbox-group">
                          <input type="checkbox" name="agree" />
                          <a href="#">International Taxation</a>
                        </div>
                        <div className="chkbox-group">
                          <input type="checkbox" name="agree" />
                          <a href="#">FEMA and FERA Advisory</a>
                        </div>
                        <div className="chkbox-group">
                          <input type="checkbox" name="agree" />
                          <a href="#">Foreign Company Setup in India</a>
                        </div> */}
                       
                      </div>
                    </div>

                    <div className="chkbox-group">
                      <input
                        {...register("agree")}
                        type="checkbox"
                        name="agree"
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
                  <div className="sign-btn">
                    <button type="submit" name="sign_in" className="button col">
                      Create Account
                    </button>
                  </div>
                </form>

                <div className="login-footer clearfix">
                  <p className="pull-left part_log">Already have an account?</p>
                  <Link
                    to="/login"
                    className="btn btn-login pull-right part_login"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {placeHolder?.image && placeHolder?.description && (
            <div className="Register_benefits">
              {/* {placeHolder.header} */}
              {/* <h4>Member / Registered User Benefits...</h4>
              <h5>
                New User? <span>"Register to Become a Member"</span>
              </h5>
              <p>
                <strong>Registered User Benefits...</strong>
              </p> */}
              <img src={placeHolder?.image} />
              <div
                dangerouslySetInnerHTML={{
                  __html: placeHolder?.description,
                }}
              />
            </div>
          )}
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}

// export default PartnerRegister;
PartnerRegister.defaultProps = {
  categories: [],
};
export default connect((state, props) => {
  return {
    categories: state?.categories,
    // categoryTwo: state?.categoryTwo,
  };
})(PartnerRegister);
