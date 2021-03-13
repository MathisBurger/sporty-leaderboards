
// returns XMLHttp object
export function getXHRConnection(method, path, data, contentType) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, 'http://127.0.0.1:8080/api' + path);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(data);
    return xhr
}
