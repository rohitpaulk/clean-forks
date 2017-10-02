import 'mocha';
import assert = require('assert');
import { GitRepo, GitRepoCheck } from '../../models';
import { API as FakeBootAPI } from '../../FakeBootAPI';

describe('Fake Boot API', function() {
    it('returns all pending checks at the start', function(done) {
        let fakeAPI = new FakeBootAPI("dummy_url");
        fakeAPI.setArtificationDelayMilliseconds(0);
        let promise = fakeAPI.getRepos();
        promise.then(function (result) {
            let checkStatuses = result.map(function(repo: GitRepo) {
                return repo.checks.map(function(check: GitRepoCheck) {
                    return check.status;
                });
            });

            let unique = [...new Set(myArray)];
            assert.equal(["failure"], unique);
            done();
        });
    });
});
