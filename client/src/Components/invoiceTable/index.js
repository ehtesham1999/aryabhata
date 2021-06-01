import React, { useState,useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import  Icons  from './tableIcons';
import { setQuarter } from 'date-fns';
import { fetchdata } from '../../Api'




const itemList = [
  
]




  

const AddInvoiceTable = ({setProductsData}) => {

  const [item_data, setItemData] = useState([])
    
  const fetchAPI = async () => {
    await fetchdata().then(
      (data)=>{
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

          if(newValue!==null)  {
            setItemName(newValue.name)
            setRate(newValue.selling_price)
            setTaxType(newValue.tax_preference)
          }
         

          
            
        }}
        options={item_data}
        getOptionLabel= {(option) => option.name?option.name : ""}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Item Name" variant="outlined" />}
        />
      ) },
    { title: "Quantity", field: "qty" , editComponent: () => (
        <TextField
          value={itemQuantity}
          onChange={(event, newValue) => {
            setQuantity(event.target.value);
            console.log('Quantity: '+event.target.value);
            setAmount(itemRate*event.target.value);
            }}
          type="numeric"
        />
      )},
    { title: "Rate", field: 'rate' , editComponent: () => (
        <TextField
          value={itemRate}
        //   onChange={(event, newValue) => {
        //     setRate(newValue);
        // }}
          type="numeric"
        />
      ) },
    { title: "Tax", field: "tax", editComponent: () => (
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
      //   onChange={(event, newValue) => {
      //     setRate(newValue);
      // }}
        type="text"
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
      <MaterialTable
        icons={Icons}
        title="Add Items"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const itemToAdd = itemName;
            const rateToAdd = itemRate;
            const taxToAdd = taxType;
            const amountToAdd = itemQuantity*rateToAdd;
            const quantityToAdd = itemQuantity;
        
            let newAppendRow = { id: Math.floor(Math.random() * 100) , item_name : itemToAdd, rate : rateToAdd , amt : amountToAdd ,tax: taxToAdd ,qty: quantityToAdd , ...newRow }
            console.log(newAppendRow);
            const updatedRows = [...data, newAppendRow ]

            
            setTimeout(() => {
              setData(updatedRows)
              setProductsData(updatedRows)
              resolve()
            }, 2000)
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
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            updatedRows[index]=updatedRow
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
    </div>
  );
}

export default AddInvoiceTable;