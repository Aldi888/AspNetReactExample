import UserCardInfo from "./atoms/UserCardInfo";
import service from "../store/service";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add"
import { Container } from "@mui/system";
import { Fab } from "@mui/material";
import CreateUserDialog from "./atoms/CreateUserDialog";
import ContactInfo from './atoms/ContactInfo'
import methods from "../store/methods";
import CreateContactInfoDialog from "./atoms/CreateContactInfoDialog";

function Main() {
    const [userList, setUserList] = useState([]);
    const [openDialog, setOpenDialog] = useState(false)
    const [openContactDialog, setOpenContactDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState("")


    const refreshData = () => {
        service.getUsersList().then(res => {
            var aux = []
            service.getAllContacts().then(con => {
                console.log(con.data)
                let contacts = con.data.reduce((p, a) => {
                    let aux = p
                    let element = (<ContactInfo
                        key={a.id}
                        type={a.type}
                        userId={a.userId}
                        info={a.info}
                        id={a.id}
                        onDelete={contactDelete}
                        onEdit={contactEdit}
                    />)
                    if (p[a.userId]) aux[a.userId].push(element)
                    else aux[a.userId] = [element]
                    return aux
                }, {})
                res.data.forEach(user => {
                    aux.push(<UserCardInfo key={user.id} user={user} onEdit={userEdit}
                        onDelete={userDelete} addContactClick={addContactClick} contactList={ contacts[user.id] }/>)
                });
                setUserList(aux)
            })
        })
    }

    const addContactClick = (userId) => {
        setSelectedUser(userId)
        setOpenContactDialog(true)
    }

    const dialogSubmit = (name) => {
        methods.createUserDialogConfirm(name).then(() => refreshData()) // can optimize to single call instead of chain call
        setOpenDialog(false)
    }

    const dialogContactSubmit = (userId, type, info) => {
        service.createContactInfo(type, userId, info).then(() => refreshData())
        setOpenContactDialog(false)
    }

    const userEdit = (id, name) => {
        service.editUser(id, name)
    }

    const userDelete = (id) => {
        service.deleteUser(id).then(() => { refreshData()  }) // optimize
    }

    const contactDelete = (id) => {
        service.deleteContact(id).then(() => refreshData())
    }

    const contactEdit = (id, info, userId, type) => {
        service.editContactInfo(id, info, type, userId).then(() => refreshData())
    }

    useEffect(() => {
        refreshData()
    }, [])

    useEffect(() => {
    }, [userList, openDialog, selectedUser])

    return (
        <Container sx={{ position: "relative" }}>
            {userList}
            <Fab onClick={ () => setOpenDialog(true) }
                sx={{
                position: "fixed",
                bottom: 30
            }} color="primary">
                <AddIcon />
            </Fab>
            <CreateUserDialog open={openDialog} close={setOpenDialog}
                submit={dialogSubmit}
            />
            <CreateContactInfoDialog open={openContactDialog} userId={selectedUser} close={setOpenContactDialog} submit={dialogContactSubmit} />
        </Container>
    )
}

export default Main;