import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'serious-game-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  navigate: any;

  constructor() {
    this.sideMenu();
  }

  ngOnInit(){}

  sideMenu() {
    this.navigate = [
      {
        title: "Home",
        url: "/home",
        icon: "home"
      },
      {
        title: "Profile",
        url: "/profile",
        icon: "person"
      },
      
    ];
  }

}
