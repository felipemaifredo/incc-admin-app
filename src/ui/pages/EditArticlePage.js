import "./styles/adm_styles.css"
import { ButtonCenter } from "../components/ButtonCenter"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "react-quill/dist/quill.snow.css"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import ReactQuill from "react-quill"
import { db } from "../../FirebaseConfig"
import { fetchGetData } from "../../lib/fetchGetData"

export const EditArticlePage = () => {
    const { id } = useParams() // Assumindo que o ID do artigo vem da URL
    const [articleContent, setArticleContent] = useState("")
    const [title, setTitle] = useState("")
    const [docsData, setDocsData] = useState([])
    const [author, setAuthor] = useState(docsData.length > 0 ? docsData[0].name : '')
    const [isLoading, setIsLoading] = useState(false)

    // Função para buscar o artigo com base no ID
    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return

            const docRef = doc(db, "articles", id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const article = docSnap.data()
                setTitle(article.title)
                setAuthor(article.author)
                setArticleContent(article.content) // Preenche o editor com o conteúdo HTML
            } else {
                console.error("Artigo não encontrado!")
            }
        }

        async function fetchData() {
            let data = await fetchGetData("doctors")
            setDocsData(data)
        }
        
        fetchData()
        fetchArticle()
    }, [id])

    // Função para atualizar o artigo no Firestore
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const docRef = doc(db, "articles", id)
            await updateDoc(docRef, {
                title,
                author,
                content: articleContent,
                updatedAt: new Date(), // Armazena a data de atualização
            })

            alert("Artigo atualizado com sucesso!")
        } catch (error) {
            console.error("Erro ao atualizar o artigo:", error)
            alert("Erro ao atualizar o artigo.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <ButtonCenter
                goBackBtn={true}

            />

            <div className="div_adm_edit_v">
                <h2>Editar Artigo id: {id}</h2>
                <form className="form_admin" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título do Artigo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label className="docs_label_select" htmlFor="doctos">Selecione o Médico:
                        <select 
                            name="author" 
                            id="doctos"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        >
                            {docsData.map((doc) => (
                                <option key={doc.id} value={doc.name}>
                                    {doc.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <ReactQuill
                        value={articleContent}
                        onChange={setArticleContent}
                        theme="snow"
                        placeholder="Edite seu artigo aqui..."
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Atualizando..." : "Atualizar Artigo"}
                    </button>
                </form>
            </div>
        </>
    )
}
