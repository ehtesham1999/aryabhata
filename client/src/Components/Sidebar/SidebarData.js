import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as GrIcons from 'react-icons/gr'
export const SidebarData =[
    {
        title:'Inventory',
        path:'/inventory',
        icon:<GrIcons.GrStorage/>,
        iconClosed:<RiIcons.RiArrowDownSFill/>,
        iconOpened:<RiIcons.RiArrowUpSFill/>,
        subNav:[
            {
                title:'Add product',
                path:'/inventory/addproduct',
                icon:<GrIcons.GrAdd/>
            },
            {
                title:'Composite product',
                path:'/inventory/compositeproduct',
                icon:<GrIcons.GrAdd/>
            },

        ]

    }
]