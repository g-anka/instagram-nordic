import { ChangeEvent } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useUploadFile } from 'react-firebase-hooks/storage'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { auth, db, storage } from '../../app/firebaseApp'

type FormData = {
    imageURL: string
    text: string
}

const New = () => {
    const [user] = useAuthState(auth)
    const router = useRouter()
    const { register, handleSubmit, setValue } = useForm<FormData>()
    const [uploadFile, uploading] = useUploadFile()

    const onSubmit = handleSubmit(async (data) => {
        if (user) {
            const newPost = {
                text: data.text,
                uid: user.uid,
                createdAt: serverTimestamp(),
                imageURL: data.imageURL,
            }

            console.log("NEW_POST", newPost)

            const docRef = await addDoc(collection(db, 'posts'), newPost)
            router.push(`/posts/${docRef.id}`)
        }
    })

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileRef = ref(storage, `${Date.now()}-${event.target.files[0].name}`)
            const result = await uploadFile(fileRef, event.target.files[0])
            if (result) {
                const imageURL = await getDownloadURL(result?.ref)
                setValue('imageURL', imageURL)
            }
        }
    }

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
                    <Button
                        disabled={uploading}
                        component="label"
                        variant="contained"
                        sx={{ mb: 1 }}
                    >
                        Загрузить фото
                        <input
                            type="file"
                            hidden
                            {...register('imageURL')}
                            onChange={handleFileChange}
                        />
                    </Button>
                </div>
                <Button type="submit">Опубликовать</Button>
            </form>
        </div>
    )
}

export default New