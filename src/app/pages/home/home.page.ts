import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/providers/auth.service";
import { User } from "src/lib/models/User";

@Component({
  selector: "serious-game-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  private user: User;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
    this.subscription.add(
      this.authService.getRelatedUser().subscribe((user) => {
        this.user = user;
      })
    );
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
