import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { GameData } from '../../providers/GameData';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public router: Router,
    private gameData: GameData
  ) { }

  ngOnInit() {
    console.log(this.gameData.load().subscribe((data: any) => {
      console.log(data);
    }));
  }

  onLogin(form: NgForm): void {
    console.log(form);
    this.router.navigateByUrl('/home');
  }

  onSignUp(): void {

  }

}
