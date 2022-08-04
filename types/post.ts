type Post = {
    uid: string,
    user: {
        name: string,
    }
    id: string,
    text: string,
    imageURL: string,
    createdAt: Date | null,
    likesCount: number,
    commentsCount: number,
}

export default Post