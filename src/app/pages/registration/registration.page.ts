import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/providers/auth.service";
import { User } from "src/lib/models/User";
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { Therapist } from "src/lib/models/Therapist";
import { Router } from "@angular/router";
import { HttpResponse } from "../../../lib/utils/http/HttpResponse";
import { Subscription } from "rxjs";

@Component({
  selector: "serious-game-registration",
  templateUrl: "./registration.page.html",
  styleUrls: ["./registration.page.scss"]
})
export class RegistrationPage implements OnInit {
  public registrationForm: FormGroup;
  private subscription: Subscription = new Subscription();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.registrationForm = new FormGroup(
      {
        email: new FormControl("", [Validators.email, Validators.required]),
        gender: new FormControl("", [Validators.required]),
        forename: new FormControl("", Validators.required),
        lastname: new FormControl("", Validators.required),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6)
        ]),
        password_confirmation: new FormControl("", Validators.required),
        therapist: new FormControl(false)
      },
      this.matchPasswords
    );
  }

  onSubmit() {
    const user = new User().deserialize(this.registrationForm.value);
    this.subscription.add(
      this.authService
        .register(user, this.registrationForm.controls.therapist.value)
        .subscribe(response => {
          const httpResponse = new HttpResponse().deserialize(response);

          const token = httpResponse.data["token"];
          this.authService.setToken(token);
          this.router.navigateByUrl("/main-menu");
        })
    );
  }

  matchPasswords(form): Boolean {
    return form.get("password") === form.get("password_confirmation");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
