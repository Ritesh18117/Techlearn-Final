import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class ProfileComponent {
  editProfile: boolean = false;
  token: any;
  profile: any;

  constructor(private userService:UserService,private toastr: ToastrService){}

  ngOnInit(){
    this.userService.getProfile().subscribe(
      (response) =>{
        // console.log(response);
        this.profile = response;
      }, (error) =>{
        console.error(error);
        
      }
    )
  }

  editProfileMethod() {
    this.editProfile = !this.editProfile;
  }

  onSubmit() {
    this.userService.updateProfile(this.profile).subscribe(
      (response) =>{
        // console.log(response);
        this.toastr.success("Updated Successfully!!", "Success")
      },(error) =>{
        console.error(error);
      }
    )
    this.editProfile = !this.editProfile;
  }
}
