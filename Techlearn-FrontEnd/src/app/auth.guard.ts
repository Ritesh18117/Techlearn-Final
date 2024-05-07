import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './Services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const url = state.url;

  // For Redirecting Page to Dashboard if User if Loggedin
  if(url === '/login'){
    if(!localStorage.getItem('authToken')){
      return true;
    }else{
      _router.navigate(['/dashboard']);
      return false;
    }
  }

    // For Redirecting Page to Dashboard if User if Loggedin
  if(url === '/signup'){
    if(!localStorage.getItem('authToken')){
      return true;
    }else{
      _router.navigate(['/dashboard']);
      return false;
    }
  }

    // For Redirecting Page to Dashboard if User if Loggedin
  if(url === '/changepassword'){
    if(!localStorage.getItem('authToken')){
      return true;
    }else{
      _router.navigate(['/dashboard']);
      return false;
    }
  }

  // For Redirecting Page to home if User if not loggedIn and accessing Dashboard
  if(url === '/dashboard'){
    if(!localStorage.getItem('authToken')){
      _router.navigate(['/']);
      return false;
    }else{
      return true;
    }
  }
  // For Login User
  if(localStorage.getItem('authToken')){
    return true;
  }else{
    _router.navigate(['/login']);
    return false;
  }  
  
};
