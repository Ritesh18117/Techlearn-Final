import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn:boolean = false;

  constructor(private userService:UserService){}

  ngOnInit(){
    if(localStorage.getItem('authToken')){
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
    } else{
      this.isLoggedIn = false;
    }
  }

  logout(){
    this.userService.logout().subscribe(
      (response) =>{
        console.log(response);
        localStorage.clear();
        this.ngOnInit();
      }, (error) =>{
        console.error(error);
      }
    );
  }

  ngAfterContentChecked(){
    this.ngOnInit();
  }

}
