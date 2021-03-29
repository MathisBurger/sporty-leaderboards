import 'dart:convert';
import 'package:http/http.dart' as http;

class RestService {

  String _API;
  String _username;
  String _token;

  RestService(dynamic JSON) {
    this._API = JSON["api_origin"];
    this._username = JSON["username"];
    this._token = JSON["token"];
  }

  Future<String> getDefault() async {
    var resp = await http.get(Uri.https(this._API, "/api"),);
    return resp.body;
  }

  Future<bool> checkStatus() async  {
    Map<String, String> queryParams = {
      "username": this._username,
      "token": this._token,
      "device": "mobile"
    };
    var resp = await http.get(Uri.https(this._API, "/api/check_creds", queryParams));
    return json.decode(resp.body)["status"];
  }

}