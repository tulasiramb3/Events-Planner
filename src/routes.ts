import {Routes} from '@angular/router';
import { Error404Component } from './app/errors/404.component';
import {
    EventDetailsComponent,
    CreateSessionComponent,
    EventsListComponent,
    CreateEventComponent,
    EventListResolverService,
    EventResolverService
} from './app/events/index'

export const appRoutes:Routes=[
    {path:'events' , component:EventsListComponent , resolve:{events:EventListResolverService}},
    {path:'events/createnew',component:CreateEventComponent},
    {path:'events/session/createnew',component:CreateSessionComponent},
    {path:'events/:id',component:EventDetailsComponent,resolve:{event:EventResolverService}},
    {path:'404' , component:Error404Component},
    {path:'',redirectTo:'/events',pathMatch:'full'}  ,
    {path:'user', loadChildren:'./user/user.module#UserModule'}
]