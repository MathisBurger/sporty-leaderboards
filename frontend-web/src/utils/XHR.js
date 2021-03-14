
// returns XMLHttp object
export function getXHRConnection(method, path, data, contentType) {
    var xhr = new XMLHttpRequest();
    let full = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/api';
    xhr.open(method, full + path);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(data);
    return xhr
}
