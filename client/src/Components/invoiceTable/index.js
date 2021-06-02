import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Icons from './tableIcons';
import { setQuarter } from 'date-fns';
import { fetchdata } from '../../Api'
import { MenuItem, Select } from '@material-ui/core';
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'

import InputAdornment from '@material-ui/core/InputAdornment';




const itemList = [

]






const AddInvoiceTable = ({ setProductsData }) => {

  const [item_data, setItemData] = useState([])

  const fetchAPI = async () => {
    await fetchdata().then(
      (data) => {
        setItemData(data);
        console.log('Data loaded from useEffect');
        console.log(data);
      }
    );


  }

  useEffect(() => {
    fetchAPI()
  }, []);



  const [data, setData] = useState(itemList);


  const [itemName, setItemName] = useState("");
  const [taxType, setTaxType] = useState("");
  const [itemAmount, setAmount] = useState(0);
  const [itemRate, setRate] = useState(0);
  const [itemQuantity, setQuantity] = useState(0);
  const [discountType, setDiscountType] = useState('number');
  const [discountAmount, setDiscount] = useState(0);
  const [shippingCharges,setShippingCharges] = useState(0);
  const [subTotal , setSubTotal] = useState(0);



  const columns = [
    { title: "ID", field: "id", editable: false },
    {
      title: "Item Details", field: "item_name", editComponent: () => (
        <Autocomplete
          id="item_box"
          value={itemName}
          onChange={(event, newValue) => {

            if (newValue !== null) {
              setItemName(newValue.name)
              setRate(newValue.selling_price)
              setTaxType(newValue.tax_preference)
            }


          }}
          options={item_data}
          getOptionLabel={(option) => option.name ? option.name : ""}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Item Name"  variant="outlined" />}
        />
      )
    },
    {
      title: "Quantity", field: "qty", editComponent: () => (
        <TextField
          value={itemQuantity}
          onChange={(event, newValue) => {
            setQuantity(event.target.value);
            console.log('Quantity: ' + event.target.value);
            setAmount(itemRate * event.target.value);
          }}
          type="numeric"
        />
      )
    },
    {
      title: "Rate", field: 'rate', editComponent: () => (
        <TextField
          value={itemRate}
          //   onChange={(event, newValue) => {
          //     setRate(newValue);
          // }}
          type="numeric"
        />
      )
    },
    {
      title: "Tax", field: "tax", editComponent: () => (
        // <Autocomplete
        // id="tax_box"
        // value={taxType}
        // onChange={(event, newValue) => {
        //     setTaxType(newValue.tax_preference);
        // }}
        // options={item_data}
        // getOptionLabel= {(option) => option.tax_preference ? option.tax_preference : ""}
        // style={{ width: 300 }}
        // renderInput={(params) => <TextField {...params} label="Tax Type" variant="outlined" />}
        // />
        <TextField
          value={taxType}
          disabled
          //   onChange={(event, newValue) => {
          //     setRate(newValue);
          // }}
          type="text"
        />
      )
    },
    {
      title: "Amount", field: "amt", editComponent: () => (
        <TextField
          value={itemAmount}
          onChange={(event, newValue) => {
            setAmount(newValue);
          }
          }
          type="numeric"
        />
      )
    }
  ]

  function calculateTotal() {
    let total = 0;
    
    if(discountType==='percentage')
    {
      total = subTotal-((subTotal*discountAmount)/100)+shippingCharges;
    }else{
      total = subTotal-discountAmount+shippingCharges;
    }
    
    return total;
  }


  return (
    <div className="App">
      <MaterialTable
        style={{fontSize:'20%'}}
        icons={Icons}
        title="Add Items"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const itemToAdd = itemName;
            const rateToAdd = itemRate;
            const taxToAdd = taxType;
            const amountToAdd = itemQuantity * rateToAdd;
            const quantityToAdd = itemQuantity;

            let newAppendRow = { id: Math.floor(Math.random() * 100), item_name: itemToAdd, rate: rateToAdd, amt: amountToAdd, tax: taxToAdd, qty: quantityToAdd, ...newRow }
            console.log(newAppendRow);
            const updatedRows = [...data, newAppendRow]
            let sub = 0;
            updatedRows.forEach(row =>{
              const rowamt = row.amt;
              sub = sub + rowamt;
            })


            setTimeout(() => {
              setData(updatedRows)
              setSubTotal(sub);
              setProductsData(updatedRows)
              resolve()
            }, 500)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              setProductsData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
            const index = oldRow.tableData.id;
            const updatedRows = [...data]
            updatedRows[index] = updatedRow
            setTimeout(() => {
              setData(updatedRows)
              setProductsData(updatedRows)
              resolve()
            }, 2000)
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first"
        }}
      />

      <div className='invoiceform'>


        <Grid container>
          <Grid item><p>SubTotal: </p></Grid>
          <Grid item><p>{subTotal}</p></Grid>
        </Grid>


        <Grid container>
          <Grid item >
            <TextField
              variant="standard"
       
              value={discountAmount}
              type='number'
              label='Discount'
              InputLabelProps={{ style: { fontSize: 20 } }}
              onChange={(e) => { setDiscount(e.target.value);
              }}
            />
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex" }} >
            <Select
            
              value={discountType}
              select
              onChange={(e) => { setDiscountType(e.target.value) 
              }}
            >
              <MenuItem key='1' value='percentage'>{<AiIcons.AiOutlinePercentage />}</MenuItem>
              <MenuItem key='2' value='number'>{<BiIcons.BiRupee />}</MenuItem>
            </Select>
          </Grid>
          </Grid>

          
          <TextField
          variant='standard'
          type='number'
          label='Shipping Charges'
          value={shippingCharges}
          onChange={(e) => { 
            if(e.target.value)
            {
              setShippingCharges(parseInt(e.target.value))
            }
            else{
              setShippingCharges(0);
            }
          }}
          
          InputLabelProps={{ style: { fontSize: 20 } }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><BiIcons.BiRupee /></InputAdornment>,
            style: { fontSize: 20, }
          }}
        />

        


        <Grid container>
          <Grid item><p>Total:</p></Grid>
          <Grid item><p>{calculateTotal()}</p></Grid>
        </Grid>



      </div>

    </div>
  );
}

export default AddInvoiceTable;