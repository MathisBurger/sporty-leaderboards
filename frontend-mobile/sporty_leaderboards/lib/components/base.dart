import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:line_icons/line_icons.dart';
import 'package:sporty_leaderboards/routes/dashboard.dart';
import 'package:sporty_leaderboards/routes/workout.dart';

import 'appbar.dart';

class BaseApp extends StatefulWidget {
  _BaseApp createState() => _BaseApp();
}

class _BaseApp extends State<BaseApp> {

  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    Widget content;

    switch (_selectedIndex) {
      case 0:
        content = new DashboardRoute();
        break;
      case 1:
        content = new WorkoutRoute();
        break;
    }
    return Scaffold(
      appBar: getAppbar(),
      body: Center(
        child: Container(
          color: Color.fromRGBO(62, 62, 62, 1.0),
          child: content,
        ),
      ),
      bottomNavigationBar: Container(
        color: Color.fromRGBO(62, 62, 62, 1.0),
        child: Container(
          margin: EdgeInsets.all(10),
          decoration: BoxDecoration(color: Colors.white, boxShadow: [
            BoxShadow(blurRadius: 20, color: Colors.black.withOpacity(.1))
          ],
              borderRadius: BorderRadius.all(Radius.circular(30.0)),
              shape: BoxShape.rectangle
          ),
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 8),
              child: GNav(
                  rippleColor: Colors.grey[300],
                  hoverColor: Colors.grey[100],
                  gap: 8,
                  activeColor: Color.fromRGBO(
                      0, 55, 255, 1),
                  iconSize: 24,
                  padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                  duration: Duration(milliseconds: 400),
                  tabBackgroundColor: Color.fromRGBO(
                      43, 87, 250, 0.5019607843137255),
                  tabs: [
                    GButton(
                      icon: LineIcons.home,
                      text: 'Dashboard',
                    ),
                    GButton(
                      icon: LineIcons.running,
                      text: 'Workout',
                    ),
                    GButton(
                      icon: Icons.logout,
                      text: 'Logout',
                    ),
                  ],
                  selectedIndex: _selectedIndex,
                  onTabChange: (index) {
                    setState(() {
                      _selectedIndex = index;
                    });
                  }),
            ),
          ),
        ),
      ),
    );
  }

}