import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    serverTimestamp,
    query,
    orderBy,
    increment
} from 'firebase/firestore'
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore'
import { db, auth } from '../../app/firebaseApp'
import postConverter from '../../helpers/postConverter'
import Box from '@mui/material/Box'
import PostContainer from '../../containers/PostContainer'
import Comments from "../../components/Comments";
import commentConverter from "../../helpers/commentConverter";
import { useAuthState } from "react-firebase-hooks/auth";
import CommentForm from "../../components/CommentForm";


const PostPage: NextPage = () => {
    const [user] = useAuthState(auth)
    const [userProfile] = useDocumentData(doc(db, 'users', String(user?.uid)))
    const router = useRouter()
    const docRef = doc(db, 'posts', String(router.query.id))
    const [post] = useDocumentData(docRef.withConverter(postConverter))
    const commentsRef = collection(db, 'posts', String(post?.id), 'comments')
    const [comments] = useCollectionData(
        query(
            commentsRef.withConverter(commentConverter),
            orderBy('createdAt', 'asc')
        )
    )

    const handleCommentSubmit = (data: { text: string }) => {
        if (!user) {
            return
        }

        const newComment= {
            uid: user.uid,
            user: {
                name: userProfile?.name,
            },
            text: data.text,
            createdAt: serverTimestamp(),
        }
        addDoc(commentsRef, newComment)

        // increase comments counter
        updateDoc(docRef, { commentsCount: increment(1) })
    }

    return (
        <div>
            <h1>Post Page</h1>
            {post && <PostContainer post={post}/>}
            <Box sx={{ my: 3 }}>
                {comments && <Comments comments={comments} /> }
                <CommentForm onSubmit={handleCommentSubmit} />
            </Box>
        </div>
    )
};

export default PostPage