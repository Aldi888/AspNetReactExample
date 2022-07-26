import service from "./service"

const methods = {
    createUserDialogConfirm: (userName) => {
        return service.createUser(userName)
    }
}

export default methods