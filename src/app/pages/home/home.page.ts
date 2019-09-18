import { Component, OnInit } from '@angular/core';
import { User } from 'src/lib/models/User';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private user: User;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authService.getRelatedUser().subscribe(user => {
      this.user = user;
    }); 
  }

}
