import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const endpoints = {
  login: "accounts/login/",
  logout: "accounts/logout/",
  register: "accounts/register/",
  profileList: "musker/profile_list/",
  profileDP: "musker/profile/",
  getMeeps: "musker/meeps/",
};
