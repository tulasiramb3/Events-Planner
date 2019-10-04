import { Injectable } from '@angular/core';
import { ISession } from '../shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Injectable()
export class VoterService {

    constructor(private http: HttpClient) {}
    deleteVoter(eventId,session: ISession,voterName: string) {
        session.voters = session.voters.filter(voter=>voter!=voterName);
        const url = `api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.delete(url)
        .pipe(catchError(this.handleError('Delete Voter'))).subscribe(()=> {
            console.log('deleted');
        }
        );
    }
    addVoter(eventId: number , session: ISession,voterName: string) {
        session.voters.push(voterName);
        const url = `api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        const options = { headers : new HttpHeaders({'Content-Type' :  'application/json'}) };
        this.http.post(url,{},options).pipe(
            catchError(this.handleError('Add voter'))).subscribe();

    }
    UserhasVoted(session: ISession,voterName: string) {
        return session.voters.some(voteduser=>voteduser===voterName);
    }
    private handleError<T>(operation = 'operation' , result?: T) {
      return (error: any): Observable<T> => {
        console.log(error);
        return of(result as T);
      };
    }
}
