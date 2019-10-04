import {Component, Input} from '@angular/core';
import {IEvent} from './shared/index'

@Component({
    selector:'event-thumbnail',
    template:`
    <div class="well hoverwell thumbnail" [routerLink]="['/events',event.id]">
    <h2>{{event?.name | uppercase}}</h2>
    <div>Date : {{event?.date | date:'short'}}</div>
    <div [ngSwitch]="event?.time" [ngStyle]="getNgStyleTimeeventFunction()">
    Time : {{event?.time}}
    <span *ngSwitchCase="'8:00 am'" >(Early Bird)</span>
    <span *ngSwitchCase="'9:00 am'">(Normal Bird)</span>
    <span *ngSwitchCase="'10:00 am'">(Late Bird)</span>
    <span *ngSwitchDefault>(Not Assigned yet)</span>
    </div>    
    <div>Price : {{event?.price | currency:'USD'}}</div>
    <div *ngIf="event.location">
        <span>Location:{{event?.location?.address}}</span>
        
        <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
    </div>
    <div *ngIf="event.onlineUrl">Online URL : {{event.onlineUrl}}</div>
</div>
    `,
    styles:[`
      
        .thumbnail{
            min-height:210px
        }
        .pad-left{
            margin-left:10px;
        }
        .well div{
            color:#bbb;
        }
        `]
})

export class EventThumbnail
{
  @Input() event:IEvent; 
  getNgStyleTimeeventFunction()
  {
    //   var boolean= this.event&&this.event.time==='8:00 am';
    //   return {green:boolean,bold:boolean};
    if(this.event&&this.event.time==='8:00 am')
    {
        return {color:'orange','font-weight':'bold'};
    }
    else
        return {color:'yellow','font-weight':'bold'};

  }
}