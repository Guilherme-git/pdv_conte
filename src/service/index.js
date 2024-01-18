import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.25.32.1/Conte-tecnologia/app_empresa/ERP_CONTE/public/api'
    //baseURL: 'https://app.contetecnologia.com.br/public/api'
   });
   
 export default api;