import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { GameData } from "../../providers/GameData";
import { AuthService } from "src/app/providers/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    public router: Router,
    private gameData: GameData,
    private authService: AuthService
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
    this.authService
      .login(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .subscribe(response => {
        // login successful if there's a jwt token in the response
        const token = response["token"];
        this.authService.setToken(token);
        this.router.navigateByUrl("/home");
      });
  }

  onSignUp(): void {
    this.router.navigateByUrl("/registration");
  }
}
