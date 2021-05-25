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
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Item Type :</p><p>{item.type}</p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>SKU :</p><p>{item.SKU}</p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Unit:</p><p> {item.unit}</p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Category:</p><p> {item.category}</p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Tax Preference:</p><p> {item.tax_preference}</p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Intra State Tax Rate:</p><p> {item.intra_tax_rate}</p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Inter State Tax Rate:</p><p> {item.inter_tax_rate}</p></div>
            </div>

            <div className='box-col2'>
                <p className='box-col2-headings'>Purchase Information</p>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Cost Price : </p><p>{item.cost_price}  </p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Purchase Account:</p><p> {item.purchase_account}</p></div>

                <p className='box-col2-headings'>Sales Information</p>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Selling Price :</p><p> {item.selling_price}  </p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Sales Account: </p><p>{item.sales_account}</p></div>

                <Controls.Button color="secondary" 
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
