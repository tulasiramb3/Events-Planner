import { Component } from '@angular/core';
import {Router} from '@angular/router'
import {FormsModule} from '@angular/forms';
import {EventService}  from './shared/index'
@Component({
  templateUrl:'./create-event.component.html',
  styles:[`
  em{
    float:right;
    color:red;
  }
  .error input { background-color:#E3C3C5;}

  `]
})
export class CreateEventComponent
{
    flag:boolean = true;
    name;
    date;
    time;
    price;
    address ;
    city;
    country;
    onlineUrl;
    imageUrl;

    constructor(private router:Router,private eventService:EventService){}

    goBacktoEvents()
    {
        this.router.navigate(['/events']);
    }

    saveEvent(formValues)
    {

      console.log(formValues);

      this.eventService.saveEvent(formValues).subscribe(()=>{
        this.flag=false;
        this.router.navigate(['./events']);
      });

    }
    cancel()
    {
       this.router.navigate(['/events'])
    }
}
