import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom';

import '../Pages/PageStyle.scss';
import AddcustomerForm from '../Components/AddcustomerForm'

export const AddCustomer = () => {
    return (
        <AddcustomerForm/>
    )
}