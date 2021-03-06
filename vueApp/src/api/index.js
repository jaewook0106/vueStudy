import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthrorized = err =>{
  // const isAuth = localStorage.getItem('token')
  // !isAuth ? router.push('/login') : router.push('')
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
  // router.push('/login')
  throw err
}

const request = (method, url, data) =>{
  return axios({
    method,
    url: DOMAIN + url,
    data
  }).then(result => result.data)
    .catch(result => {
      const{status} = result.response
      console.log('status',status);

      if(status === UNAUTHORIZED) return onUnauthrorized(result)
      throw result
    })
}

export const setAuthInHeader = token =>{
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}



export const board = {
  fetch(){
    return request('get','/boards')
  },
  create(title){
    return request('post','/boards',{title})
  }
}

export const auth = {
  login(email, password) {
    return request('post','/login',{email,password})
  }
}