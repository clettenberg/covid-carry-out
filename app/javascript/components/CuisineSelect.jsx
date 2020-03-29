import React from 'react'

import FilterSelect from './FilterSelect'

const CuisineSelect = ({ cuisines, cuisineId, onChange }) => (
  <FilterSelect
    options={cuisines}
    selectedId={cuisineId}
    onChange={onChange}
    type='Cuisines'
  />
)

export default CuisineSelect
