import React, {useMemo} from 'react';
import Dropdown from '../common/Dropdown'

const getFilteredCategories = (categories, type) => {
    return categories.filter(category=> category.type===type)
}

const CategoriesDropdown = ({categories, selectedCategory, onChange, type})=> {
    
    const filteredCategory = useMemo(()=>getFilteredCategories(categories, type), [categories, type])
    
    return(
    <Dropdown dropdownName='카테고리' element={filteredCategory} onChange={onChange} selected={selectedCategory}/>
    )
}
export default CategoriesDropdown;