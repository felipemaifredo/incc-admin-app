import { db } from "../FirebaseConfig"
import { getStorage, ref, deleteObject } from "firebase/storage"

export async function fetchDeleteData(props) {
    let { collectionName, id, imgLink, imgLink2 } = props
    try {
        const storage = getStorage()
        
        if (imgLink) {
            const imagemRef = ref(storage, imgLink)
            await deleteObject(imagemRef)
        } 

        if (imgLink2) {
            const imagemRef = ref(storage, imgLink2)
            await deleteObject(imagemRef)
        }
        
        await db.collection(collectionName).doc(id).delete()
    } catch (error) {
        alert(error)
    }
}