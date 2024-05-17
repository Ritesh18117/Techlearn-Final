import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // Correct import path

// Import RouterModule
import { RouterModule } from '@angular/router';
import { UserService } from './Services/user.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    // AppComponent, // Declare AppComponent and other components like FooterComponent
    // AboutComponent, // And other components used in routing or templates
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Include your routing module
    RouterModule, // Correct import
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [UserService, {provide: LocationStrategy, useClass: HashLocationStrategy}]
  // bootstrap: [AppComponent], // Define the bootstrap component
})
export class AppModule {}
