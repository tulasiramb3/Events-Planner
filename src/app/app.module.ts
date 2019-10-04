import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EventsAppComponent } from './events-app.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import {
  EventsListComponent,
  EventThumbnail,
  EventService,
  EventDetailsComponent,
  CreateSessionComponent,
  CreateEventComponent,
  EventListResolverService,
  SessionListComponent,
  DurationPipe,
  UpVoteComponent,
  VoterService,
  LocationValidator,
  EventResolverService
}
from './events/index';
import {NavBarComponent} from  './nav/navbar.component';
import {TOASTR_TOKEN,Toastr,CollapsibleWellComponent,JQ_TOKEN,SimpleModalComponent,ModalTriggerDirective } from './common/index';
import {appRoutes} from 'src/routes';
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';


let toastr:Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnail,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpVoteComponent,
    LocationValidator

  ],
  providers:[EventService,
    {
      provide:TOASTR_TOKEN,
      useValue:toastr
    },
    {
      provide:JQ_TOKEN,
      useValue:jQuery
    },
  // EventRouteActivatorService,
  EventListResolverService,
  AuthService,
  VoterService,
  EventResolverService
],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }
