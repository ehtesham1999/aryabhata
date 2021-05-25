import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import React from 'react'
import DisplayItem from './Components/DisplayItem'


import {AddItem} from './Pages/Inventory';
import {AddCustomer} from './Pages/Sales'

function App() {
  return (
    <Router>
      <Sidebar/>
      <Switch>
        <Route path='/inventory/addproduct' exact component={AddItem}/>
        <Route path='/inventory/overview/:id' exact component={DisplayItem}/>
        <Route path='/sales/addcustomer' exact component= {AddCustomer}/>
      </Switch>
    </Router>
    
  )
}

export default App;
