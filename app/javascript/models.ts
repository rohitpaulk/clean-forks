export interface GitRepo {
    parentNameWithOwner: string
    description: string
    forkedAt: number // Unix timestamp

    // TODO: Add check status
}
