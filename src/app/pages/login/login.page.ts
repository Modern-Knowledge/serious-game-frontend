import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { GameData } from "../../providers/GameData";
import { AuthService } from "src/app/providers/auth.service";
import { Therapist } from "../../../../../serious-game-backend/src/lib/models/Therapist";
import { HttpResponse } from "../../../lib/utils/http/HttpResponse";
import { UserStoreService } from "src/app/providers/store/user-store.service";
import { Subscription } from "rxjs";

@Component({
  selector: "serious-game-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    public router: Router,
    private gameData: GameData,
    private authService: AuthService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onLogin(): void {
    this.subscription.add(
      this.authService
        .login(
          this.loginForm.controls.email.value,
          this.loginForm.controls.password.value
        )
        .subscribe(response => {
          const httpResponse = new HttpResponse().deserialize(response);
          // login successful if there's a jwt token in the response
          const token = httpResponse.data["token"];
          this.authService.setToken(token);
          this.router.navigateByUrl("/main-menu");
        })
    );
  }

  onSignUp(): void {
    this.router.navigateByUrl("/registration");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
