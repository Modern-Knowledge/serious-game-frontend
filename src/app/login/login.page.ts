import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(form: NgForm): void {
    console.log(form);
    this.router.navigateByUrl('/home');
  }

  onSignUp(): void {

  }

}
