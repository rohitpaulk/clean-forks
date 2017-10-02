// This is used to fake a scenario where a user initially signs up, and
// we're slowly pulling in data from Github.
//
// The implementation simply sends out different responses based on the time
// elapsed.
import { GitRepo, OpenPRCheck, UnmergedBranchCheck, GitRepoCheck, User } from './models';
import axios from 'axios';

let allChecksPending = [
    {
        type: "open_prs",
        status: "pending",
        data: {}
    } as OpenPRCheck, // Why should I specify the type here?

    {
        type: "unmerged_branches",
        status: "pending",
        data: {}
    } as UnmergedBranchCheck // Why should I specify the type here?
];

let halfChecksPending = [
    {
        type: "open_prs",
        status: "success",
        data: { count: 0, items: [] }
    } as OpenPRCheck, // Why should I specify the type here?

    {
        type: "unmerged_branches",
        status: "pending",
        data: {}
    } as UnmergedBranchCheck // Why should I specify the type here?
];

let allChecksOk = [
    {
        type: "open_prs",
        status: "success",
        data: { count: 0, items: [] }
    } as OpenPRCheck, // Why should I specify the type here?

    {
        type: "unmerged_branches",
        status: "success",
        data: { count: 0, items: [] }
    } as UnmergedBranchCheck // Why should I specify the type here?
];

let fakeUser: User = {
    username: "rohitpaulk",
    avatarUrl: "https://avatars1.githubusercontent.com/u/3893573?v=4"
};

enum Stage {
    I,
    II,
    III,
    IV
}

function getFakeRepos(stage: Stage): GitRepo[] {
    let checks: {[key: string]: GitRepoCheck[]} = {};
    if (stage === Stage.I) {
        checks = {
            repo1: allChecksPending,
            repo2: allChecksPending,
            repo3: allChecksPending
        };
    } else if (stage === Stage.II) {
        checks = {
            repo1: allChecksPending,
            repo2: halfChecksPending,
            repo3: allChecksPending
        };
    } else if (stage === Stage.III) {
        checks = {
            repo1: allChecksPending,
            repo2: halfChecksPending,
            repo3: halfChecksPending
        };
    } else if (stage === Stage.IV) {
        checks = {
            repo1: allChecksOk,
            repo2: allChecksOk,
            repo3: allChecksOk
        };
    }

    return [
        {
            id: '1',
            parentNameWithOwner: "gratipay/gratipay.com",
            description: "Gratitude? Gratipay! We help companies and others pay for open source.",
            forkedAt: 1502863016,
            checks: checks.repo1
        },
        {
            id: '2',
            parentNameWithOwner: "1egoman/backstroke",
            description: "🏊 A Github bot to keep repository forks up to date with their upstream. ",
            forkedAt: 1497592616,
            checks: checks.repo2
        },
        {
            id: '3',
            parentNameWithOwner: "qunitjs/qunit",
            description: "An easy-to-use JavaScript Unit Testing framework.",
            forkedAt: 1466056616,
            // TODO: Replace from checks!
            checks: [
                {
                    type: "open_prs",
                    status: "pending",
                    data: { count: 0, items: [] }
                } as OpenPRCheck, // Why should I specify the type here?

                {
                    type: "unmerged_branches",
                    status: "failure",
                    data: { count: 1, items: [] } // TODO: Add items
                } as UnmergedBranchCheck // Why should I specify the type here?
            ]
        }
    ];
}

export class API {
    url: string
    startTime: number
    artificialDelayMilliseconds: number

    constructor(url: string) {
        this.url = url;
        this.startTime = new Date().getTime();
        this.artificialDelayMilliseconds = 500;
    }

    setArtificationDelayMilliseconds(delay: number) {
        this.artificialDelayMilliseconds = delay;
    }

    getStage(): Stage {
        let currentTime = new Date().getTime();
        let timeElapsed = currentTime - this.startTime;

        if (timeElapsed < 500) {
            return Stage.I;
        } else if (timeElapsed < 1000) {
            return Stage.II;
        } else if (timeElapsed < 1500) {
            return Stage.III;
        } else {
            return Stage.IV
        }
    }

    getRepos(): Promise<GitRepo[]> {
        let self = this;
        return new Promise(function(resolve, reject) {
            return setInterval(function() {
                let repos = getFakeRepos(self.getStage())
                resolve(repos);
            }, self.artificialDelayMilliseconds);
        });
    }

    getUser(): Promise<User> {
        let apiUrl = this.url;
        return new Promise(function(resolve, reject) {
            let axiosPromise = axios.get(apiUrl + '/api/v1/user.json');
            axiosPromise.then(function(resp) {
                resolve({
                    username: resp.data.username,
                    avatarUrl: resp.data.avatar_url
                });
            });
        });
    }
}
