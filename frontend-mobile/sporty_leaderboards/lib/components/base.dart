import 'package:flutter/material.dart';
import 'package:sporty_leaderboards/components/navbar.dart';

import 'appbar.dart';

Widget getPageBase(Widget content) {
  return Scaffold(
    appBar: getAppbar(),
    body: Center(
      child: Container(
        color: Color.fromRGBO(43, 43, 43, 1.0),
        child: content,
      ),
    ),
    bottomNavigationBar: Navbar(),
  );
}