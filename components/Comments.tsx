import { FC } from 'react'
import { formatDistance } from 'date-fns'
import Card from '@mui/material/Card'
import type Comment from '../types/comment'

type CommentProps = {
    comments: Comment[]
}

const Comments: FC<CommentProps> = ({ comments }) => {
    if (comments.length === 0) {
        return <h3>No comments yet</h3>
    }

    return (
        <div>
            {comments.map((comment) => (
                <Card sx={{ mb: 2, p: 2 }} key={comment.id}>
                    <div key={comment.id}>
                        <div>{comment.user.name}</div>
                        {comment.createdAt ? (
                            <div>
                                {formatDistance(comment.createdAt, new Date(), {
                                    addSuffix: true,
                                })}
                            </div>
                        ) : (
                            'Just now'
                        )}
                        <div>{comment.text}</div>
                    </div>
                </Card>
            ))}
        </div>
    )
};

export default Comments