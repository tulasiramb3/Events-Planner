import {Component, OnInit} from '@angular/core';
import {AuthService} from '../user/auth.service';
import {FormsModule} from '@angular/forms';
import { ISession, EventService, IEvent } from '../events';
@Component({
    selector:'nav-bar',
    templateUrl:'./navbar.component.html' ,
    styles:[
        `
        .nav.navbar-nav
        {
            font-size:15px
        }
        #searchForm
        {
            margin-right:100px
        }
        @media (max-width:1200px) {
            #searchForm
            {
                display:none
            }
        }
        li > a.active{
            color:orange
        }
        `
    ]
})
export class NavBarComponent implements OnInit {
    searchTerm: string = '';
    events: IEvent[];
    foundSessions: ISession[]
    constructor(public authService: AuthService,private eventService: EventService) {

    }
    ngOnInit() {
        this.getEvents();
    }
    searchSession(searchTerm) {
        this.eventService.getSessions(searchTerm).subscribe(sessions=> {
               this.foundSessions =sessions;
            //    console.log(sessions);
           }
        );

    }
    getEvents() {
       this.eventService.getEvents().subscribe((events: IEvent[])=> {
           console.log(events);
           this.events=events;
       });
    }
}
