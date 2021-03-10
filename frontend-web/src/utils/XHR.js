

export function getXHRConnection(method, path, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, 'http://127.0.0.1:8080' + path);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(data);
    return xhr
}
