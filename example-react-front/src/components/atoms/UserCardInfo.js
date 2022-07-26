import { Card, Collapse, CardHeader, CardContent, Avatar, IconButton, TextField, Fab } from "@mui/material";
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { red } from "@mui/material/colors"
import { useEffect, useState } from "react";
import ContactInfo from "./ContactInfo";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function UserCardInfo(props) {
    const [expanded, setExpanded] = useState(false);
    const [workflow, setWorkflow] = useState("default")
    const [name, setName] = useState(props.user.name)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleEditClick = () => {
        setWorkflow("edit")
    }
    const handleRemoveClick = () => {
        setWorkflow("remove")
    }
    const handleCancelClick = () => {
        setWorkflow("default")
        setName(props.user.name)
    }

    const handleEditNameChange = (e) => {
        setName(e.target.value)
    }

    const addContactClick = () => {
        props.addContactClick(props.user.id)
    }

    const doneClick = () => {
        if (workflow === "edit")
            props.onEdit(props.user.id, name)
        else
            props.onDelete(props.user.id)
        setWorkflow("default")
    }

    useEffect(() => {
    }, [workflow])


    return (
        <Card >
            <CardHeader
                avatar={<Avatar onClick={handleExpandClick} sx={{ bgcolor: red[500] }} >{name[0].toUpperCase()}</Avatar>}
                title={workflow === "edit" ? <TextField value={name} onChange={ handleEditNameChange }/> : <label>{name}</label> } // ok aqui colocar ngc de alterar nome
                action={
                    <Stack direction="row">
                        {workflow === "default" ?<><IconButton onClick={handleEditClick}><EditIcon /></IconButton>
                            <IconButton onClick={handleRemoveClick}> <DeleteIcon  sx={{ color: red[500] }}/> </IconButton></>
                            : <><IconButton onClick={doneClick}><DoneIcon /></IconButton>
                                <IconButton onClick={handleCancelClick}>
                                    <CloseIcon  sx={{color: red[500]}}/>
                                </IconButton></>}

                        <ExpandMore expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more">
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </Stack>
                }

            />
            <Collapse in={expanded} unmountOnExit>
                <CardContent>
                    <Stack direction="row" spacing={1}> { props.contactList } </Stack>
                    <Fab
                        onClick={addContactClick}
                        sx={{
                            float:"right",
                            width: 34,
                            height: 30,
                            marginBottom: 3
                        }}
                    ><AddIcon /></Fab>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default UserCardInfo;