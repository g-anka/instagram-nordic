import type { NextPage } from 'next'
import { collection, query, orderBy } from 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { db } from '../../app/firebaseApp'
import postConverter from '../../helpers/postConverter'
import PostContainer from '../../containers/PostContainer'
import Box from '@mui/material/Box'


const Posts: NextPage = () => {
    const postsRef = collection(db, 'posts').withConverter(postConverter)
    const [posts] = useCollectionData(
        query(postsRef, orderBy ('createdAt', 'desc'))
    )

    return (
        <div>
            <h1>Posts List</h1>
            {posts &&
            posts.map((post) => (
                <Box key={post.id} sx={{mb: 2, maxWidth: '500px'}}>
                    <PostContainer post={post} />
                </Box>
            ))}
        </div>
    )
}

export default Posts