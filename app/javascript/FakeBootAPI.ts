// This is used to fake a scenario where a user initially signs up, and
// we're slowly pulling in data from Github.
//
// The implementation simply sends out different responses based on the time
// elapsed.
import axios from "axios";

import {
    GitRepo,
    OpenPRCheck,
    UnmergedBranchCheck,
    GitRepoCheck,
    User
} from "./models";

let prCheckPending: OpenPRCheck = {
    type: "open_prs",
    status: "pending",
    data: { count: 0, items: [] }
};

let branchCheckPending: UnmergedBranchCheck = {
    type: "unmerged_branches",
    status: "pending",
    data: { count: 0, items: [] }
};

let prCheckSuccess: OpenPRCheck = {
    type: "open_prs",
    status: "success",
    data: { count: 0, items: [] }
};

let branchCheckSuccess: UnmergedBranchCheck = {
    type: "unmerged_branches",
    status: "success",
    data: { count: 0, items: [] }
};

let branchCheckFailure: UnmergedBranchCheck = {
    type: "unmerged_branches",
    status: "failure",
    data: { count: 1, items: [] }
};

let allChecksPending = [prCheckPending, branchCheckPending];
let halfChecksPendingNoneFailed = [prCheckSuccess, branchCheckPending];
let halfChecksSuccessOneFailed = [prCheckSuccess, branchCheckFailure];
let halfChecksOkOneFailed = [prCheckSuccess, branchCheckFailure];
let allChecksOk = [prCheckSuccess, branchCheckSuccess];

function getFakeUser(stage: Stage): User {
    let gitRepositoriesSyncedAt = stage === Stage.O ? 0 : 12345;
    return {
        username: "fake_username",
        gitRepositoriesSyncedAt: gitRepositoriesSyncedAt,
        avatarUrl:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
    };
}

enum Stage {
    O,
    I,
    II,
    III,
    IV
}

function getFakeRepos(stage: Stage): GitRepo[] {
    if (stage === Stage.O) {
        return [];
    }

    let checks: { [key: string]: GitRepoCheck[] } = {};
    if (stage === Stage.I) {
        checks = {
            repo1: allChecksPending,
            repo2: allChecksPending,
            repo3: allChecksPending
        };
    } else if (stage === Stage.II) {
        checks = {
            repo1: allChecksPending,
            repo2: halfChecksPendingNoneFailed,
            repo3: allChecksPending
        };
    } else if (stage === Stage.III) {
        checks = {
            repo1: allChecksPending,
            repo2: halfChecksPendingNoneFailed,
            repo3: halfChecksOkOneFailed
        };
    } else if (stage === Stage.IV) {
        checks = {
            repo1: allChecksOk,
            repo2: allChecksOk,
            repo3: halfChecksOkOneFailed
        };
    }

    return [
        {
            id: "1",
            parentNameWithOwner: "gratipay/gratipay.com",
            description:
                "Gratitude? Gratipay! We help companies and others pay for open source.",
            forkedAt: 1502863016,
            checks: checks.repo1
        },
        {
            id: "2",
            parentNameWithOwner: "1egoman/backstroke",
            description:
                "🏊 A Github bot to keep repository forks up to date with their upstream. ",
            forkedAt: 1497592616,
            checks: checks.repo2
        },
        {
            id: "3",
            parentNameWithOwner: "qunitjs/qunit",
            description: "An easy-to-use JavaScript Unit Testing framework.",
            forkedAt: 1466056616,
            checks: checks.repo3
        }
    ];
}

export class FakeBootAPI {
    url: string;
    artificialDelayMilliseconds: number;
    stage: Stage;

    constructor(url: string) {
        this.url = url;
        this.stage = Stage.O;
        this.artificialDelayMilliseconds = 500;
    }

    setStage(stage: Stage) {
        this.stage = stage;
    }

    setArtificationDelayMilliseconds(delay: number) {
        this.artificialDelayMilliseconds = delay;
    }

    getRepos(): Promise<GitRepo[]> {
        let self = this;
        return new Promise(function(resolve, reject) {
            return setInterval(function() {
                let repos = getFakeRepos(self.stage);
                resolve(repos);
            }, self.artificialDelayMilliseconds);
        });
    }

    getUser(): Promise<User> {
        let apiUrl = this.url;
        let self = this;

        return new Promise(function(resolve, reject) {
            return setInterval(function() {
                resolve(getFakeUser(self.stage));
            }, self.artificialDelayMilliseconds);
        });
    }
}

export { Stage };
