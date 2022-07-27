import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { db } from '../../app/firebaseApp'
import postConverter from '../../helpers/postConverter'

const Post: NextPage = () => {
    const router = useRouter()
    const docRef = doc(db, 'posts', String(router.query.id)).withConverter(
        postConverter
    )
    const [post] = useDocumentData(docRef)
    return (
        <div>
            <h1>Страница поста</h1>
            {post && (
                <div>
                    <div>
                        {post.createdAt && <div>{post.createdAt.toLocaleDateString()}</div>}
                    </div>
                    <div>{post.text}</div>
                </div>
            )}
            <button onClick={() => router.push('/posts')}>Список постов</button>
        </div>
    )
};

export default Post