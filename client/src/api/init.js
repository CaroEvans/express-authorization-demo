import axios from 'axios'

// Cretae an axiost instance
const api = axios.create({
    baseURL: 'http://localhost:3000'
})

// Add the bearer token to the axios instance
// Axios will then add this header with every subsequent request
 // bearer tells you what type of token it is
const setJwt = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { api, setJwt } 