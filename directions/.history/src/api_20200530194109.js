import axios from 'axios';
export const baseURL = 'https://us-central1-mapdraw-6684b.cloudfunctions.net/';
export const loadMap = () => axios.get('/hello');