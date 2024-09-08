export function fetchUpdateWithID(docRef) {
    try {
        let newProductID = docRef.id
        docRef.update({id: newProductID})
        return true
    } catch (error) {
        return false
    }
}