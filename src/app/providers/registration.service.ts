import { Injectable } from '@angular/core';
import { User } from 'src/lib/models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(user: User){
    this.http.post('register', user).subscribe(response => {
      console.log(response);
    });
  }
}
