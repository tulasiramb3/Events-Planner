import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from './auth.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN,Toastr} from '../common/toastr.service'
import { inject } from '@angular/core/testing';

@Component({
  styles:[`
  em{
    float:right;
    color:red;
  }
  .error input { background-color:#E3C3C5;}
          
  `],
  templateUrl:`./profile.component.html`
})
export class ProfileComponent{
  profileForm?:FormGroup;
  firstName?:FormControl
  lastName?:FormControl
  constructor(private authService:AuthService,private router:Router, 
    @Inject(TOASTR_TOKEN) private toastr:Toastr){
    
  }
 

    ngOnInit()
    {
    
      this.firstName = new FormControl(this.authService.currentUser.firstName,[Validators.required,Validators.pattern('[a-zA-Z].*')])
      this.lastName = new FormControl(this.authService.currentUser.lastName,[Validators.required,Validators.pattern('[a-zA-Z].*')])
      this.profileForm = new FormGroup({
          firstName:this.firstName,
          lastName:this.lastName
      })

    }
    SaveProfile(formValues)
    {
      if(this.profileForm.valid)
      {
      console.log(formValues);
      this.authService.updateCurrentUser(formValues.firstName,formValues.lastName);
      // this.router.navigate(['/events'])
      this.toastr.success("profile saved");
    }
    }
    cancel()
    {
      this.router.navigate(['/events']);
    }
    validateFirstName()
    {
     return this.firstName.untouched || this.firstName.valid
    }
    validateLastName()
    {
      return this.lastName.untouched || this.lastName.valid
    }
    logout()
    {
      this.authService.logout().subscribe(data=>{
        this.router.navigate(['/user/login']);
      })
    }
}