import axios from "axios";

const api = "https://localhost:44384/api/notes/"

export const setData = (name, value, isString = false) => {
  if (name) {
    localStorage.setItem(name, isString ? value : (typeof value !== "undefined" ? JSON.stringify(value) : ""));
  }
};

export const  getData = async () => {

};

export const isData = (name) => {
  if (name) {
    return !!localStorage.getItem(name);
  }
  return false;
};

export const clearData = (name) => {
  if (name) {
    localStorage.removeItem(name);
  } else {
    localStorage.clear();
  }
};
