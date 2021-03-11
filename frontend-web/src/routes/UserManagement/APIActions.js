import cookie from "react-cookies";
import {getXHRConnection} from "../../utils/XHR";
import ReactDOM from "react-dom";
import {Snackbar} from "../../components/Snackbar/Snackbar";

export function UserAction(username, path) {
    let json = JSON.stringify({
        username: cookie.load('username'),
        token: cookie.load('token'),
        device: 'web',
        user: username
    });
    let xhr = getXHRConnection('PATCH', path, json, 'application/json');
    xhr.addEventListener('load', () => {
        let data = JSON.parse(xhr.responseText);
        if (data.status) {
            window.location.reload();
        } else {
            ReactDOM.render(<Snackbar render={true} message={data.message} color={"#CB1212"}/>, document.getElementById('snackbar'));
            setTimeout(() => {
                ReactDOM.render(null, document.getElementById('snackbar'));
            }, 1000);
        }
    });
}
