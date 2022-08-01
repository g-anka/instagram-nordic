import Card from '@mui/material/Card'
import Link from 'next/link'
import CardMedia from '@mui/material/CardMedia'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import type PostType from '../types/post'

type PostPropTypes = {
    post: PostType
}

const Post: FC<PostPropTypes> = ({ post }) => {
    return (
        <div>
            <Card>
                <CardHeader
                    title={post.uid}
                    subheader={post.createdAt ? post.createdAt?.toLocaleDateString() : ''}
                />
                <Link href={`/posts/${post.id}`}>
                    <a>
                        <CardMedia component='img' image={post.imageURL} />
                    </a>
                </Link>
                <CardContent>{post.text}</CardContent>
                <CardActions>
                    <FavoriteIcon />
                    <IconButton />
                </CardActions>
            </Card>
        </div>
    )
}

export default Post