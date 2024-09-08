import "./styles/adm_styles.css"
import { ButtonCenter } from "../components/ButtonCenter"
import { CiCirclePlus } from "react-icons/ci"
import { useState } from "react"
import { ModalAdm } from "../components/ModalAdm"

import { fetchAddData } from "../../lib/fetchAddData"
import { fetchUpdateWithID } from "../../lib/fetchUpdateWithID"
import { fetchUploadFile } from "../../lib/fetchUploadFile"

const initalStateFormData = {
    position: "1",
    name: "",
    descrip: "",
    img: "",
}

const FormAddDoctors = ({ onClose }) => {
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

    async function handleSubmit(e) {
        e.preventDefault()

        try {

            let docRef = await fetchAddData({
                collectionName: "doctors", newData: formData
            })

            let updateID = fetchUpdateWithID(docRef)

            let uploadedImage

            if (image) {
                uploadedImage = await fetchUploadFile({
                    docRef: docRef, image: image, tagImg: "img"
                })
            }

            if (docRef && updateID && uploadedImage) {
                alert("Cadastrado com Sucesso")
                onClose()
                resetInputs()
            }
            
        } catch (error) {
            alert(error)
        }
    }

    return (
        <form className="form_admin" onSubmit={handleSubmit}>
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
                <p> { image ? "Imagem Anexada" : "Imagem não anexada" } </p>
                <input className="input_file" type="file" onChange={handleSelectedImage} />
            </label>
            <button type="submit"> Adicionar </button>
        </form>
    )
}

export const DoctorsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

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
                <div>
                </div>
            </div>
            {isModalOpen && <ModalAdm content={ <FormAddDoctors /> } onClose={() => setIsModalOpen(false)} />}
        </>
    )
}
