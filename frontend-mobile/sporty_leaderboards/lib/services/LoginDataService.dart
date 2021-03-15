import 'dart:convert';

import 'package:path_provider/path_provider.dart';
import 'dart:io';

class LoginDataService {

  Future<bool> getLoginStatus() async {
    File data = await this._getFile("login-credentials.json");
    String raw = await data.readAsString(encoding: utf8);
    if (raw == "") {
      return false;
    }
    var content = json.decode(raw);

  }

  Future<String> get _localPath async {
    try {
      var directory = await getApplicationDocumentsDirectory();
      return directory.path;
    } catch (e){
      print(e);
    }
  }

  Future<File> _getFile(String name) async {
    try {
      final path = await _localPath;
      if (!File('$path/$name').existsSync()) {
        File('$path/$name').create(recursive: true);
      }
      return File('$path/$name');
    } catch (e){
      print(e);
    }
  }
}