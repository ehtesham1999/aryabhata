import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom';

import '../Pages/PageStyle.scss';
import AddcustomerForm from '../Components/AddcustomerForm'

import UseTable from '../Components/UseTable';
import { fetchcustomerdata } from '../Api';
import '../Pages/PageStyle.scss';


import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Controls from "../Components/controls/Controls";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from '../Components/ConfirmDialog';
import Notification from '../Components/Notification';



import Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { CSVLink, CSVDownload } from "react-csv";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    searchInput: {
        width: '75%'
    }
}))

export const AddCustomer = () => {

    const classes = useStyles();
    const [CustomerData, setCustomerData] = useState([])
    const [Value, setValue] = useState()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [addcustomer_toggle,setAddCustomer_toggle]=useState(false)
    const [recordEdit,setrecordEdit]=useState(null)
    const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''})
    const [notify,setNotify] = useState({isOpen:false,message:'',type:''})
    
    const history = useHistory();

    const fetchAPI = async () => {
        setCustomerData(await fetchcustomerdata());
        
    }
  
    useEffect(() => {
        fetchAPI();
    }, []);
    
    const handleDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
            axios({
                url:"http://localhost:5000/customers/" + id,
                method:"DELETE",
            })
            .then(function(response) {
                console.log(response.data);
                console.log(response.status);
                
                axios({
                    url:"http://localhost:5000/customers/",
                    method:"GET"
                })
                .then((res)=>{setCustomerData(res.data)})
              })
            .catch((err)=>(console.log(err)))

            

            setNotify({
                isOpen:true,
                message:"Deleted Successfully",
                type:'error'
            })
        }




    const headCells = [
        { id: 'name', label: 'NAME' },
        { id: 'companyname', label: 'COMPANY NAME' },
        { id: 'email', label: 'EMAIL' },
        { id: 'workphone', label: 'WORK PHONE',disableSorting: true},
        { id: 'gst_treatment', label: 'GST TREATMENT' },
        { id: 'receivables', label: 'RECEIVABLES' },
        {id:'actions',label:'ACTIONS',disableSorting:true}
    ]


    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = UseTable(CustomerData, headCells, filterFn);

    const handleSearch = (e) => {
        let target = e.target.value;
        console.log(target)
        setValue(target)
        setFilterFn({
            fn: items => {
                if (target.value == "") {
                    return items;
                }

                else {
                    console.log(items.filter(x => x.display_name.includes('a')))
                    return items.filter(x => x.display_name.toLowerCase().includes(target));
                }

            }
        })
    }
    const handleAddCustomer = () => {
        setAddCustomer_toggle((prev_value)=>(!prev_value))
    }
    const handleEdit = (item) => {
        setrecordEdit(item)
        setAddCustomer_toggle((prev_value)=>(!prev_value))
    }

    return (
        <>
        {addcustomer_toggle ? <AddcustomerForm editRecordData={recordEdit} handleAddCustomerToggle={setAddCustomer_toggle} updateCustomerData={setCustomerData} /> 
            :
            <div className='Table'>
                <div className='Table-head'>
                <TextField
                    className={classes.searchInput}
                    variant='outlined'
                    label='Search Customer'
                    value={Value}
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'><Search /></InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
                <Button 
                variant="contained" 
                color="primary"
                startIcon={<AddIcon/>}
                onClick={handleAddCustomer}>
                
                Add Customer 
                </Button>
                
                </div>
                    
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((item,index) => (

                                
                                
                                <TableRow key={index}>
                                    <TableCell >{item.display_name} </TableCell>
                                    <TableCell>{item.company_name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.work_number}</TableCell>
                                    <TableCell>{item.gst_treatment}</TableCell>
                                    <TableCell>{item.payment_terms}</TableCell>
                                    <TableCell>

                                        <Controls.ActionButton
                                        color="primary"
                                        >
                                        <EditOutlinedIcon fontSize="small"
                                         onClick={()=>{handleEdit(item)}}
                                        
                                        />
                                        </Controls.ActionButton>

                                        <Controls.ActionButton
                                        color="secondary"
                                        >
                                        <DeleteIcon fontSize="small"
                                        onClick={()=>{
                                            
                                            setConfirmDialog({
                                                isOpen:true,
                                                title:'Are you sure to delete this record?',
                                                subTitle:" You can't undo this operation",
                                                onConfirm:()=>{handleDelete(item._id)}
                                            })
                                        }}
                                        />
                                        </Controls.ActionButton>


                                        <Controls.ActionButton color="primary">
                                            <VisibilityIcon fontSize="small"
                                            onClick={()=>{
                                                let path = `/sales/customer/overview/${item._id}`;
                                                history.push(path); 
                                            }}
                                            />

                                        </Controls.ActionButton>

                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
                <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                ></ConfirmDialog>
                <Notification
            notify={notify}
            setNotify={setNotify}
            >
            </Notification>           
            </div>

    }
        </>

    )
}
  
