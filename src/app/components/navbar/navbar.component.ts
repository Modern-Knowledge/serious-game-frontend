import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/providers/auth.service";

@Component({
    selector: "serious-game-navbar",
    styleUrls: ["./navbar.component.scss"],
    templateUrl: "./navbar.component.html"
})
export class NavbarComponent implements OnInit {
    public navigate: any;

    constructor(private authService: AuthService, private router: Router) {
        this.sideMenu();
    }

    public ngOnInit() {}

    public onLogout() {
        this.authService.logout();
        this.router.navigateByUrl("/login");
    }

    public sideMenu() {
        this.navigate = [
            {
                title: "Hauptmenü",
                url: "/main-menu",
                icon: "home",
                visible: this.authService.isLoggedIn()
            },
            {
                title: "Profil",
                url: "/profile",
                icon: "person",
                visible: this.authService.isLoggedIn()
            },
            {
                title: "Passwort ändern",
                url: "/change-password",
                icon: "lock",
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
            }
        ];
    }

}
