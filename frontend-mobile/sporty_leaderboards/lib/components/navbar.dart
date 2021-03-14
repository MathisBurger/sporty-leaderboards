import 'package:flutter/material.dart';
import 'package:cupertino_icons/cupertino_icons.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:line_icons/line_icons.dart';

class Navbar extends StatefulWidget {
  _Navbar createState() => _Navbar();
}

class _Navbar extends State<Navbar> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color.fromRGBO(43, 43, 43, 1.0),
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
    );
  }

}