import "./styles/adm_styles.css"
import { ButtonCenter } from "../components/ButtonCenter"
import { CiCirclePlus } from "react-icons/ci"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { db } from "../../FirebaseConfig"
import { collection, getDocs } from "firebase/firestore"

import { FaRegTrashAlt } from "react-icons/fa"
import { FaPencilAlt } from "react-icons/fa"

import { fetchDeleteData } from "../../lib/fetchDeleteData"

export const ArtiglesPage = () => {
    const [articlesData, setArticlesData] = useState([])

    useEffect(() => {
        async function fetchArticles() {
            const querySnapshot = await getDocs(collection(db, "articles"))
            const articlesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            setArticlesData(articlesList)
        }

        fetchArticles()
    }, [])

    function handleDeleteData(props) {
        let response = window.confirm("Tem certeza de que deseja excluir? Essa ação não poderá ser desfeita.")
        if (response) {
            try {
                fetchDeleteData(props)
            } catch (error) {
                alert("Erro:", error)
                return
            }
            setArticlesData(articlesData.filter(doc => doc.id !== props.id))
            alert("Excluido")
        }
    }

    return (
        <>
            <ButtonCenter
                goBackBtn={true}

            />
            <div className="div_adm">
                <Link to={"/admin/artigos/novo"} className="add_link">
                    Adicionar
                    <CiCirclePlus />
                </Link>
                <div className="container_items">
                    {articlesData.map((article) => (
                        <div className="article_card" key={article.id}>
                            <p>{article.title}</p>
                            <p>{article.author}</p>
                            <p>{Date(article.createdAt)}</p>
                            <div className="btns_container_articles">
                                <Link to={`/admin/artigos/editar/${article.id}`}>
                                    <FaPencilAlt />
                                </Link>
                                <button onClick={() => handleDeleteData({
                                    collectionName: "articles",
                                    id: article.id,
                                })}>
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}