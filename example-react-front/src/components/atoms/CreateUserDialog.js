import { useState } from "react";
import {Dialog, DialogTitle, DialogContent, TextField, Button, DialogContentText, DialogActions} from "@mui/material"

export default function CreateUserDialog(props) {

    const [name, setName] = useState("")

    const textFieldChange = (e) => {
        setName(e.target.value)
    }

    const closeDialog = () => { props.close(false) }
    const submitDialog = () => { props.submit(name) }

    return (
        <Dialog open={props.open} onClose={closeDialog}>
        <DialogTitle>Create new user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Inser the name of the user you want to create
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User name"
            type="text"
            fullWidth
            variant="standard"
            onChange={textFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={submitDialog}>Create</Button>
        </DialogActions>
      </Dialog>
    )
}