import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/providers/auth.service";
import { UserDto } from "src/lib/models/Dto/UserDto";

@Component({
    selector: "serious-game-home",
    styleUrls: ["home.page.scss"],
    templateUrl: "home.page.html"
})
export class HomePage implements OnInit, OnDestroy {
    public user: UserDto;
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
