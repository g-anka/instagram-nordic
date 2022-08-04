import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../app/firebaseApp";
import {doc, DocumentReference} from "firebase/firestore";
import {useDocumentData} from "react-firebase-hooks/firestore";
import User from '../types/user'
import userConverter from "./userConverter";

function useUserProfile(): {
    userProfile:  User | undefined,
    userRef: DocumentReference<User>
} {
    const [user] = useAuthState(auth)
    console.log("USER: ", user)
    const userRef = doc(db, 'users', String(user?.uid)).withConverter(userConverter)
    const [userProfile] = useDocumentData(userRef)
    console.log("USER_PROF: ", userProfile)

    return { userProfile, userRef }
}

export default useUserProfile