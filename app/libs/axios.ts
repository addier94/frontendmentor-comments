import axios from "axios";

export const rq = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://frontendmentor-comments-ahkd6wts1-addier94.vercel.app',
});