import React, { useState, useEffect } from 'react'
import './AddInvoiceForm.scss'
import { fetchcustomernames } from '../../Api'

import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'

import { useHistory } from 'react-router-dom';
import {
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import {
    TimePicker,
    DatePicker,
    DateTimePicker,
} from 'formik-material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";
// import UnitData from './UnitData';
// import HSN_CodeData from './HSN_CodeData';
// import CategoryData from './CategoryData';
// import AccountData from './AccountData';
// import PrefferedVendor from './PrefferedVendor';
// import Interstate_Taxrates from './Interstate_Taxrates';
// import Intrastate_Taxrates from './Intrastate_Taxrates';
import TermsData from './TermsData';

import Notification from '../Notification';
import AddInvoiceTable from '../invoiceTable';


import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, MenuItem, TextField as TF, FormControlLabel, Checkbox } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from "formik-material-ui-lab";
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';

import axios from "axios";
import { set } from 'mongoose';

const AddInvoiceForm = ({ editRecordData, handleAdditemToggle, updateProductData }) => {
    const [sales_checked, setsales] = useState(true)
    const [purchase_checked, setpurchase] = useState(true)
    const [track_inventory_checked, settrackinventory] = useState(false)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [isEditData, setIsEditData] = useState(false)
    const [addbutton_disabled, enable_addbutton] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [customer_id , setCustomerId] = useState("")

    const[products_data,setProductsData]=useState([])

    const [customer_data, setCustomerData] = useState([])
    const history = useHistory();
    editRecordData = null;





    useEffect(() => {
        if (editRecordData != null) {
            setIsEditData((prev_value) => (!prev_value))
        }
    }, [editRecordData])

    const fetchAPI = async () => {
        setCustomerData(await fetchcustomernames());

    }

    useEffect(() => {
        fetchAPI();
    }, []);





    var initialValues = {

        customer_name: editRecordData ? editRecordData.customer_name : '',
        invoice_number: editRecordData ? editRecordData.invoice_number : '',
        order_number: editRecordData ? editRecordData.order_number : '',
        invoice_date: editRecordData ? editRecordData.invoice_date : new Date(),
        invoice_terms: editRecordData ? editRecordData.invoice_terms : '',
        invoice_due_date: editRecordData ? editRecordData.invoice_due_date : new Date(),
        items: editRecordData ? editRecordData.items : [],




        // editRecord_id: editRecordData ? editRecordData._id : '',
        // action: null
    }

    return (
        <>

            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validate={(values) => {
                    const errors = {};

                    //validation for name

                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        resetForm();
                        values.items=[...products_data]
                        values.customer_id = customer_id;
                        console.log('customer_id : '+customer_id);
                        alert(JSON.stringify(values, null, 2))
                        console.log(JSON.stringify(values, null, 2))

                        axios({
                            url: "http://localhost:5000/invoice/",
                            method: "POST",
                            data: values
                        }).then(function (response) {
                                console.log(response.data);
                                console.log(response.status);
                            }).catch((err) => (console.log(err)))
                        setNotify({
                            isOpen: true,
                            message: "Invoice Added Successfully",
                            type: 'success'
                        })

                        // if (values.action === 'Add') {
                        //     axios({
                        //         url: "http://localhost:5000/items/",
                        //         method: "POST",
                        //         data: values
                        //     })
                        //         .then(function (response) {
                        //             console.log(response.data);
                        //             console.log(response.status);
                        //         })

                        //         .catch((err) => (console.log(err)))
                        //     setNotify({
                        //         isOpen: true,
                        //         message: "Item Added Successfully",
                        //         type: 'success'
                        //     })
                        // }
                        // else {
                        //     axios({
                        //         url: "http://localhost:5000/items/" + values.editRecord_id,
                        //         method: "PUT",
                        //         data: values
                        //     })
                        //         .then(function (response) {
                        //             console.log(response.data);
                        //             console.log(response.status);
                        //         })
                        //         .catch((err) => (console.log(err)))
                        //     setNotify({
                        //         isOpen: true,
                        //         message: "Item Updated Successfully",
                        //         type: 'success'
                        //     })
                        // }
                    }, 500);

                    // setOpenPopUp(true)
                }}
            >
                {({ submitForm, isSubmitting, touched, errors, setFieldValue, values }) => (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Form className='form_invoice-box'>
                            <div className='form_invoice-box-col1'>

                                <Button
                                    variant="contained"
                                    className='margin-bottom'
                                    color="secondary"
                                // onClick={() => {
                                //     handleAdditemToggle((prev_value) => (!prev_value))
                                //     axios({
                                //         url: "http://localhost:5000/items/",
                                //         method: "GET"
                                //     })
                                //         .then((res) => { updateProductData(res.data) })
                                //         .catch((err) => (console.log(err)))
                                // }}
                                > <KeyboardBackspaceOutlinedIcon /> Back</Button>

                                <Field
                                    
                                    name="customer_name"
                                    component={Autocomplete}
                                    options={customer_data}
                                    getOptionLabel={(option) => option.name? option.name : ""}
                                    onChange={(event, newValue) => {
                                        if(newValue){
                                            setCustomerId(newValue.customer_id);
                                        }
                                        
                                      }
                                      }


                                    renderInput={(params) => (

                                        <TF {...params} 
                                        inputprops={{ style: { fontSize: 20 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }} 
                                        className='field'
                                        label="Customer Name" 
                                        variant="standard" 
                                        helperText='Select Customer' />

                                    )}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => {
                                        const path = '/sales/addcustomer'
                                        history.push(path)
                                    }}
                                    startIcon={<AddIcon />}
                                >
                                    New Customer
                                </Button>

                                <Field className='field'
                                    component={TextField}
                                    type="text"
                                    label="Order Number"
                                    name="order_number"
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                />
                                 <Field className='field'
                                    component={TextField}
                                    type="text"
                                    label="Invoice Number"
                                    name="invoice_number"
                                    className='field'
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                />
                                 <Field className='field'
                                    component={DatePicker}
                                    name="invoice_date"
                                    className='field'
                                    label="Invoice Date"
                                    minDate={new Date()}
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                />
                                     <Field className='field'
                                    component={DatePicker}
                                    name="invoice_due_date"
                                    label="Due Date"
                                    className='field'
                                    minDate={new Date()}
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                />
                                 <Field
                                    component={TextField}
                                    type="text"
                                    label='Terms'
                                    name='invoice_terms'
                                    className='field'
                                    select
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}>

                                    {TermsData.map((data, index) => (
                                        <MenuItem key={index} value={data}>
                                            {data}
                                        </MenuItem>
                                    ))}
                                    </Field>

                                  

                            </div>
                            {isSubmitting && <LinearProgress />}

                            <div className='form_invoice-box-col2'>
                             <AddInvoiceTable setProductsData={setProductsData}></AddInvoiceTable>
                             <Button
                                    className={['field', 'button'].join('')}
                                    variant="contained"
                                    color="primary"
                                    // style={{width:'40%'}}
                                    onClick={(e) => {
                                        submitForm()
                                        // setFieldValue("action", "Add")
                                    }}
                                    disabled={isSubmitting}
                                    inputProps={{ style: { fontSize: 22 } }}
                                    InputLabelProps={{ style: { fontSize: 22 } }}
                                >
                                    Add Invoice
                            </Button>

                             
                            </div>
                            
                        
                
                 </Form>

                </MuiPickersUtilsProvider>



                )}
            </Formik>

            
           
                
            {/* <Notification
                notify={notify}
                setNotify={setNotify}
            >
            </Notification> */}

        </>
    )
}

export default AddInvoiceForm;
