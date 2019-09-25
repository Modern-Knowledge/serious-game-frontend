import { Component, OnInit } from "@angular/core";
import { User } from "src/lib/models/User";
import { AuthService } from "src/app/providers/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "serious-game-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  private user: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getRelatedUser().subscribe(user => {
      this.user = user;
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
