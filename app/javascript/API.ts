import { GitRepo } from './models';

let fakeRepos = [
  {
    id: '1',
    parentNameWithOwner: "gratipay/gratipay.com",
    description: "Gratitude? Gratipay! We help companies and others pay for open source.",
    forkedAt: 123
  },
  {
    id: '2',
    parentNameWithOwner: "1egoman/backstroke",
    description: "🏊 A Github bot to keep repository forks up to date with their upstream. ",
    forkedAt: 123
  },
  {
    id: '3',
    parentNameWithOwner: "qunitjs/qunit",
    description: "An easy-to-use JavaScript Unit Testing framework.",
    forkedAt: 123
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
