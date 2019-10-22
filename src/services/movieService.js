import http from './httpService';
import config from '../config.json';

function movieUrl(id){
    return `${config.apiEndpoint}movies/${id}`;
}
export function getMovies(){
    return http.get(config.apiEndpoint + "movies");
}

export function getMovie(movieId){
    return http.get(movieUrl(movieId));
}

export function deleteMovie(movieId){
    return http.delete(movieUrl(movieId));
}

export function saveMovie(movie){
    if (movie._id){
        const body = {...movie};
        delete body._id;
        return http.put(movieUrl(movie._id), body);
    }
    return http.post(config.apiEndpoint + "movies", movie);
}