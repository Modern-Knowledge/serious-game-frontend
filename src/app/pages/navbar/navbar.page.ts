import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.page.html",
  styleUrls: ["./navbar.page.scss"]
})
export class NavbarPage {
  navigate: any;

  constructor() {
    this.sideMenu();
  }

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
      }
    ];
  }
}
