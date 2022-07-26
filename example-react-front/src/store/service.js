import axios from "axios"

const idGen = () => { return crypto.randomUUID() }
const backendUrl = process.env.REACT_APP_BACKEND_URL

const service = {
    createUser: (userName) => {
        return axios.post(backendUrl + 'users/create', { id: idGen(), name: userName })
    },
    getUsersList: () => {
        return axios.get(backendUrl + "users")
    },
    editUser: (userId, userName) => {
        return axios.put(backendUrl + 'users/edit/' + userId, { id: userId, name: userName })
    },
    deleteUser: (userId) => {
        return axios.delete(backendUrl + "users/delete/" + userId)
    },
    createContactInfo: (type, userId, info) => {
        console.log(userId)
        return axios.post(backendUrl + 'contacts/', { id: idGen(), type: type, userId: userId, info: info })
    },
    getUserContactList: (userId) => {
        return axios.get(backendUrl + "contacts/" + userId)
    },
    getAllContacts: (userId) => {
        return axios.get(backendUrl + "contacts")
    },
    editContactInfo: (contactId, info, type, userId) => {
        return axios.put(backendUrl + 'contacts/edit/' + contactId,
            { id: contactId, userId: userId, info: info, type: type })
    },
    deleteContact: (contactId) => {
        return axios.delete(backendUrl + 'contacts/delete/' + contactId)
    }
}
export default service