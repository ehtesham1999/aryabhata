import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import React from 'react'
import DisplayItem from './Components/DisplayItem'


import {AddCompositeItem, Inventory, AddItem } from './Pages/Inventory';

function App() {
  return (
    <Router>
      <Sidebar/>
      <Switch>
        <Route path ='/inventory' exact component={Inventory}/>
        <Route path='/inventory/addproduct' exact component={AddItem}/>
        <Route path='/inventory/compositeproduct' exact component={AddCompositeItem}/>
        <Route path='/inventory/overview/:id' exact component={DisplayItem}/>
      </Switch>
    </Router>
    
  )
}

export default App;
