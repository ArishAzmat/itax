/**
 * @author ArishArish
 * @description This file contains all the API methods which are used in the application
 */
import axios from "axios";

var baseURL = "http://itaxadmin.idossapp.in/api/v1";

let defaultToken;
export default class RestApi {
  static defaultToken(token) {
    if (token && token != null) {
      axios.defaults.headers.common = {
        'Authorization': 'Bearer ' + token
    };
      // axios.defaults.headers.common["Authorization"] =
      //   token == null ? null : `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
    console.log("axio",axios.defaults.headers)
    return (defaultToken = (token) || null);
    
  }

  static login(data) {
    return axios.post(`${baseURL}/login`, data);
  }
  static logout(data) {
    return axios.post(`${baseURL}/logout`, data);
  }

  static register(data) {
    return axios.post(`${baseURL}/register`, data);
  }

  static homePage() {
    return axios.get(`${baseURL}/home-page`);
  }
  static socialLogin(data) {
    return axios.post(`${baseURL}/social/login`, data);
  }

  static pages(page) {
    return axios.get(`${baseURL}/${page}`);
  }
  static aboutUs(page) {
    return axios.get(`${baseURL}/about-us`);
  }

  static testimonials() {
    return axios.get(`${baseURL}/client-testimonials`);
  }
  static careers() {
    return axios.get(`${baseURL}/careers`);
  }
  static contact() {
    return axios.get(`${baseURL}/contact-details`);
  }
  static parterWithUs() {
    return axios.get(`${baseURL}/partner-with-us`);
  }
  static videos() {
    return axios.get(`${baseURL}/videos`);
  }
  static newsletters() {
    return axios.get(`${baseURL}/newsletters`);
  }
  static placeholder(param) {
    return axios.get(`${baseURL}/placeholder/${param}`);
  }
}