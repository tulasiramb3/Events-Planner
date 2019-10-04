import {Component} from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';
import { Form } from '@angular/forms';
@Component({
    templateUrl: './login.component.html',
    styles:[
        `
        em{
            float:right;
            color:red;
            padding-left:10px;
        }
        `
    ]

})
export class LoginComponent{
    userName
    password
    mouseOverLogin
    invalidUser : boolean = false;
    constructor(private authService:AuthService,private router:Router){

    } 
    login(formvalues){
      this.authService.loginUser(formvalues.userName,formvalues.password).subscribe(data=>{
         if(!data)
         {
             this.invalidUser = true;            
         }
         else 
         {
            this.router.navigate(['/events']);
         }
      })    
        
    }
    cancel()
    {
        this.router.navigate(['/events'])
    }
   
}

