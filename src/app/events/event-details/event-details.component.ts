import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from  '../shared/index';


@Component({
  templateUrl: './event-details.component.html',
  styles: [`
    .container{
        padding-left:20px;
        padding-right:20px;
    }
    .event-image{
        height:100px;
    }
    a{
      cursor:pointer;
    }
    `
  ]
})
export class EventDetailsComponent implements OnInit {
 
  event: IEvent;
  addMode :boolean=false;
  filterLevel:string='all';
  sortBy:string="byVote";
  
  constructor(private eventService: EventService, private route: ActivatedRoute) {

  }
  ngOnInit() {

    this.route.data.forEach((data)=>{
      // this.eventService.getEventbyId(+params['id']).subscribe((data:IEvent)=>{
        this.event=data["event"];
        this.addMode=false;
      })   
    
    //this.event = this.eventService.getEventbyId(+this.route.snapshot.params['id']);
  }
  addSession()
  {
    this.addMode=true
  }
  cancelAddSession()
  {
    this.addMode=false
  }
  saveNewSession(session:ISession)
  {
    const nextId= Math.max.apply(null,this.event.sessions.map(a=>a.id))
    let newSessionId= nextId + 1
    session.id = newSessionId
    this.event.sessions.push(session)
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode=false
  }
}
