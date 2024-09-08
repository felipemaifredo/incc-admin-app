import { fs } from "../FirebaseConfig"

export async function fetchUploadFile(props) {
    let {docRef, image, tagImg} = props

    let storageRef = fs.ref()
    let fileName = new Date().getTime() + "-" + image.name
    try {
        await storageRef.child(fileName).put(image)
        let downloadURL = await storageRef.child(fileName).getDownloadURL()
        await docRef.update({ [tagImg || "img"]: downloadURL })
        return true
    } catch (error) {
        return false
    }
}