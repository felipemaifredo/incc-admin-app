import "./styles/adm_styles.css"
import { ButtonCenter } from "../components/ButtonCenter"
import React, { useState, useEffect } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css" // Estilos para o editor
import { fetchGetData } from "../../lib/fetchGetData"

import { collection, addDoc } from "firebase/firestore"
import { db } from "../../FirebaseConfig"

const collectionName = "articles"

export const NewArtiglesPage = () => {
    const [articleContent, setArticleContent] = useState("")
    const [title, setTitle] = useState("")
    const [docsData, setDocsData] = useState([])
    const [author, setAuthor] = useState(docsData.length > 0 ? docsData[0].name : '')

    useEffect(() => {
        async function fetchData() {
            let data = await fetchGetData("doctors")
            setDocsData(data)
        }
        fetchData()
    }, [])

    const handleChange = (content) => {
        setArticleContent(content)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            // Salva o artigo no Firestore
            await addDoc(collection(db, collectionName), {
                title,
                author,
                content: articleContent, // Salva o conteúdo HTML
                createdAt: new Date(),
            })

            alert("Artigo salvo com sucesso!")
            setTitle("")
            setAuthor("")
            setArticleContent("")
        } catch (error) {
            console.error("Erro ao salvar o artigo:", error)
            alert("Erro ao salvar o artigo.")
        }
    }

    return (
        <>
            <ButtonCenter
                goBackBtn={true}

            />
            <div className="div_adm">
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
                        onChange={handleChange}
                        theme="snow" // Snow é o tema padrão
                        placeholder="Escreva seu artigo aqui..."
                    />
                    <button type="submit">Salvar Artigo</button>
                </form>
            </div>
        </>
    )
}