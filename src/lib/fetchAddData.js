import { db } from "../FirebaseConfig"

export async function fetchAddData(props) {
    let { collectionName, newData } = props

    try {
        let docRef = await db.collection(collectionName).add(newData)
        return docRef
    } catch (error) {
        throw new Error(`Erro no Firestore: ${error}`)
    }
}