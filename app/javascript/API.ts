import { GitRepo, OpenPRCheck, UnmergedBranchCheck, User } from "./models";
import axios from "axios";

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
    avatarUrl: "https://avatars1.githubusercontent.com/u/3893573?v=4",
    gitRepositoriesSyncedAt: 12345
};

let fakeRepos: GitRepo[] = [
    {
        id: "1",
        parentNameWithOwner: "gratipay/gratipay.com",
        description:
            "Gratitude? Gratipay! We help companies and others pay for open source.",
        forkedAt: 1502863016,
        checks: allChecksOk
    },
    {
        id: "2",
        parentNameWithOwner: "1egoman/backstroke",
        description:
            "🏊 A Github bot to keep repository forks up to date with their upstream. ",
        forkedAt: 1497592616,
        checks: allChecksOk
    },
    {
        id: "3",
        parentNameWithOwner: "qunitjs/qunit",
        description: "An easy-to-use JavaScript Unit Testing framework.",
        forkedAt: 1466056616,
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

export class API {
    url: string;

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

    getUser(): Promise<User> {
        let apiUrl = this.url;
        return new Promise(function(resolve, reject) {
            let axiosPromise = axios.get(apiUrl + "/api/v1/user.json");
            axiosPromise.then(function(resp) {
                resolve({
                    username: resp.data.username,
                    avatarUrl: resp.data.avatar_url,
                    gitRepositoriesSyncedAt:
                        resp.data.git_repositories_synced_at
                });
            });
        });
    }
}
