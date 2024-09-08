import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth } from "../../FirebaseConfig"
import "./styles/login.styles.css"
import img from "../assets/logo_completa.webp"

export function Login({ handleLoggin }) {
    const navigate = useNavigate()
    document.title = "INNC | Login"
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
    const [dataLogin, setDataLogin] = useState({
        email: "",
        password: ""
    })

    function handleSignIn(e) {
        e.preventDefault()
        if (emailIsValid(dataLogin.email) && passwordIsValid(dataLogin.password)) {
            signInWithEmailAndPassword(dataLogin.email, dataLogin.password).then((user) => {
                if (user) {
                    handleLoggin()
                    navigate("/admin")
                } else {
                    alert("Login falhou. Verifique suas credenciais.")
                }
            })
        } else {
            alert("Confira dos dados inseridos")
        }
    }

    // Função de validação de e-mail
    function emailIsValid(email) {
        return true
    }

    function passwordIsValid(password) {
        return true
    }

    return (
        <div className="login-div">
            <form onSubmit={handleSignIn}>
                <img src={img} alt="Logo" width={200}/>
                <input
                    placeholder="Email"
                    type="email" 
                    value={dataLogin.email} 
                    onChange={(e) => setDataLogin((prevState) => ({ ...prevState, email: e.target.value }))} 
                />
                <input
                    placeholder="Senha"
                    type="password"
                    value={dataLogin.password} 
                    onChange={(e) => setDataLogin((prevState) => ({ ...prevState, password: e.target.value }))} 
                />
                <button type="submit"> Login </button>
            </form>
        </div>
    )
}