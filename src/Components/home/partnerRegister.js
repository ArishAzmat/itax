import React, { useState, useEffect } from "react";
import RestApi from "../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import userImage from "../../images/user.png";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email ")
    .required("Email is required"),
    register_as:Yup.string().required('').default('Individual'),
  agree: Yup.boolean().oneOf([true]),

  //   last_name: Yup.string().required("Last name is required"),
  agree: Yup.boolean().oneOf([true]),
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
}).when((values, schema) => {
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

function PartnerRegister(props) {
  const history = useHistory();
  const [registerType, setRegisterType] = useState("Individual");
  const [responseError, setResponseError] = useState({});
  const [areaOfExpertise, setAreaOfExpertise] = useState([]);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandle = (data) => {
    setResponseError([])
    setMessage("")
    if (areaOfExpertise.length < 1) {
      setError("area_of_expertise", {
        type: "manual",
        message: "Atleast one Area of Expertise is required",
      });
      return false;
    }
    let form = new FormData();
    for (var i in data) {
      form.append(i, data[i]);
    }

    form.append("area_of_expertise", areaOfExpertise);
    if (registerType != "Individual") {
      form.append("first_name", getValues("company_name"));
    }
    RestApi.register(form).then((res) => {
      // console.log("resss", res);
      if (res.data.status == true) {
        setMessage(res.data.message);
        // toast.success(res.data.message, {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 10000,
        // });
        reset();
        setRegisterType('Individual')
        setAreaOfExpertise([])
        //if get token after registration
        // props.dispatch({
        //   type: "LOGIN",
        //   payload: res.data.data,
        // });
      setTimeout(()=> {
        history.push(`/login`);
      },5000)
      }
      if (res.data.error) {
        let { error } = res.data;
        let array = Object.entries(error).map((e) => {
          return { [e[0]]: e[1][0] };
        });
        setResponseError(array);
        // error.email &&
        //   toast.error(error.email[0], {
        //     position: toast.POSITION.TOP_CENTER,
        //     autoClose: 10000,
        //   });
        // error.password &&
        //   toast.error(error.password[0], {
        //     position: toast.POSITION.TOP_CENTER,
        //     autoClose: 10000,
        //   });
        // res.data.message &&
        //   toast.error(res.data.message, {
        //     position: toast.POSITION.TOP_CENTER,
        //     autoClose: 10000,
        //   });

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
  const handleCheckbox = (e) => {
    let checkboxes = areaOfExpertise;
   
    if (e.target.checked) {
      checkboxes.push(e.target.value);
      // console.log(checkboxes);
      setAreaOfExpertise(checkboxes);
    } else {
      
      let filter = checkboxes.filter((i) => i != e.target.value);
      // console.log(filter);
      setAreaOfExpertise(filter);
    }
    
  };
  const styles = {
    error: {
      borderColor: "#bf1f24",
    },
  };
  return (
    <div className="col-md-4 partner_form">
      <h3>Register for working with us</h3>
      <form
        onSubmit={handleSubmit(onSubmitHandle)}
        id="sky-form"
        method="POST"
        className="sky-form"
        action="https://itaxdoctor.idossapp.com/index.php/Itax/user_login"
        novalidate="novalidate"
      >
        <fieldset>
          <section>
            <div className="row">
              <div className="col col-12">
                <label
                  className="input partner-reg-input"
                  style={{ marginRight: "20px!important" }}
                >
                  <select
                    onChange={(e) => handleChange(e)}
                    id="register"
                    // {...register("register_as")}
                    class="form-control selectpicker customer_down_arrow"
                    data-style="btn-white"
                    style={{ width: "95.6%", height: "23px" }}
                  >
                    <option
                      selected={registerType == "Individual" && "selected"}
                      value="Individual"
                    >
                      Individual
                    </option>
                    <option
                      selected={registerType == "Company" && "selected"}
                      value="Company"
                    >
                      Company
                    </option>
                    <option
                      selected={registerType == "Partner" && "selected"}
                      value="Partner"
                    >
                      Partner
                    </option>
                  </select>
                </label>
              </div>
            </div>
          </section>
          <section>
            <div className="row">
              <div className="col col-12">
                <label className="input partner-reg-input">
                  <i
                    className="icon-append fa fa-envelope-o"
                    // style={styles.top}
                  ></i>
                  <input
                    type="hidden"
                    {...register("register_as")}
                    value={registerType}
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
                  <input
                    type="email"
                    style={errors["email"] && styles.error}
                    {...register("email")}
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
          {/* handleChange */}
          {registerType == "Individual" ? (
            <>
              {" "}
              <section>
                <div className="row">
                  <div className="col col-12">
                    <label className="input partner-reg-input">
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
                  <div className="col col-12">
                    <label className="input partner-reg-input">
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
                  <div className="col col-12">
                    <label className="input partner-reg-input">
                      <i className="icon-append fa fa-user-o"></i>
                      <input
                        type="text"
                        {...register("last_name")}
                        placeholder="Last Name"
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
          ) : (
            <>
              <section>
                <div className="row">
                  <div className="col col-12">
                    <label className="input partner-reg-input">
                      <i className="icon-append fa fa-user-o"></i>
                      <input
                        type="text"
                        {...register("company_name")}
                        placeholder="Company Name"
                        autocomplete="off"
                      />
                      {/* To be removed */}
                      <input
                        type="hidden"
                        {...register("first_name")}
                        value={getValues("company_name")}
                        placeholder="Company Name"
                        autocomplete="off"
                      />
                      {/* To be removed */}
                    </label>
                  </div>
                </div>
              </section>
              <section>
                <div className="row">
                  <div className="col col-12">
                    <label className="input partner-reg-input">
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
            <div className="row">
              <div className="col col-12">
                <label className="input partner-reg-input">
                  <i
                    className="icon-append fa fa-mobile"
                    // style={styles.top}
                  ></i>
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
            <div className="row">
              <div className="col col-12">
                <label className="input partner-reg-input">
                  <i
                    className="icon-append fa fa-lock"
                    // style={styles.top}
                  ></i>
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
            <div className="row">
              <div className="col col-12">
                <label className="input partner-reg-input">
                  <i
                    className="icon-append fa fa-lock"
                    // style={styles.top}
                  ></i>
                  <input
                    {...register("passwordConfirmation")}
                    type="password"
                    style={errors["passwordConfirmation"] && styles.error}
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
        </fieldset>

        <div className="area_expertise expt">
          <h4>Area of expertise</h4>
          {props.categories.length > 0 &&
            props.categories.map((e, i) => {
              return (
                <div className="chkbox-group">
                  <input
                    type="checkbox"
                    name="area_of_expertise[]"
                    onChange={(e) => handleCheckbox(e)}
                    style={{ position: "relative", top: "-3px" }}
                    value={e.id} 
                  />
                  <a href="#">{e.category_name}</a>
                </div>
              );
            })}
             {errors["area_of_expertise"] && (
                        <span style={{ color: "#bf1f24" }}>
                          {errors["area_of_expertise"].message}
                        </span>
                      )}
        </div>
        <div className="chkbox-group chkbox-partnerReg">
          <input   {...register("agree")} style={{marginBottom:'1px'}} type="checkbox" name="agree" />
          <span  style={errors["agree"] && { color: "#bf1f24" }} >I have read and agree to all the </span>
          <a  style={errors["agree"] && { color: "#bf1f24" }} href="#">Term & Condition</a>
        </div>
        <div className="sign-btn">
          <button
            type="submit"
            name="sign_in"
            className="partner-btn button col"
          >
            Submit
          </button>
        </div>
        {message.length > 0 && 
                  <>
                    <br/>
                     <div className="subscirbeMessage">
                        <div className="alert alert-success">
                        {message}</div></div></>
                        }
        {responseError.length > 0 &&
                      responseError.map((er) => {
                        return (
                          <><br/>
                          <div className="careerErrorMessage">
                            {" "}
                            <span className="alert alert-danger">
                              {Object.values(er)}
                            </span>
                          </div>
                          </>
                        );
                      })}
      </form>
    </div>
  );
}

PartnerRegister.defaultProps = {
  categories: [],
};
export default connect((state, props) => {
  return {
    categories: state?.categories,
    // categoryTwo: state?.categoryTwo,
  };
})(PartnerRegister);
