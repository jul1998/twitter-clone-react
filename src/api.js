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
  updateUser: "accounts/update_user/",
  profileList: "musker/profile_list/",
  profileDP: "musker/profile/",
  getMeeps: "musker/meeps/",
  createMeep: "musker/create_meep/",
  meepLikes: "musker/like_meep/",
  meepLikesCount: "musker/likes_count/",
};
