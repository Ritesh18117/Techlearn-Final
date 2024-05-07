import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // Correct import path

// Import RouterModule
import { RouterModule } from '@angular/router';
import { UserService } from './Services/user.service';

@NgModule({
  declarations: [
    // AppComponent, // Declare AppComponent and other components like FooterComponent
    // AboutComponent, // And other components used in routing or templates
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Include your routing module
    RouterModule, // Correct import
  ],
  providers: [UserService]
  // bootstrap: [AppComponent], // Define the bootstrap component
})
export class AppModule {}
