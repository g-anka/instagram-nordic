import type { NextPage } from 'next'
import { collection, query, orderBy, doc, updateDoc, increment } from 'firebase/firestore'
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore'
import { auth, db } from '../../app/firebaseApp'
import postConverter from '../../helpers/postConverter'
import userConverter from '../../helpers/userConverter'
import Post from '../../components/Post'
import Box from '@mui/material/Box'
import PostType from '../../types/post'
import { useAuthState } from 'react-firebase-hooks/auth'


const Posts: NextPage = () => {
    const [user] = useAuthState(auth)
    const [userProfile] = useDocumentData(
        doc(db, 'users', String(user?.uid)).withConverter(userConverter))
    const userLikes = userProfile?.likes || []

    const postsRef = collection(db, 'posts').withConverter(postConverter)
    const [posts] = useCollectionData(
        query(postsRef, orderBy ('createdAt', 'desc'))
    )

    console.log("POSTS", posts)

    const handleLikeClick = (post: PostType) => {
        if (!user) {
            return
        }
        const isLiked = userLikes.includes(post.id)
        if (isLiked) {
            const newLikes = userLikes.filter((like) => like !== post.id)
            updateDoc(doc(db, 'users', String(user.uid)), { likes: newLikes })
            updateDoc(doc(db, 'posts', post.id), { likesCount: increment(-1) })
        } else {
            const newLikes = [...userLikes, post.id]
            updateDoc(doc(db, 'users', String(user.uid)), { likes: newLikes })
            updateDoc(doc(db, 'posts', post.id), { likesCount: increment(1) })
        }
    }

    return (
        <div>
            <h1>Posts List</h1>
            {posts &&
            posts.map((post) => (
                <Box key={post.id} sx={{mb: 2, maxWidth: '500px'}}>
                    <Post
                        post={post}
                        onLikeClick={() => handleLikeClick(post)}
                        liked={userLikes.includes(post.id)}
                    />
                </Box>
            ))}
        </div>
    )
}

export default Posts