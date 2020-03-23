import Cookie from "cookie_js";

const token = "admin_token";
const usernameKey = "username";

export function getToken() {
  return Cookie.get(token);
}

export function setToken(toKen) {
  return Cookie.set(token, toKen);
}

export function removeToken() {
  return Cookie.remove(token);
}
export function removeUserName() {
  return Cookie.remove(usernameKey);
}

export function setUserName(value) {
  return Cookie.set(usernameKey, value);
}

export function getUserName() {
  return Cookie.get(usernameKey);
}