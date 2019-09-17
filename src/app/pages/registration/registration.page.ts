import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/providers/registration.service';
import { User } from 'src/lib/models/User';
import { FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Therapist } from 'src/lib/models/Therapist';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public registrationForm: FormGroup;

  constructor(private registrationService: RegistrationService) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      forename: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('', Validators.required),
    }, this.matchPasswords);
  }

  onSubmit(){
    const formControls = this.registrationForm.controls;
    const therapist = new Therapist(formControls.email.value, formControls.password.value, formControls.forename.value, formControls.lastname.value);
    this.registrationService.register(therapist);
  }

  matchPasswords(form): Boolean {
    return form.get('password') === form.get('password_confirmation');
  }

}
