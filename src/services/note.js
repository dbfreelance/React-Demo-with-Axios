import { clearData, getData, isData, setData } from "../data/api";
import axios from 'axios';

const api = "https://localhost:44384/api/notes/";
//export default api;

const tag = "notes";
export default () => ({
    getNote: (id) => new Promise( async (resolve, reject) => {
        const response = await axios.get(api+id);
        resolve(response.data)
        //resolve([{"Id": 1, "Note": "test shi"},{"Id": 2, "Note": "Niurka"}]/*api.get(`/api/notes/all`)*/)  
  }),
  getNotes: () => new Promise( async (resolve, reject) => {
    if (true) {
      const response = await axios.get(api+'all');
      resolve(response.data)
    } else {
      reject({message: "Not found!!"})
    }  
  }),
  addNote: (note) => new Promise( async (resolve, reject) => {
    const response = await axios.post(api+"post", note);
    if (note) {
      resolve()
    } else {
      reject({message: "Error"})
    }
  }),
  updateNote: (note) => new Promise( async (resolve, reject) => {
    if (note) {
    const response = await axios.put(api+note.id, note);
    resolve()
    } else {
      reject({message: "Error"})
    }
  }),
  deleteNote: (id) => new Promise(async (resolve, reject) => {
    if (true) {
      await axios.delete(api+id);
      resolve()
    } else {
      reject({message: "Error"})
    }
  }),
  clearNotes: () => new Promise((resolve) => {
    clearData(tag);
    resolve();
  })
})