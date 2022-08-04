import { updateDoc } from 'firebase/firestore'
import { ChangeEvent } from 'react'
import useUserProfile from "../../helpers/useUserProfile";

const Profile = () => {
    const { userProfile, userRef } = useUserProfile()

    if (!userProfile) {
        return <div>Вы не авторизованы</div>
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateDoc(userRef, {
            name: event.target.value,
        })
    }

    return (
        <div>
            <h1>User profile</h1>
            <p>ID: {userProfile?.uid}</p>
            {userProfile && (
                <div>
                    Имя:{' '}
                    <input
                        type='text'
                        value={userProfile.name}
                        onChange={handleNameChange}
                    />
                </div>
            )}
        </div>
    )
}

export default Profile