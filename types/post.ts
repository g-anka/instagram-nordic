type Post = {
    uid: string,
    user: {
        name: string,
    }
    id: string,
    text: string,
    images: string[],
    createdAt: Date | null,
    likesCount: number,
    commentsCount: number,
}

export default Post