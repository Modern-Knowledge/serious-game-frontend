import { Component, OnInit } from '@angular/core';
import { User } from "src/lib/models/User";
import { AuthService } from "src/app/providers/auth.service";
@Component({
  selector: 'serious-game-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User = new User();
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getRelatedUser().subscribe(user => {
      this.user = user;
    });
  }

}
