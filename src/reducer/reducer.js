import React from "react";
const initialState = {
  isLogged: false,
  userDetails: {},
  socialIcons: {},
  contactDetails: {},
  dashboard: "",
  activeMenu: "home",
};
function reducer(state = initialState, action) {
console.log("redux",action)
  switch (action.type) {
    case "LOGIN":
      state = { ...state };
      state["isLogged"] = true;
      state["userDetails"] = action.payload;
      return state;

    case "CONTACT":
      state = { ...state };
      state["contactDetails"] = action.payload.contactDetails;
      state["socialIcons"] = action.payload.socialIcons;
      state["categories"] = action.payload.categories;
      return state;

    case "LOGOUT":
      state = { ...state };
      state["isLogged"] = false;
      console.log('isLogged','isLogged');
      state["userDetails"] = {};
      return state;

    case "DASHBOARD":
      state = { ...state };
      state["dashboard"] = action.payload;
      return state;

    case "MENU":
      state = { ...state };
      state["activeMenu"] = action.payload;
      return state;

    default:
      return state;
  }
}

export default reducer;
