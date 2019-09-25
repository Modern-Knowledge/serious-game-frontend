import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'serious-game-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  navigate: any;

  constructor(private authService: AuthService, private router: Router) {
    this.sideMenu();
  }

  ngOnInit(){}

  sideMenu() {
    this.navigate = [
      {
        title: "Home",
        url: "/home",
        icon: "home",
        visible: true
      },
      {
        title: "Profile",
        url: "/profile",
        icon: "person",
        visible: this.authService.isLoggedIn()
      },
      {
        title: "Logout",
        onClick: "onLogout",
        visible: this.authService.isLoggedIn()
      },
      {
        title: "Login",
        url: "/login",
        visible: !this.authService.isLoggedIn()
      },
    ];
  }

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
