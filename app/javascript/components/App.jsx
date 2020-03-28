import React from 'react'
import Restaurants from './Restaurants'
import { Navbar } from 'react-bootstrap'

const App = () => (
  <>
    <Navbar bg='light'>
      <Navbar.Brand href='#home'>Covid Carry Out - STL</Navbar.Brand>
    </Navbar>
    <div style={{ marginTop: '20px' }} className='container'>
      <Restaurants />
    </div>
  </>
)

export default App
