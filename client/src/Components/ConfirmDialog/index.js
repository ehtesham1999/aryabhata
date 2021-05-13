import React from 'react'
import {Dialog, DialogActions, DialogContent,DialogTitle, Typography} from '@material-ui/core'
import Button from "@material-ui/core/Button";


const ConfirmDialog = (props) => {
    const {confirmDialog,setConfirmDialog} = props;
    return (
        <Dialog open={confirmDialog.isOpen}>
            <DialogTitle>
                
            </DialogTitle>

            <DialogContent>
                <Typography variant='h6'>{confirmDialog.title}</Typography>
                <Typography variant='subtitle'>{confirmDialog.subTitle}</Typography>
            </DialogContent>
           

            <DialogActions>
            <Button 
            variant="outlined" 
            onClick={()=>{setConfirmDialog({...confirmDialog,isOpen: false})}}
            >No</Button>
            <Button
            variant="contained" 
            color="secondary" 
            onClick={confirmDialog.onConfirm}>Yes</Button>
            </DialogActions>

        </Dialog>
    )
}

export default ConfirmDialog;
