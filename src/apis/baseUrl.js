import axios from 'axios'

 const baseURL = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    headers: {
        "Content-type": "aplication/json",
    }
})
export default baseURL;
