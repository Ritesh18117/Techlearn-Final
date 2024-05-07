import { Injectable } from '@angular/core';
import { UserService } from './Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService:UserService) { }

  login(){

  }

  logout(){
    sessionStorage.clear();
  }

  signUp(){

  }

  getToken(){
    if(this.userService.isLoggedIn())
      return true;
    else
      return false; 
  }
}
