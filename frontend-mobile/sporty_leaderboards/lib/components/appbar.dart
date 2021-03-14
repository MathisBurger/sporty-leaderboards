import 'package:flutter/material.dart';

Widget getAppbar() {
  return AppBar(
    title: Text(
      "Sporty Leaderboards",
      style: TextStyle(
        fontSize: 25.0,
        fontWeight: FontWeight.bold
      ),
    ),
    centerTitle: true,
    backgroundColor: Color.fromRGBO(6, 52, 128, 1.0),
  );
}