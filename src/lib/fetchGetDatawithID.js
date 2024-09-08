import { db } from "../FirebaseConfig"

export async function fetchGetDatawithID(props) {
    const {collectionName, id} = props

    try {
        const docRef = db.collection(collectionName).doc(id)
        const doc = await docRef.get()

        if (doc.exists) {
            const data = doc.data()
            return data
        } else {
            alert("Dado não encontrado!")
        }
        
    } catch (error) {
        alert(`Erro ao buscar os dados: ${error.message}`)
    }
}