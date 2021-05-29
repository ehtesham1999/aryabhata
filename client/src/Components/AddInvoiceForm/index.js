import React, { useState, useEffect } from 'react'
import './AddInvoiceForm.scss'
import { fetchcustomernames } from '../../Api'

import { useHistory } from 'react-router-dom';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
    DatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import UnitData from './UnitData';
// import HSN_CodeData from './HSN_CodeData';
// import CategoryData from './CategoryData';
// import AccountData from './AccountData';
// import PrefferedVendor from './PrefferedVendor';
// import Interstate_Taxrates from './Interstate_Taxrates';
// import Intrastate_Taxrates from './Intrastate_Taxrates';

import Notification from '../Notification';

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
        invoice_date: editRecordData ? editRecordData.invoice_date : '',
        invoice_terms: editRecordData ? editRecordData.invoice_terms : '',
        invoice_due_date: editRecordData ? editRecordData.invoice_due_date : '',




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
                        alert(JSON.stringify(values, null, 2))

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


                    <Form className='form-box'>
                        <div className='form-box-col1'>

                            <Button
                                variant="contained"
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
                                getOptionLabel={(option) => option}


                                renderInput={(params) => (

                                    <TF {...params} label="Customer Name" variant="standard" helperText='Select Customer' />

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






                        </div>
                        {isSubmitting && <LinearProgress />}

                        <div className='form-box-col2'>

                            <Field className='field'
                                component={TextField}
                                type="number"
                                label="Invoice Number"
                                name="invoice_number"
                                inputProps={{ style: { fontSize: 25 } }}
                                InputLabelProps={{ style: { fontSize: 20 } }}
                            />

                           
                              
                           


                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                               
                                   
                                    value={values.invoice_date}
                                    placeholder="dd/mm/yyyy"
                                    onChange={date => setFieldValue('invoice_date',date)}
                                    minDate={new Date()}></DatePicker>
                                    
                           
                           
                            </MuiPickersUtilsProvider>


                               {/* <KeyboardDatePicker
                                    clearable
                                    value={values.invoice_due_date}
                                    placeholder="dd/mm/yyyy"
                                    onChange={date => setFieldValue('invoice_due_date',date)}
                                    minDate={new Date()}
                                    
                                /> */}









                        </div>
                        <div className='form-box-col3'>


                            <Button
                                className={['field', 'button'].join('')}
                                variant="contained"
                                color="primary"
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


                )}
            </Formik>

            <h1>
                code for that table goes here
             </h1>
            {/* <Notification
                notify={notify}
                setNotify={setNotify}
            >
            </Notification> */}

        </>
    )
}

export default AddInvoiceForm;
