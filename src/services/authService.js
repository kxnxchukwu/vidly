import http from './httpService';
import config from '../config.json';
import jwtDecode from 'jwt-decode';

const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password){
    const {data: jwt} = await http.post(config.apiEndpoint + 'auth', {email, password} );
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey, jwt);
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
      } catch (ex) {    
        return null;
      }
}

export function getJwt(){
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
}