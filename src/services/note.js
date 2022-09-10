import { clearData, getData, isData, setData } from "../data/api";
import axios                                   from 'axios';

const api = "https://localhost:44384/api/notes";
const filter = '/filter?PageNumber=1&PageSize=5&tags=';
const firstPage = '?PageNumber=1&PageSize=10&tags=sma';
const firstPageByNote = '/order?PageNumber=1&PageSize=30&tags=sma';
//const nextPage = "?pageNumber=3&pageSize=10";
//const previousPage = "?pageNumber=1&pageSize=10";
let current, next, prev;


const tag = "notes";
export default () => ({
  getNote: (id) => axios.get(api+'/'+id).then(res => res.data),
  getNotes: async (op) =>  {
    //let start = (await axios.get(api + firstPage)).headers['currentpageuri'];
    if(op == 1 && next != "undefined"){
      next = (await axios.get(current)).headers['nextpage'];
      prev = current;
      current = next;
      console.log(current);
      return axios.get(next).then(res => res.data);
    } 
    else if(op == 2 && prev != "undefined"){
      current = prev;
      prev = (await axios.get(current)).headers['previouspage'];
      console.log(current);
      return axios.get(current).then(res => res.data);
    } else {
    current = (await axios.get(api + firstPage)).headers['currentpageuri'];
    next = (await axios.get(current)).headers['nextpage'];
    console.log(prev);
    return axios.get(api + firstPage).then(res => res.data)
    }
  },
  filter:(code) => axios.get(api+filter+code).then(res => res.data),
  order: async (op) =>  {
    if (op == 1){
      return axios.get(api + firstPage).then(res => res.data)
    } else {
      return axios.get(api+firstPageByNote).then(res => res.data) 
    }
    
  },
  addNote: (note) => axios.post(api + "/post", note),
  updateNote: (note) => axios.put(api +'/'+note.id, note),
  deleteNote: (id) => axios.delete(api +'/'+ id),
  clearNotes: () => new Promise((resolve) => {
    clearData(tag);
    resolve();
  })
})