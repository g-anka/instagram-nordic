import { doc, updateDoc } from 'firebase/firestore'
import { ChangeEvent } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../app/firebaseApp'

const Profile = () => {
    const [user] = useAuthState(auth)
    console.log("USER: ", user)
    const docRef = doc(db, 'users', user?.uid || 'null')
    const [userProfile] = useDocumentData(docRef)
    console.log("USER_PROF: ", userProfile)

    if (!user || !userProfile) {
        return (
            <div>
                Вы не авторизованы
            </div>
        )
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateDoc(docRef, {
            name: event.target.value,
        })
    }

    return (
        <div>
            <h1>Профиль юзера</h1>
            <p>ID: {user.uid}</p>
            <p>
                Имя:{' '}
                <input
                    type='text'
                    value={userProfile.name}
                    onChange={handleNameChange}
                />
            </p>
        </div>
    )
}

export default Profile