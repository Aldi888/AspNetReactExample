import { useState } from "react";
import {Dialog, DialogTitle, DialogContent, TextField, Button, DialogContentText, DialogActions, Select, MenuItem} from "@mui/material"

//could parametrize to only one dialog by setting fields dynamically
export default function CreateContactInfoDialog(props) {

    const [info, setInfo] = useState(0)
    const [type, setType] = useState("")

    const textFieldChange = (e) => {
        setInfo(e.target.value)
    }

    const selectTypeChange = (e) => {
        setType(e.target.value)
    }

    const closeDialog = () => { props.close(false) }
    const submitDialog = () => { props.submit(props.userId ,type, info) }

    return (
        <Dialog open={props.open} onClose={closeDialog}>
        <DialogTitle>Create contact for this user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insert contact info
                </DialogContentText>
                <Select onChange={selectTypeChange} value={type} placeholder="type">
                    <MenuItem value={0}>Email</MenuItem>
                    <MenuItem value={1}>Phone</MenuItem>
                    <MenuItem value={2}>Whatsapp</MenuItem>
                    <MenuItem value={3}>Other</MenuItem>
                </Select>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Contact info"
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