import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { auth, db } from '../../app/firebaseApp'

type FormData = {
    text: string
}

const New = () => {
    const [user] = useAuthState(auth)
    const router = useRouter()
    const { register, handleSubmit } = useForm<FormData>()
    const onSubmit = handleSubmit(async (data) => {
        if (user) {
            const newPost = {
                text: data.text,
                uid: user.uid,
                createdAt: serverTimestamp(),
            }
            console.log("DATA", data)
            const docRef = await addDoc(collection(db, 'posts'), newPost)
            router.push(`/posts/${docRef.id}`)
        }
    })
    return (
        <div>
            <h1>Новый пост</h1>
            <form onSubmit={onSubmit}>
                <TextField
                    {...register('text')}
                    multiline
                    label="Текст поста"
                    rows={4}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <div>
                    <Button component="label" variant="contained" sx={{ mb: 1 }}>
                        Загрузить фото
                        <input type="file" hidden />
                    </Button>
                </div>
                <Button type="submit">Опубликовать</Button>
            </form>
        </div>
    )
}

export default New