import React from 'react';
import Dropdown from '../common/Dropdown'
const IncomeExpenseDropdown = ({selectedType, onChange})=> {

    const dropdownElement = [{
        text: '수입',
        id: 'income'
    },
    {
        text: '지출',
        id: 'expense'
    }
    ]

    return(
    <Dropdown dropdownName='수입/지출' element={dropdownElement} selected={selectedType} onChange={onChange}/>
    )
}
export default IncomeExpenseDropdown;