import { db } from "../FirebaseConfig"

export async function fetchGetData(collectionName) {
    try {
        let dataRef = db.collection(collectionName)
        let dataSnapShot = await dataRef.orderBy("position").get()
        let data = dataSnapShot.docs.map((doc) => doc.data())
        return data
    } catch (error) {
        return error
    }
}