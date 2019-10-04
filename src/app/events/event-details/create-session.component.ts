import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISession,restrictedWordsValidator } from '../shared';


@Component({
    selector:'create-session',
    templateUrl:'./create-session.component.html',
    styles:[`
    em{
        float:right;
        color:red;
      }
      .error input { background-color:#E3C3C5;}            
      .error textarea { background-color:#E3C3C5;}            
     
    `]

})
export class CreateSessionComponent implements OnInit
{
    @Output() newSession =new EventEmitter();
    @Output() cancelAddSession = new EventEmitter();
    newSessionForm  : FormGroup
    name : FormControl
    presenter : FormControl
    duration : FormControl
    level : FormControl
    abstract : FormControl
    constructor(private router:Router){

    }
    ngOnInit()
    {
        this.name=new FormControl('',Validators.required)
        this.presenter=new FormControl('',Validators.required)
        this.duration = new FormControl('',Validators.required)
        this.level = new FormControl('',Validators.required)
        this.abstract = new FormControl('',[Validators.required,Validators.maxLength(500),restrictedWordsValidator(['foo','bar','pool'])])

        this.newSessionForm= new FormGroup({
            name: this.name,
            presenter : this.presenter,
            duration : this.duration,
            level : this.level,
            abstract : this.abstract
        })
    }
   
    SaveSession(formValues)
    {
        let session : ISession = {
            id : undefined,
            name : formValues.name,
            presenter : formValues.presenter,
            duration : +formValues.duration,
            level : formValues.level,
            abstract : formValues.abstract,
            voters : []
        }        
        this.newSession.emit(session);
    }
    cancel()
    {
        this.cancelAddSession.emit();       
    }
}
