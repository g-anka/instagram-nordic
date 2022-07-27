import { useEffect } from 'react'
import type { NextPage } from 'next'
import { doc, setDoc } from 'firebase/firestore'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import { auth, db } from '../../app/firebaseApp'
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import Link from "next/link";

type FormData = {
    name: string
    email: string
    password: string
}

const Register: NextPage = () => {
    const [user] = useAuthState(auth)

    const [createUserWithEmailAndPassword, newUser, , error] =
        useCreateUserWithEmailAndPassword(auth)

    const { register, handleSubmit, getValues } = useForm<FormData>()

    const onSubmit = handleSubmit( (data) => {
        createUserWithEmailAndPassword(data.email, data.password)
        console.log("newUser: ", newUser)
    })

    useEffect(() => {
        if (newUser) {
            const uid = newUser.user.uid
            setDoc(doc(db, 'users', uid), {
                name: getValues('name'),
            })
        }
    }, [newUser])

    if (user) {
        return (
            <div>
                <div>Вы вошли как {user.email}</div>
                <Button onClick={() => signOut(auth)}>Выйти</Button>
            </div>
        )
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1>Регистрация</h1>
                <TextField
                    {...register('name')}
                    type="text"
                    sx={{ mb: 2 }}
                    fullWidth
                    label="Ваше имя"
                />
                <TextField
                    {...register('email')}
                    type="email"
                    sx={{ mb: 2 }}
                    fullWidth
                    label="Ваш email"
                />
                <TextField
                    {...register('password')}
                    type="password"
                    sx={{ mb: 2 }}
                    fullWidth
                    label="Пароль"
                />
                <Button type="submit" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
                {error?.code === 'auth/email-already-in-use' && (
                    <Alert sx={{ mt: 2 }} severity="error">
                        Email занят
                    </Alert>
                )}
                <Alert sx={{ mt: 2}} severity="info">
                    Уже есть аккаунт? <Link href="/auth/login">Войдите</Link>
                </Alert>
            </form>
        </div>
    )
}

export default Register