import { GitRepo, OpenPRCheck, UnmergedBranchCheck } from './models';

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

let fakeRepos: GitRepo[] = [
    {
        id: '1',
        parentNameWithOwner: "gratipay/gratipay.com",
        description: "Gratitude? Gratipay! We help companies and others pay for open source.",
        forkedAt: 1502863016,
        checks: allChecksOk
    },
    {
        id: '2',
        parentNameWithOwner: "1egoman/backstroke",
        description: "🏊 A Github bot to keep repository forks up to date with their upstream. ",
        forkedAt: 1497592616,
        checks: allChecksOk
    },
    {
        id: '3',
        parentNameWithOwner: "qunitjs/qunit",
        description: "An easy-to-use JavaScript Unit Testing framework.",
        forkedAt: 1466056616,
        checks: [
            {
                type: "open_prs",
                status: "success",
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

export class API {
    url: string

    constructor(url: string) {
        this.url = url;
    }

    getRepos(): Promise<GitRepo[]> {
        return new Promise(function(resolve, reject) {
            return setInterval(function() {
                resolve(fakeRepos);
            }, 500);
        });
    }
}
