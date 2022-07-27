import type { NextPage } from 'next'
import Link from 'next/link'
import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../app/firebaseApp'
import postConverter from '../../helpers/postConverter'


const Posts: NextPage = () => {
    const [posts] = useCollectionData(collection(db, 'posts').withConverter(postConverter))
    console.log("POSTS", posts)
    return (
        <div>
            <h1>Список постов</h1>
            {posts &&
                    posts.map((post) => (
                        <div key={post.id}>
                            <Link href={`/posts/${post.id}`}>{post.text}</Link>
                        </div>
                    ))
            }
        </div>
    )
};

export default Posts