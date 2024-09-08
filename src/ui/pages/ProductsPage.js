import "./styles/adm_styles.css"
import { ButtonCenter } from "../components/ButtonCenter"
import { CiCirclePlus } from "react-icons/ci"
import { useState, useEffect } from "react"
import { ModalAdm } from "../components/ModalAdm"

import { fetchAddData } from "../../lib/fetchAddData"
import { fetchUpdateWithID } from "../../lib/fetchUpdateWithID"
import { fetchUploadFile } from "../../lib/fetchUploadFile"
import { fetchDeleteData } from "../../lib/fetchDeleteData"
import { fetchGetData } from "../../lib/fetchGetData"
import { fetchGetDatawithID } from "../../lib/fetchGetDatawithID"
import { fetchUpdateData } from "../../lib/fetchUpdateData"

import { FaRegTrashAlt } from "react-icons/fa"
import { FaPencilAlt } from "react-icons/fa"

const collectionName = "products"

const initalStateFormData = {
    position: "1",
    name: "",
    especiality: "",
    descrip: "",
    img: "",
}

const FormAddDoctors = ({ onClose, revalidateData }) => {
    const [formData, setFormData] = useState(initalStateFormData)
    const [image, setImage] = useState(null)

    function handleInputChange(e) {
        let { name, value } = e.target
        setFormData((prevClass) => ({ ...prevClass, [name]: value }))
    }

    function handleSelectedImage(e) {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        } else {
            setImage(null)
        }
    }

    function resetInputs() {
        setFormData(initalStateFormData)
        setImage(null)
    }

    function dataValidator() {
        if (formData.name && formData.descrip && formData.especiality && formData.position && image) {
            return true
        }
        return false
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const validadeData = dataValidator()

        if (!validadeData) {
            alert("Verique todos os campos antes de prosseguir")
            return
        }

        try {

            let docRef = await fetchAddData({
                collectionName: collectionName, newData: formData
            })

            let updateID = fetchUpdateWithID(docRef)

            let uploadedImage

            if (image) {
                uploadedImage = await fetchUploadFile({
                    docRef: docRef, image: image, tagImg: "img"
                })
            }

            if (docRef && updateID && uploadedImage) {
                onClose()
                resetInputs()
                revalidateData()
                alert("Cadastrado com Sucesso")
            }

        } catch (error) {
            alert(error)
        }
    }

    return (
        <form className="form_admin" onSubmit={handleSubmit}>
            <h2>Criar novo produto</h2>
            <input
                type="text"
                placeholder="Nome"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Especialidade"
                name="especiality"
                value={formData.especiality}
                onChange={handleInputChange}
            />
            <textarea
                placeholder="Descrição"
                name="descrip"
                value={formData.descrip}
                onChange={handleInputChange}
            />
            <div className="box_position">
                <p>Posição:</p>
                <input
                    type="number"
                    placeholder="Posição"
                    name="position"
                    onChange={handleInputChange}
                    value={formData.position}
                    min={0}
                />
            </div>
            <label>
                <p> {image ? "Imagem Anexada" : "Anexar Imagem"} </p>
                <input className="input_file" type="file" onChange={handleSelectedImage} />
            </label>
            <button type="submit"> Adicionar </button>
        </form>
    )
}

const EditItem = ({ id, revalidateData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const FormIdit = ({ onClose }) => {
        const [formData, setFormData] = useState(initalStateFormData)
        const [image, setImage] = useState(null)

        useEffect(() => {
            async function fetchData() {
                let data = await fetchGetDatawithID({
                    collectionName: collectionName,
                    id: id
                })
                setFormData(data)
            }
            fetchData()
        }, [])

        function handleInputChange(e) {
            let { name, value } = e.target
            setFormData((prevClass) => ({ ...prevClass, [name]: value }))
        }

        function handleSelectedImage(e) {
            if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0])
            } else {
                setImage(null)
            }
        }

        function resetInputs() {
            setFormData(initalStateFormData)
            setImage(null)
        }

        function dataValidator() {
            if (formData.name && formData.descrip && formData.especiality && formData.position) {
                return true
            }
            return false
        }

        async function handleSubmit(e) {
            e.preventDefault()
            const validadeData = dataValidator()

            if (!validadeData) {
                alert("Verique todos os campos antes de prosseguir")
                return
            }

            try {
                await fetchUpdateData({
                    id: id,
                    data: formData,
                    collectionName: collectionName
                })
                resetInputs()
                onClose()
                revalidateData()
                alert("Atualizado")          
            } catch (error) {
                alert("erro:", error)
            }
        }

        return (
            <form className="form_admin" onSubmit={handleSubmit}>
                <h2>Editar: {id}</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Especialidade"
                    name="especiality"
                    value={formData.especiality}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder="Descrição"
                    name="descrip"
                    value={formData.descrip}
                    onChange={handleInputChange}
                />
                <div className="box_position">
                    <p>Posição:</p>
                    <input
                        type="number"
                        placeholder="Posição"
                        name="position"
                        onChange={handleInputChange}
                        value={formData.position}
                        min={0}
                    />
                </div>
                <img src={formData.img} width={200} alt="imagem"/>
                <label>
                    <p> {image ? "Nova imagem anexada" : "Anexar nova imagem"} </p>
                    <input className="input_file" type="file" onChange={handleSelectedImage} />
                </label>
                <button type="submit"> Salvar </button>
            </form>
        )
    }

    return (
        <>
            <buton className="btn_acction_adm" onClick={() => setIsModalOpen(true)}>
                <FaPencilAlt />
            </buton>
            {isModalOpen && <ModalAdm content={<FormIdit />} onClose={() => setIsModalOpen(false)} />}
        </>
    )
}

export const ProductsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [docsData, setDocsData] = useState([])
    const [ att, setAtt ] = useState(false)

    function revalidateData() {
        setAtt(!att)
    }

    useEffect(() => {
        async function fetchData() {
            let data = await fetchGetData(collectionName)
            setDocsData(data)
        }
        fetchData()
    }, [att])

    function handleDeleteData(props) {
        let response = window.confirm("Tem certeza de que deseja excluir?")
        if (response) {
            try {
                fetchDeleteData(props)
            } catch (error) {
                alert("Erro:", error)
                return
            }
            setDocsData(docsData.filter(doc => doc.id !== props.id))
            alert("Excluido")
        }
    }

    return (
        <>
            <ButtonCenter
                goBackBtn={true}
            />
            <div className="div_adm">
                <button className="add_btn" onClick={() => setIsModalOpen(true)}>
                    Adicionar
                    <CiCirclePlus />
                </button>
                <div className="container_items">
                    {docsData.map((item) => (
                        <div className={"item_container_doctors"} key={item.id}>
                            <div className={"data_doc"}>
                                <p className={"name"}>{item.name}</p>
                                <p className={"especiality"}><strong>{item.especiality}</strong></p>
                                <p className={"descrip"}>{item.descrip}</p>
                            </div>
                            <img src={item.img} alt={item.name} width={190} />
                            <div className="btn_container">
                                <EditItem id={item.id} revalidateData={revalidateData} />
                                <buton
                                    className="btn_acction_adm"
                                    onClick={() => handleDeleteData({
                                        collectionName: collectionName,
                                        id: item.id,
                                        img: item.img,
                                    })}
                                >
                                    <FaRegTrashAlt />
                                </buton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && <ModalAdm content={<FormAddDoctors revalidateData={revalidateData} />} onClose={() => setIsModalOpen(false)} />}
        </>
    )
}
