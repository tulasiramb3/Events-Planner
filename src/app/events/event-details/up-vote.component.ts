import { Component , Input , EventEmitter,Output, OnChanges } from '@angular/core'

@Component({
    selector : 'up-vote',
    template : `<div class="votingWidgetContainer pointable" (click) = "onClick()">
                    <div class="well votingWidget">
                        <div class="votingButton">
                            <i *ngIf = "voted" class="fa fa-heart" [style.color]="iconColor"></i>
                            <i *ngIf = "!voted" class="fa fa-heart-o" [style.color]="iconColor"></i>
                        </div>
                    </div>

                    <div class = "badge badge-inverse votingCount">
                        <div> {{ count }}
                    </div>
                </div>                 
                `,
    styleUrls: ['./up-vote.component.css']

})
export class UpVoteComponent
{
    @Input() count : number;
    @Input() set voted(val){
       this.iconColor= val? 'red' : 'white';
    }
    @Output() vote = new EventEmitter();
    iconColor:string
   constructor(){}
  
   onClick()
   {
       this.vote.emit({});
   }
  

}