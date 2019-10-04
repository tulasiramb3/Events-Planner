import { CollapsibleWellComponent } from './../../common/collapsible-well.component';
import {TestBed,async,ComponentFixture} from '@angular/core/testing';
import {DebugElement,NO_ERRORS_SCHEMA} from '@angular/core';
import {SessionListComponent} from './session-list.component';
import { UpVoteComponent } from './up-vote.component';
import {AuthService} from '../../user/auth.service';
import { VoterService } from './voter.service';
import {ISession} from '../shared/event.model';
import {By} from '@angular/platform-browser';
import { DurationPipe } from '../shared';


describe('SessionListComponent',()=> {
  // tslint:disable-next-line: one-variable-per-declaration
  let fixture: ComponentFixture<SessionListComponent>,
      component: SessionListComponent,
      element: HTMLElement,
      debugEl: DebugElement;

  beforeEach(async(()=> {
    const mockAuthService = {
      isAuthenticated:()=>true,
      currentUser : {userName:'joe'}
    };
    const mockVoterService = {
      UserhasVoted:()=>true
    };

    TestBed.configureTestingModule({
      imports: [],
      declarations : [
        SessionListComponent,
        // UpVoteComponent, added no errors schema to ignore
        DurationPipe
        // CollapsibleWellComponent
      ],
      providers : [
       {provide: AuthService , useValue: mockAuthService},
       {provide : VoterService , useValue: mockVoterService}
      ],
      schemas : [NO_ERRORS_SCHEMA]
    });
  }));
  beforeEach(()=> {
    fixture= TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    debugEl = fixture.debugElement;
  });
  describe('initial display',()=> {
    it('should have correct session title',()=> {
        component.sessions =[{id:3, name:'Session 1',presenter:'Joe' , duration :1 , level:'beginner',
      abstract : 'abstract' , voters:['john','bob']}] as ISession[];
        component.filterBy = 'all';
        component.sortBy = 'name';
        component.eventId=4;

        component.ngOnChanges();
        fixture.detectChanges();

        // expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
        expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
    });
  });
});
