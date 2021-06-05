import axios from "axios";

const url = `http://localhost:${process.env.PORT}/items/`;
const url2= `http://localhost:${process.env.PORT}/customers/`;
const url3= `http://localhost:${process.env.PORT}/invoice/`;

export const fetchdata = async () => {
    try{
        // const { data :{name,SKU,category,selling_price,HSN_Code,opening_stock,unit}} = await axios.get(url);
        // return {name,SKU,category,selling_price,HSN_Code,opening_stock,unit};
        const data=await axios.get(url)
        console.log(data)
        return data.data
    }
    catch(error){
        console.log(error)
    }

}

export const fetchcustomerdata = async () => {
    try{
        const data=await axios.get(url2)
        console.log(data)
        return data.data
    }
    catch(error){
        console.log(error)
    }

}
export const fetchinvoicedata = async () => {
    try{
        const data=await axios.get(url3)
        // console.log(data)
        return data.data
    }
    catch(error){
        console.log(error)
    }

}

export const fetchcustomernames = async () => {
    try{
        const data=await axios.get(url2)
        console.log(data)
        const names=[]
        for(let i=0;i<data.data.length;i++){
            names.push({name:data.data[i].display_name,id:data.data[i]._id})
        }
        return names;
    }
    catch(error){
        console.log(error)
    }

}

export const fetchitem = async (id) => {
    try{
        console.log(id)
        let fetchurl =`http://localhost:${process.env.PORT}/items/${id}`
        const data=await axios.get(fetchurl)
        console.log(data.data)
        return data.data
    }
    catch(error){
        console.log(error)
    }

}

export const fetchcustomer = async (id) => {
    try{
        console.log(id)
        let fetchurl =`http://localhost:${process.env.PORT}/customers/${id}`
        const data=await axios.get(fetchurl)
        console.log(data.data)
        return data.data
    }
    catch(error){
        console.log(error)
    }

}
