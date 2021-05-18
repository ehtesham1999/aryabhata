import React,{useEffect,useState} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import {fetchitem} from '../../Api'
import './DisplayItem.scss'
import Controls from '../controls/Controls';
 
import axios from 'axios'



const DisplayItem = () => {
    const params = useParams();
    const history = useHistory();
    const [item, setItemData] = useState(null)



    const fetchAPI = async () => {
        setItemData(await fetchitem(params.id));
        
    }
  
    useEffect(() => {
        fetchAPI();
    }, []);



    // useEffect(() =>{
    //     axios({
    //         url:`http://localhost:5000/items/${params.id}`,
    //         method: 'GET'
    //     }).then((res)=>{setItemData(res.data)})
    //     .catch((err)=>{console.error(err)})
    // },[])


    return (
        <>

            {item && 
            <div className='box'>

            <div className='box-header'>

            <h1>{item.name}</h1>
            <h2>{item.SKU}</h2>

            </div>
            <div className='box-boxcol'>

            <div className='box-col1'>
                <p>Item Type :{item.type}</p>
                <p>SKU :{item.SKU}</p>
                <p>Unit: {item.unit}</p>
                <p>Category: {item.category}</p>
                <p>Tax Preference: {item.tax_preference}</p>
                <p>Intra State Tax Rate: {item.intra_tax_rate}</p>
                <p>Inter State Tax Rate: {item.inter_tax_rate}</p>
            </div>

            <div className='box-col2'>
                <p className='box-col2-headings'>Purchase Information</p>
                <p>Cost Price : {item.cost_price}  </p>
                <p>Purchase Account: {item.purchase_account}</p>

                <p className='box-col2-headings'>Sales Information</p>
                <p>Selling Price : {item.selling_price}  </p>
                <p>Sales Account: {item.sales_account}</p>

                <Controls.Button color="secondary" style={{maxWidth: '400px', maxHeight: '0px', minWidth: '30px', minHeight: '30px'}}
                text='Back'
                 onClick={()=>{history.goBack()}}
                >Back</Controls.Button>

            </div>
            </div>


            </div>
            }
        
        </>
    )
}

export default DisplayItem;
