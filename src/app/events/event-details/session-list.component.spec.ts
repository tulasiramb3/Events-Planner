import { ISession } from './../shared/event.model';
import {SessionListComponent} from '../event-details/session-list.component';

describe('SessionListComponent',()=> {
  let component: SessionListComponent;
  let mockAuthService, mockVoterService;

  beforeEach(()=> {
    component = new SessionListComponent(mockAuthService,mockVoterService);
  });

  describe('ngOnChanges',()=> {
    it('should filter the sessions correctly',()=> {
      component.sessions = [{name:'Session1' , level:'intermediate'},
      {name: 'Session2', level:'beginner'},
      {name: 'Session3', level:'intermediate'}] as ISession[];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.ngOnChanges();
      expect(component.visibleSessions.length).toBe(2);
    });
  });

  it('should verify the sorting works correctly',()=> {
    component.sessions = [{name:'Session2' , level:'intermediate'},
    {name: 'Session3', level:'beginner'},
    {name: 'Session1', level:'intermediate'}] as ISession[];
    component.sortBy = 'name';
    component.filterBy='all';

    component.ngOnChanges();
    expect(component.visibleSessions[0].name).toBe('Session1');

  });
});
