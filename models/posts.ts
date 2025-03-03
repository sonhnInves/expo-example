export interface Post {
    id: number
    title: string
    body: string
    tags: Array<string>
    reactions: {
        likes: number
        dislikes: number
    }
    views: number
    userId: number
}

export type PostsResponse = {
    posts: Array<Post>
    total: number
    skip: number
    limit: number
}
