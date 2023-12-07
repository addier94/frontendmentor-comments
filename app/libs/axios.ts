import axios from "axios";

export const rq = axios.create({
  baseURL: 'http://localhost:3000',
});