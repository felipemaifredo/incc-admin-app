import { signOut } from "firebase/auth"
import { FiLogOut } from "react-icons/fi"
import { auth } from "../../FirebaseConfig"
import { useNavigate } from 'react-router-dom'
import "./logoutbutton.styles.css"

export const LogoutButton = () => {
    const navigate = useNavigate()

    function handleLogout() {
        signOut(auth).then(() => {
            navigate('/login')
        })
    }

    return (
        <button className="logout-button" onClick={handleLogout} >
            <FiLogOut />
            Logout
        </button>
    )
}