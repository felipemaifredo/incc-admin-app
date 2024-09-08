import ReactDOM from "react-dom"
import { RiCloseLargeLine } from "react-icons/ri"
import { useState } from "react"
import React from "react"

export const ModalAdm = ({ onClose, content }) => {
    const [isExiting, setIsExiting] = useState(false)

    function handleClickOverlay() {
        const confirm = window.confirm("Tem certeza de que deseja cancelar? Não será possível recuperar os dados.")
        if (confirm) {
            setIsExiting(true)
            setTimeout(onClose, 300)
        }
    }

    return ReactDOM.createPortal(
        <div
            className={`modal_overlay ${isExiting ? "fade_out" : ""}`}
            onClick={handleClickOverlay}
        >
            <div
                className={`modal_content ${isExiting ? "slide_out" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal_close">
                    <button onClick={handleClickOverlay}>
                        <RiCloseLargeLine />
                    </button>
                </div>
                <div>
                    {React.cloneElement(content, { onClose })}
                </div>
            </div>
        </div>,
        document.body
    )
}