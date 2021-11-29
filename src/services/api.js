/**
 * @author ArishArish
 * @description This file contains all the API methods which are used in the application
 */
import axios from "axios";
// window.axios = axios;
var baseURL = "https://itaxadmin.idossapp.in/api/v1";

let defaultToken;
export default class RestApi {
  static defaultToken(token) {
    if (token && token != null) {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + token,
      };
      // axios.defaults.headers.common["Authorization"] =
      //   token == null ? null : `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
    console.log("axio", axios.defaults.headers);
    return (defaultToken = token || null);
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
  static newsletters(pageNo) {
    //API returns pagination based on params of page such as /1 , s/2
    return axios.get(`${baseURL}/newsletters?page=${pageNo}`);
  }
  static placeholder(param) {
    return axios.get(`${baseURL}/placeholder/${param}`);
  }
  static subscribe(params) {
    return axios.post(`${baseURL}/subscribe-newsletters`, params);
  }
  static blogAccess(params) {
    params = {...params,is_blog:'1'}
    return axios.post(`${baseURL}/subscribe-newsletters`, params);
  }
  static downloadForm() {
    return axios.get(`${baseURL}/download-forms`);
  }
  static blogs(pageNo, search, month, year, cId) {
    return axios.get(
      `${baseURL}/blogs?page=${pageNo}&search=${search}&month=${month}&year=${year}&category_id=${cId}`
    );
  }
  static blogDetails(id) {
    return axios.get(`${baseURL}/blogs/${id}`);
  }
  static homeEvents() {
    return axios.get(`${baseURL}/events?type=home`);
  }
  static events() {
    return axios.get(`${baseURL}/events`);
  }
  static eventDetails(id) {
    return axios.get(`${baseURL}/events/${id}`);
  }
  static calendar(month, year) {
    return axios.get(`${baseURL}/calendar?month=${month}&year=${year}`);
  }
  static faq() {
    return axios.get(`${baseURL}/faq?categoryId=1`);
  }
  static categories() {
    return axios.get(`${baseURL}/service-categories`);
  }
  static services(id) {
    return axios.get(`${baseURL}/service-list?category_id=${id}`);
  }
  static caseLaw(pageNo, filter, search,limit) {
    return axios.get(
      `${baseURL}/case-law?page=${pageNo}&filter=${filter}&search=${search}&pageList=${limit}`
    );
  }
  static serviceDocument(cId, sId) {
    return axios.get(
      `${baseURL}/service-details?category_id=${cId}&service_id=${sId}`
    );
  }
  static contactUs(data) {
    return axios.post(`${baseURL}/contact-form/submit`, data);
  }
  static careerForm(data){
   
    return axios.post(`${baseURL}/career-opportunities/apply`, data,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}
