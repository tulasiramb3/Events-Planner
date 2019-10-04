import {Component, Input, OnChanges} from '@angular/core';
import { ISession} from '../shared/index';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector:'session-list',
    templateUrl:'./session-list.component.html'
})
export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    @Input() eventId: number;
    visibleSessions: ISession[];
    constructor(public authService: AuthService,private voterService: VoterService) {}

    ngOnChanges() {
        if(this.sessions) {
           this.filterSessions(this.filterBy);
           this.sortBy==='byVote'?this.visibleSessions.sort(sortByVoteDesc):this.visibleSessions.sort(sortByNameASC);
        }
    }
    filterSessions(filter: string) {
        if(this.filterBy==='all') {
               this.visibleSessions = this.sessions.slice(0);
            //    console.log(this.visibleSessions);
           } else {
           this.visibleSessions = this.sessions.filter(session=> {
               return session.level.toLocaleLowerCase()===filter;
           });
        }
        // console.log(this.visibleSessions);
    }
    toggleVote(session: ISession) {
        if(this.UserhasVoted(session)) {
            console.log('delete');
            this.voterService.deleteVoter(this.eventId,session,this.authService.currentUser.userName);
        } else {
            this.voterService.addVoter(this.eventId,session,this.authService.currentUser.userName);
        }
        if(this.sortBy ==='Vote') {
            this.visibleSessions.sort(sortByVoteDesc);
        }
    }
    UserhasVoted(session: ISession) {
        return this.voterService.UserhasVoted(session,this.authService.currentUser.userName);
    }

}
function  sortByVoteDesc(session1: ISession,session2: ISession) {
    return session2.voters.length-session1.voters.length;
}

function sortByNameASC(session1: ISession, session2: ISession) {
    if(session1.name>session2.name) {
        return 1;
    } else if(session1.name===session2.name) {
        return 0;
             } else {
        return -1;
             }

}
