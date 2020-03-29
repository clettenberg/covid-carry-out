import React from 'react'

import FilterSelect from './FilterSelect'

const CountySelect = ({ counties, countyId, onChange }) => (
  <FilterSelect
    options={counties}
    selectedId={countyId}
    onChange={onChange}
    type='Counties'
  />
)

export default CountySelect
