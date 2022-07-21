import type {NextPage} from 'next'
import Link from 'next/link'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import { auth } from '../../app/firebaseApp'
import {
    useAuthState,
    useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth'
import { signOut, updateProfile } from 'firebase/auth'

type FormData = {
    email: string
    password: string
}

const Login: NextPage = () => {
    const [user] = useAuthState(auth)

    const [createUserWithEmailAndPassword, , , error] =
        useSignInWithEmailAndPassword(auth)

    const { register, handleSubmit } = useForm<FormData>()

    const onSubmit = handleSubmit( async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password)
    })
    if(user) {
    return (
        <div>
            <div>
                Вы вошли как {user.email}
            </div>
            <Button onClick={() => signOut(auth)}>Выйти</Button>
        </div>
    )
}

return (
    <div>
        <form onSubmit={onSubmit}>
            <h1>Вход</h1>
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
                Войти
            </Button>
            {error && (
            <Alert>
                {error?.code === 'auth/user-not-found' && 'Аккаунт не найден'}
                {error?.code === 'auth/wrong-password' && 'Неправильный пароль'}
            </Alert>
            )}
            <Alert sx={{ mt: 2}} severity="info">
                Eщё нет аккаунта? <Link href="/auth/register">Зарегистрируйтесь</Link>
            </Alert>


        </form>
    </div>
)
}

export default Login