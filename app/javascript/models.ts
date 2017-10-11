export interface OpenPRCheckData {
    count: number;
    items: {
        url: string;
        prNumber: string;
        title: string;
    }[];
}

export interface UnmergedBranchCheckData {
    count: number;
    items: {
        name: string;
        url: string;
    }[];
}

export interface OpenPRCheck {
    type: "open_prs";
    status: "pending" | "success" | "failure";
    data: OpenPRCheckData;
}

export interface UnmergedBranchCheck {
    type: "unmerged_branches";
    status: "pending" | "success" | "failure";
    data: UnmergedBranchCheckData;
}

export type GitRepoCheck = OpenPRCheck | UnmergedBranchCheck;

export interface GitRepo {
    id: string;
    parentNameWithOwner: string;
    description: string;
    forkedAt: number; // Unix timestamp

    checks: GitRepoCheck[];
}

export interface User {
    username: string;
    avatarUrl: string;
    gitRepositoriesSyncedAt: number;
}
