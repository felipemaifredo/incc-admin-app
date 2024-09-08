import "./styles/homeadm.styles.css"
import { GrArticle } from "react-icons/gr"
import { FaUserDoctor } from "react-icons/fa6"
import { FaProductHunt } from "react-icons/fa"

import { ButtonCenter } from "../components/ButtonCenter"
import { Link } from "react-router-dom"

export function HomeAdm() {
    document.title = "INCC Administração"
    return (
        <>
            <ButtonCenter
                logoutBtn={true}
            />
            <div className="home-adm">
                <Link to={"/admin/artigos"}> <GrArticle /> Artigos </Link>
                <Link to={"/admin/medicos"}> <FaUserDoctor /> Médicos </Link>
                <Link to={"/admin/produtos"}> <FaProductHunt /> Produtos </Link>
            </div>
        </>
    )
}
