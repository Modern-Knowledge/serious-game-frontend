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

@Component({
  selector: "app-registration",
  templateUrl: "./registration.page.html",
  styleUrls: ["./registration.page.scss"]
})
export class RegistrationPage implements OnInit {
  public registrationForm: FormGroup;

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
        password_confirmation: new FormControl("", Validators.required)
      },
      this.matchPasswords
    );
  }

  onSubmit() {
    const formControls = this.registrationForm.controls;
    const therapist = new Therapist();
    therapist.email = formControls.email.value;
    therapist.gender = formControls.gender.value;
    therapist.password = formControls.password.value;
    therapist.forename = formControls.forename.value;
    therapist.lastname = formControls.lastname.value;
    this.authService.register(therapist).subscribe(response => {
      const token = response["token"];
      this.authService.setToken(token);
      this.router.navigateByUrl("/home");
    });
  }

  matchPasswords(form): Boolean {
    return form.get("password") === form.get("password_confirmation");
  }
}
