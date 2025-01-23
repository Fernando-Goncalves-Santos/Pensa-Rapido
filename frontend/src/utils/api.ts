import axios from 'axios'
const apiUrl: string = import.meta.env.VITE_API; // inserir variável de ambiente aqui

export default axios.create({
    baseURL: apiUrl
})