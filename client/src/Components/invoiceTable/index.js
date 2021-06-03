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

  const[table_data,setTableData]=useState({
    itemName:'',
    itemQuantity:0,
    discountType:'number',
    discountAmount:0,
    shippingCharges:0,
    subTotal:0,
    itemData:{}
  })

 


  // const [itemName, setItemName] = useState(null);
  // const [taxType, setTaxType] = useState("");
  // const [itemAmount, setAmount] = useState(0);
  // const [itemRate, setRate] = useState(0);
  // const [itemQuantity, setQuantity] = useState(0);
  // const [discountType, setDiscountType] = useState('number');
  // const [discountAmount, setDiscount] = useState(0);
  // const [shippingCharges,setShippingCharges] = useState(0);
  // const [subTotal , setSubTotal] = useState(0);



  const columns = [
    { title: "ID", field: "id", editable: false },
    {
      title: "Item Details", field: "item_name", editComponent: () => (
        <Autocomplete
          id="item_box"
          onChange={(event, newValue) => {
            console.log(newValue);
            
            setTableData((prev_value) => (
              {...prev_value,
                itemData:newValue
              }))
         
            console.log(table_data)
            
           
        }}
        
        options={item_data}
        getOptionLabel={(option) => option.name ? option.name : ""}
        getOptionSelected={(option, value) => option.name === value.name }
        value={table_data.itemData}
        onInputChange={(event, inputValue)=>{
          console.log(inputValue)
          setTableData((prev_value)=> ({
            ...prev_value,
            itemName:inputValue,
          }))

          console.log(table_data)
        }}
        inputValue={table_data.itemName}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Item Name"  variant="outlined" />}
        />
      )
    },
    {
      title: "Quantity", field: "qty", editComponent: () => (
        <TextField
          value={table_data.itemQuantity}
          InputProps={{
            inputProps: { 
                 min:0
            }
        }}
          onChange={(event, newValue) => {
            // setQuantity(event.target.value);
            console.log('Quantity: ' + event.target.value);
            // setAmount(itemRate * event.target.value);
            setTableData((prev_value) => ({
              ...prev_value,
              itemQuantity:event.target.value,
            }))
            console.log(table_data)
          }}
          type="number"
          min="0"
        />
      )
    },
    {
      title: "Rate", field: 'rate', editComponent: () => (
        <TextField
          value={table_data.itemData.selling_price ? table_data.itemData.selling_price: 0}
          //   onChange={(event, newValue) => {
          //     setRate(newValue);
          // }}
          disabled
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
          value={table_data.itemData.tax_preference ? table_data.itemData.tax_preference: 0}
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
          value={table_data.itemData.selling_price ? table_data.itemData.selling_price*table_data.itemQuantity:0}
          type="numeric"
        />
      )
    }
  ]

  function calculateTotal() {
    let total = 0;
    
    if(table_data.discountType==='percentage')
    {
      total = table_data.subTotal-((table_data.subTotal*table_data.discountAmount)/100)+table_data.shippingCharges;
    }else{
      total = table_data.subTotal-table_data.discountAmount+table_data.shippingCharges;
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
            const itemToAdd = table_data.itemName;
            const rateToAdd = table_data.itemData.selling_price;
            const taxToAdd = table_data.itemData.tax_preference;
            const amountToAdd = table_data.itemQuantity * rateToAdd;
            const quantityToAdd = table_data.itemQuantity;

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
              // setSubTotal(sub);
              setTableData((prev_value)=> ({
                ...prev_value,
                subTotal: sub
              }))
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
            console.log(updatedRow)
            console.log(oldRow)
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
          <Grid item><p>{table_data.subTotal}</p></Grid>
        </Grid>


        <Grid container>
          <Grid item >
            <TextField
              variant="standard"
       
              value={table_data.discountAmount}
              type='number'
              label='Discount'
              InputLabelProps={{ style: { fontSize: 20 } }}

              onChange={(e) => {
                setTableData((prev_value)=>({
                  ...prev_value,
                  discountAmount:e.target.value
                }))
             }}
             
            />
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex" }} >
            <Select
            
              value={table_data.discountType}
              select
              onChange={(e) => {
                 setTableData((prev_value)=>({
                   ...prev_value,
                   discountType:e.target.value
                 }))
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
          value={table_data.shippingCharges}
          onChange={(e) => { 
            if(e.target.value)
            {
              // setShippingCharges(parseInt(e.target.value))
              setTableData((prev_value)=> ({
                ...prev_value,
                shippingCharges:parseInt(e.target.value)
              }))
            }
            else{
              // setShippingCharges(0);
              setTableData((prev_value)=> ({
                ...prev_value,
                shippingCharges:0
              }))
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