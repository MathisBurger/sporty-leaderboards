import {getXHRConnection} from "./XHR";
import cookie from 'react-cookies';

// returns credentials check response
export function checkAPICredentials() {
    let params = "?username=" + cookie.load('username') + "&token=" + cookie.load('token') + "&device=web";
    return getXHRConnection('GET', '/check_creds' + params, null, 'application/x-www-form-urlencoded');

}
