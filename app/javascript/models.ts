export interface GitRepo {
    id: string
    parentNameWithOwner: string
    description: string
    forkedAt: number // Unix timestamp

    // TODO: Add check status
}
