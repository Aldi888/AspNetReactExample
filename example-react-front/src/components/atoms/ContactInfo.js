import { Chip, IconButton, Input, Stack, TextField } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import PhoneIcon from '@mui/icons-material/Phone';
import WppIcon from '@mui/icons-material/WhatsappOutlined';
import WebIcon from '@mui/icons-material/Web';
import { useState } from "react";


const iconType = {
    0: <EmailOutlinedIcon />,
    1: <PhoneIcon />,
    2: <WppIcon />,
    3: <WebIcon />,
}

function ContactInfo(props) {
    const [workflow, setWorkflow] = useState("default")
    const [info, setInfo] = useState(props.info)

    useState(() => { }, [workflow, info])

    const doneClick = () => {
        if (workflow === "edit")
            props.onEdit(props.id, info, props.userId, props.type)
        else
            props.onDelete(props.id)
        setWorkflow("default")
    }

    const cancelClick = () => {
        setWorkflow("default")
        setInfo(props.info)
    }

    const infoTextChanged = (e) => {
        setInfo(e.target.value)
    }

    return (
        <Chip icon={iconType[props.type]}
            label={workflow === "edit" ? <Input sx={{
                maxWidth: 100,
                outline: "none",
                border: "none"
            }} value={info} onChange={infoTextChanged} /> : props.info}
            onDelete={() => {}}
            clickable
            onClick={() => {setWorkflow("edit")}}
            deleteIcon={workflow === "default" ?<Stack> <IconButton onClick={() => {setWorkflow("delete")}}> <DeleteIcon /> </IconButton></Stack> :
                <Stack direction="row"><DoneIcon onClick={doneClick} /> <CancelIcon onClick={cancelClick}/> </Stack>} />
    )
}

export default ContactInfo;