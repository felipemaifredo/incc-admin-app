import "./buttoncenter.adm.styles.css"
import { LogoutButton } from "./LogoutButton"
import { GoBackButton } from "./GoBackButton"

export const ButtonCenter = (props) => {
    const { logoutBtn, goBackBtn } = props

    return (
        <div className="button-center"> 
            { goBackBtn && <GoBackButton /> }
            { logoutBtn && <LogoutButton /> }
        </div>
    )
}