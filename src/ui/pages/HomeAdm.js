import "./styles/homeadm.styles.css"
import { Link } from "react-router-dom"
import { GrArticle } from "react-icons/gr"
import { FaUserDoctor } from "react-icons/fa6"
import { FaProductHunt } from "react-icons/fa"
import { ButtonCenter } from "../components/ButtonCenter"

export function HomeAdm() {
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
