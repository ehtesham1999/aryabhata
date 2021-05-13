import axios from "axios";

const url = "http://localhost:5000/items/";

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
