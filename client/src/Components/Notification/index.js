import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles(theme=>({
    root:{
        top:theme.spacing(9)
    }
}))

const Notification = (props) => {

    const {notify,setNotify} = props;
    const handleClose = (event,reason)=>{
        setNotify({
            ...notify,
            isOpen:false
        })
    
    }
    const classes = useStyles();
    return (
        <Snackbar
        className={classes.root}
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{vertical:'top',horizontal:'right'}}
        onClose={handleClose}
        >
        <Alert onClose={handleClose} severity={notify.type}>{notify.message}</Alert>
        </Snackbar>
        
    )
}

export default Notification;
