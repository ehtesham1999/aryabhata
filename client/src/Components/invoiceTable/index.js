import React, { useState } from 'react';
import './App.css';
import MaterialTable from 'material-table'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import  Icons  from './tableIcons';
import { setQuarter } from 'date-fns';


const itemList = [
  { id: 1, item_name: "Jeera", qty: 2 , rate: 12, tax: 'GST' , amt : 500},
  { id: 2, item_name: "Potato", qty: 3 , rate: 12, tax: 'GST' , amt : 500},
  { id: 3, item_name: "Rice", qty: 4 , rate: 12, tax: 'GST' , amt : 500},
  { id: 4, item_name: "Flour", qty: 5 , rate: 12, tax: 'GST' , amt : 500},
  { id: 5, item_name: "Seeds", qty: 6 , rate: 12, tax: 'GST' , amt : 500}
]


const itemDetails = [
    {  item_name: "Jeera",  rate: 12 },
    {  item_name: "Potato",  rate: 24 },
    {  item_name: "Rajma",  rate: 15 },
    {  item_name: "Banana",  rate: 15 },
    {  item_name: "Apples",  rate: 17 },
  ]

const itemNames = [{item_name : "Jeera"},
                {item_name : "Dahi"},
                {item_name : "Wheat"},
                {item_name : "Rajma"},
                {item_name : "Apples"},
                ]

const taxTypeNames = [{type: "Non-Taxable"},{type : "GST"},{type:"VAT"},{type:"SGST"}]

  

const AddInvoiceTable = () => {

  const [data, setData] = useState(itemList);
  const [itemName , setItemName] = useState("");
  const [taxType, setTaxType] = useState("");
  const [itemAmount, setAmount] = useState(0);
  const [itemRate, setRate] = useState(0);
  const [itemQuantity, setQuantity] = useState(0);

  

  const columns = [
    { title: "ID", field: "id" , editable : false},
    { title: "Item Details", field: "item_name" , editComponent: () => (
        <Autocomplete
        id="item_box"
        value={itemName}
        onChange={(event, newValue) => {
            setItemName(newValue);
            console.log('Rate : '+newValue.rate);
            setRate(newValue.rate)
        }}
        options={itemDetails}
        getOptionLabel= {(option) => option.item_name?option.item_name : ""}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Item Name" variant="outlined" />}
        />
      ) },
    { title: "Quantity", field: "qty" , editComponent: () => (
        <TextField
          value={itemQuantity}
          onChange={(event, newValue) => {
            setQuantity(newValue);
            console.log('Quantity: '+newValue);
            // setAmount(itemRate*newValue);
            }}
          type="numeric"
        />
      )},
    { title: "Rate", field: 'rate' , editComponent: () => (
        <TextField
          value={itemRate}
          onChange={(event, newValue) => {
            setRate(newValue);
        }}
          type="numeric"
        />
      ) },
    { title: "Tax", field: "tax", editComponent: () => (
        <Autocomplete
        id="tax_box"
        value={taxType}
        onChange={(event, newValue) => {
            setTaxType(newValue);
        }}
        options={taxTypeNames}
        getOptionLabel= {(option) => option.type ? option.type : ""}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Tax Type" variant="outlined" />}
        />
      ) },
    { title: "Amount", field: "amt", editComponent: () => (
        <TextField
          value={itemAmount}
          onChange={(event, newValue) => {
            setAmount(newValue);
        }
        }
          type="numeric"
        />
      ) }
  ]


  return (
    <div className="App">
      {/* <h1 align="center">React-App</h1>
      <h4 align='center'>Material Table with CRUD operation</h4> */}
      <MaterialTable
        icons={Icons}
        title="Add Items"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            // console.log({ id: Math.floor(Math.random() * 100),itemName,...newRow });
            
            const itemToAdd = itemName.item_name;
            const rateToAdd = itemName.rate;
            const taxToAdd = taxType.type;
            const amountToAdd = newRow.qty*rateToAdd;
        
            let newAppendRow = { id: Math.floor(Math.random() * 100) , item_name : itemToAdd, rate : rateToAdd , amt : amountToAdd ,tax: taxToAdd , ...newRow }
            console.log(newAppendRow);
            const updatedRows = [...data, newAppendRow ]
            
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first"
        }}
      />
    </div>
  );
}

export default AddInvoiceTable;