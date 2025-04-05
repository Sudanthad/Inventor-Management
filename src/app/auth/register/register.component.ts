import { Component } from '@angular/core';
import { Register } from './register';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  register: Register = {
    userName: '',
    userPassword: '',
    userFirstName: '',
    userLastName: '',
    userRoles: 'USER',
  };
  constructor(private loginService:LoginService){}
  registerForm(){
    this.loginService.registerUser(this.register).subscribe(
      (response)=>{
        
        console.log("Added Success");
      },
      (error)=>{
        console.log("Not Success");
        
      }
    )
    console.log(this.register);
    
  }


}
