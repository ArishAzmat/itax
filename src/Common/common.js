/**
 * @author ArishArish
 * @description This file contains all the commonly methods
 */
export default class Common {
  static saveState(data, dashboard) {
    let userDetails = JSON.stringify(data);
    sessionStorage.setItem("userDetails", userDetails);
    sessionStorage.setItem("dashboard", dashboard);
  }
  static logout() {
    sessionStorage.clear();
  }
  static groupBy = (keys) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      keys.reduce((builder, key, index) => {
        if (index !== keys.length - 1) {
          builder[obj[key]] = builder[obj[key]] || {};
        } else {
          builder[obj[key]] = (builder[obj[key]] || []).concat(obj);
        }
        return builder[obj[key]];
      }, objectsByKeyValue);
      return objectsByKeyValue;
    }, {});

  static filterArray(array, search, keys) {
    var lowSearch = search.toLowerCase();
    return array.filter((data) =>
      keys.some((key) => String(data[key]).toLowerCase().includes(lowSearch))
    );
  }
}



// in login component
// const handleCloseRegisterModal = () => {
//   console.log("close");
//   setShowRegisterModal({ status: false });
//   let { data } = showRegisterModal;
//   if (data.is_customer == "yes") {
//     data.is_customer = "no";
//     data.is_service_provider = "yes";
//     history.push(`/customer/dashboard`);
//   } else if (data.is_service_provider == "yes") {
//     data.is_customer = "yes";
//     data.is_service_provider = "no";
//   }
//   RestApi.login(data).then((response) => {
//     if (response.data.access_token && response.data.status == true) {
//       reset({ email: "", password: "" });
//       // toast.success(response.data.message, {
//       //   position: toast.POSITION.CENTER,
//       //   autoClose: 2000,
//       // });
//       RestApi.defaultToken(response.data.access_token);
//       let res = response.data;
//       let data = {
//         name: res.data.first_name,
//         email: res.data.email,
//         phone: res.data.phone,
//         last_name: res.data.last_name,
//         middle_name: res.data.middle_name,
//         photo: res.data.photo,
//         isCustomer: res.data.is_customer,
//         isServiceProvider: res.data.is_service_provider,
//         _token: res.access_token,
//       };
//       props.dispatch({
//         type: "LOGIN",
//         payload: data,
//       });

//       setTimeout(() => {
//         // if (
//         //   response.data.data.is_customer == "yes" &&
//         //   response.data.data.is_service_provider == "yes"
//         // ) {
//         //   props.activeForm == "customer"
//         //     ? history.push(`/customer/dashboard`)
//         //     : history.push(`/partner/dashboard`);
//         // } else if (response.data.data.is_customer == "yes") {
//         //   history.push(`/customer/dashboard`);
//         // } else if (response.data.data.is_service_provider == "yes") {
//         //   history.push(`/partner/dashboard`);
//         // }
//       }, 2000);
//     }
//   });
// };