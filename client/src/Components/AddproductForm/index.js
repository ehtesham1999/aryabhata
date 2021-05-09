import React, { useState } from 'react'
import './AddproductForm.scss'

import UnitData from './UnitData';
import HSN_CodeData from './HSN_CodeData';
import CategoryData from './CategoryData';
import AccountData from './AccountData';
import PrefferedVendor from './PrefferedVendor';
import Interstate_Taxrates from './Interstate_Taxrates';
import Intrastate_Taxrates from './Intrastate_Taxrates';



import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, MenuItem, TextField as TF, FormControlLabel, Checkbox } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from "formik-material-ui-lab";
import axios from "axios";


const AddproductForm = () => {
    const [sales_checked, setsales] = useState(true)
    const [purchase_checked, setpurchase] = useState(true)
    const [track_inventory_checked, settrackinventory] = useState(false)
    const toggle_track = () => settrackinventory(!track_inventory_checked)
    const toggle_sales = () => setsales(!sales_checked)
    const toggle_purchase = () => setpurchase(!purchase_checked)
    return (
        <>
            <Formik
                initialValues={{
                    type: '',
                    name: '',
                    SKU: '',
                    unit: '',
                    HSN_Code: '',
                    tax_preference: '',
                    category: '',
                    selling_price: '',
                    sales_account: '',
                    sales_description: '',
                    cost_price: '',
                    purchase_account: '',
                    purchase_description: '',
                    intra_tax_rate: '',
                    inter_tax_rate: '',
                    opening_stock:'',
                    reorder_point:'',
                    opening_stock_rateperunit:'',
                    preferred_vendor:'',
                    inventory_account:''

                }}
                validate={(values) => {
                    const errors = {};
                    
                    //validation for name
                    if (!values.name) {
                        errors.name = 'Name Required';
                    }
                    if(!values.SKU){
                        errors.SKU = 'SKU required';
                    }
                    //validation for hsn code
                    if (!values.HSN_Code) {
                        errors.HSN_Code = 'HSN code Required'
                    }
                    //validation for tax prefences
                    if (!values.tax_preference) {
                        errors.tax_preference = 'tax prefences required'
                    }
                    //validation for units
                    if (!values.unit) {
                        errors.unit = 'unit required'
                    }
                    //validation for categories
                    if (!values.category) {
                        errors.category = 'category required'
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        console.log(values);
                        console.log(JSON.stringify(values,null,2))
                        alert(JSON.stringify(values, null, 2));



                        axios({
                            url:"http://localhost:5000/items/",
                            method:"POST",
                            data:values
                        })
                        .then(function(response) {
                            console.log(response.data);
                            console.log(response.status);
                          })
        
                        .catch((err)=>(console.log(err)))
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting, touched, errors }) => (


                    <Form className='form-box'>
                        <div className='form-box-col1'>

                            <Field
                                component={TextField}
                                type="text"
                                name="type"
                                className='field'
                                label="Product Type"
                                select
                                variant="standard"
                                helperText="Type of product"
                                margin="normal"
                                inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                            >

                                <MenuItem value='Goods'> Goods</MenuItem>
                                <MenuItem value='Services'> Services</MenuItem>

                            </Field>


                            <Field className='field'
                                component={TextField}
                                type="text"
                                label="Product Name"
                                name="name"
                                inputProps={{ style: { fontSize: 25 } }}
                                InputLabelProps={{ style: { fontSize: 20 } }}
                            />

                            <Field className='field'
                                component={TextField}
                                type="text"
                                label="SKU"
                                name="SKU"
                                inputProps={{ style: { fontSize: 25 } }}
                                InputLabelProps={{ style: { fontSize: 20 } }}
                            />

                            <Field
                                component={TextField}
                                type="text"
                                name="unit"
                                className='field'
                                label="Unit"
                                select
                                variant="standard"
                                margin="normal"
                                inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                            >
                                {UnitData.map((data, index) => (
                                    <MenuItem key={index} value={data}>
                                        {data}
                                    </MenuItem>
                                ))}
                            </Field>



                            <Field
                                component={TextField}
                                type="text"
                                name="category"
                                className='field'
                                label="Category"
                                select
                                variant="standard"
                                margin="normal"
                                inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                            >
                                {CategoryData.map((data, index) => (
                                    <MenuItem key={index} value={data}>
                                        {data}
                                    </MenuItem>
                                ))}
                            </Field>

                            <Field
                                component={TextField}
                                type="text"
                                name="inventory_account"
                                className='field'
                                label="Inventory Account"
                                select
                                variant="standard"
                                margin="normal"
                                inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                            >
                                {AccountData.map((data, index) => (
                                    <MenuItem key={index} value={data}>
                                        {data}
                                    </MenuItem>
                                ))}
                            </Field>
                            
                            <Field
                                component={TextField}
                                type="text"
                                name="tax_preference"
                                className='field'
                                label="tax preference"
                                select
                                variant="standard"
                                helperText="tax preference"
                                margin="normal"
                                inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                            >

                                <MenuItem value='Taxable'> Taxable</MenuItem>
                                <MenuItem value='Non-Taxable'> Non-Taxable</MenuItem>

                            </Field>
                        
                        </div>
                        {isSubmitting && <LinearProgress />}

                        <div className='form-box-col2'>


                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={sales_checked}
                                        onChange={() => toggle_sales()}
                                        color="primary"
                                    />
                                }
                                label="Sales Information"
                            />

                            {sales_checked &&
                                <>

                                    <Field className='field'
                                        component={TextField}
                                        type="number"
                                        label="Selling Price"
                                        name="selling_price"
                                        inputProps={{ style: { fontSize: 25 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                    />

                                    <Field
                                        component={TextField}
                                        type="text"
                                        name="sales_account"
                                        className='field'
                                        label="Account"
                                        select
                                        variant="standard"
                                        margin="normal"
                                        inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                        InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                                    >
                                        {AccountData.map((data, index) => (
                                            <MenuItem key={index} value={data}>
                                                {data}
                                            </MenuItem>
                                        ))}
                                    </Field>

                                    <Field className='field'
                                        component={TextField}
                                        multiline
                                        rowsMax={3}
                                        name="sales_description"
                                        type="text"
                                        label="Description"
                                        inputProps={{ style: { fontSize: 20 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                    />
                                </>}
                                <Field
                                name="HSN_Code"
                                component={Autocomplete}
                                options={HSN_CodeData}
                                getOptionLabel={(option) => option}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TF {...params} label="HSN Code" variant="outlined" />
                                )}
                            />
                             <p className='tax'>Default Tax Rates</p>
                            <Field
                                component={TextField}
                                type="text"
                                name="inter_tax_rate"
                                className='field'
                                label="Inter State Tax Rate"
                                select
                                variant="standard"
                                margin="normal"
                                inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                            >
                                {Interstate_Taxrates.map((data, index) => (
                                    <MenuItem key={index} value={data}>
                                        {data}
                                    </MenuItem>
                                ))}
                            </Field>
                            <Field
                                component={TextField}
                                type="text"
                                name="intra_tax_rate"
                                className='field'
                                label="Intra State Tax Rate"
                                select
                                variant="standard"
                                margin="normal"
                                inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                            >
                                {Intrastate_Taxrates.map((data, index) => (
                                    <MenuItem key={index} value={data}>
                                        {data}
                                    </MenuItem>
                                ))}
                            </Field>

                         


                        </div>
                        <div className='form-box-col3'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={purchase_checked}
                                        onChange={() => toggle_purchase()}
                                        color="primary"
                                    />
                                }
                                label="Purchase Information"
                            />

                            {purchase_checked &&
                                <>

                                    <Field className='field'
                                        component={TextField}
                                        type="number"
                                        label="Cost Price"
                                        name="cost_price"
                                        inputProps={{ style: { fontSize: 25 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                    />

                                    <Field
                                        component={TextField}
                                        type="text"
                                        name="purchase_account"
                                        className='field'
                                        label="Account"
                                        select
                                        variant="standard"
                                        margin="normal"
                                        inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                        InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                                    >
                                        {AccountData.map((data, index) => (
                                            <MenuItem key={index} value={data}>
                                                {data}
                                            </MenuItem>
                                        ))}
                                    </Field>

                                    <Field className='field'
                                        component={TextField}
                                        multiline
                                        rowsMax={3}
                                        name="purchase_description"
                                        type="text"
                                        label="Description"
                                        inputProps={{ style: { fontSize: 20 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                    />
                                </>}


                           

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={track_inventory_checked}
                                        onChange={() => toggle_track()}
                                        color="primary"
                                    />
                                }
                                label="Track Inventory For This Item"
                            />

                            {track_inventory_checked &&
                                <>

                                    <Field className='field'
                                        component={TextField}
                                        type="number"
                                        label="Opening Stock"
                                        name="opening_stock"
                                        inputProps={{ style: { fontSize: 25 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                    />
                                     <Field className='field'
                                        component={TextField}
                                        type="number"
                                        label="Reorder Point"
                                        name="reorder_point"
                                        inputProps={{ style: { fontSize: 25 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                    />
                                     <Field className='field'
                                        component={TextField}
                                        type="number"
                                        label="Opening stock rate per unit item"
                                        name="opening_stock_rateperunit"
                                        inputProps={{ style: { fontSize: 25 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                    />

                                    <Field
                                        component={TextField}
                                        type="text"
                                        name="preferred_vendor"
                                        className='field'
                                        label="Preffered Vendor"
                                        select
                                        variant="standard"
                                        margin="normal"
                                        inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                        InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                                    >
                                        {PrefferedVendor.map((data, index) => (
                                            <MenuItem key={index} value={data}>
                                                {data}
                                            </MenuItem>
                                        ))}
                                    </Field>

                                </>}


                            <Button
                                className={['field', 'button'].join('')}
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                                inputProps={{ style: { fontSize: 22 } }}
                                InputLabelProps={{ style: { fontSize: 22 } }}
                            >
                                Add Product
                            </Button>

                        </div>
                    </Form>


                )}
            </Formik>
        </>
    )
}

export default AddproductForm
