import {VoterService} from './voter.service';
import {ISession} from '../shared/index';
import {of} from 'rxjs';
import { Session } from 'protractor';

describe('VoterService',()=> {
    let voterService: VoterService;
    let mockHttp;

    beforeEach(()=> {
        mockHttp = jasmine.createSpyObj('mockHttp',['delete','post']);
        voterService = new VoterService(mockHttp);
    });

    describe('delete Voter',()=> {
        it('should delete a voter from voterlist',()=> {
            const session= {id:6,voters:['john','doe']};
            mockHttp.delete.and.returnValue(of(false));
            voterService.deleteVoter(1,session as ISession,'john');
            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('doe');

        });

        it('should call http.delete with correct URL',()=> {
            const session= {id:6, voters:['john']};
            mockHttp.delete.and.returnValue(of(false));
            voterService.deleteVoter(1,session as ISession,'john');
            expect(mockHttp.delete).toHaveBeenCalledWith('api/events/1/sessions/6/voters/john');
        });
    });

    describe('Add voter service',()=> {
        it('should call http.post with correct URL',()=> {
            const session= {id:6 , voters:['joe']};
            mockHttp.post.and.returnValue(of(false));
            voterService.addVoter(1,session as ISession,'john');

            expect(mockHttp.post).toHaveBeenCalledWith('api/events/1/sessions/6/voters/john',{},jasmine.any(Object));
        });
    });

});
