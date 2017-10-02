import "mocha";
import assert = require("assert");
import * as _ from "lodash";

import { GitRepo, GitRepoCheck } from "../models";
import { FakeBootAPI, Stage } from "../FakeBootAPI";

describe("Fake Boot API", function() {
    it("returns all pending checks at the start", function(done) {
        let fakeAPI = new FakeBootAPI("dummy_url");
        fakeAPI.setArtificationDelayMilliseconds(0);

        getStatuses(fakeAPI).then(statuses => {
            assert.deepEqual(["pending"], _.uniq(statuses));
            done();
        });
    });

    it("returns a few successful checks in the next stage", function(done) {
        let fakeAPI = new FakeBootAPI("dummy_url");
        fakeAPI.setArtificationDelayMilliseconds(0);
        fakeAPI.setStage(Stage.II);

        getStatuses(fakeAPI).then(statuses => {
            assert.deepEqual(["pending", "success"], _.uniq(statuses));
            done();
        });
    });

    it("returns no pending checks in the final stage", function(done) {
        let fakeAPI = new FakeBootAPI("dummy_url");
        fakeAPI.setArtificationDelayMilliseconds(0);
        fakeAPI.setStage(Stage.IV);

        getStatuses(fakeAPI).then(statuses => {
            assert.deepEqual(["success", "failure"], _.uniq(statuses));
            done();
        });
    });

    // Returns the values of status across all checks in all repositories.
    // Only returns unique values.
    function getStatuses(fakeAPI: FakeBootAPI): Promise<String[]> {
        return new Promise((resolve, reject) => {
            fakeAPI.getRepos().then(function(result) {
                let checkStatuses = _.flatMap(result, function(repo: GitRepo) {
                    return repo.checks.map(check => check.status);
                });

                resolve(_.uniq(checkStatuses));
            });
        });
    }
});
