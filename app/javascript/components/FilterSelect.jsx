import React from 'react'

import Form from 'react-bootstrap/Form'

const FilterSelect = ({ options, selectedId, onChange, type }) => (
  <Form.Group>
    <Form.Control as='select' onChange={onChange} value={selectedId}>
      <option value='-1'>{`All ${type}`}</option>
      {options.map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
)

export default FilterSelect
