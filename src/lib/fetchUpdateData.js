import { db } from "../FirebaseConfig"

export async function fetchUpdateData(props) {
    const {collectionName, id, data} = props
    try {
        const docRef = db.collection(collectionName).doc(id)
        await docRef.update(data)
        return true
    } catch (error) {
        return error
    }
}