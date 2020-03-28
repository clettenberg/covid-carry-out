import { fetch } from 'whatwg-fetch'
import React from 'react'
import Restaurants from './Restaurants'
import { Navbar, Form } from 'react-bootstrap'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.handleCountyChange = this.handleCountyChange.bind(this)

    this.state = {
      restaurants: [],
      err: [],
      countyId: -1
    }
  }

  fetchRestaurants () {
    return fetch('/api/restaurants')
      .then(results => results.json())
      .then(results => {
        return results.errors
          ? Promise.reject(Error.new('Error fetching restaurants'))
          : Promise.resolve(results)
      })
  }

  handleCountyChange (e) {
    const countyId = parseInt(e.target.value)
    this.setState({ countyId })
  }

  componentDidMount () {
    this.fetchRestaurants()
      .then(restaurants => {
        this.setState({ restaurants })
      })
  }

  render () {
    const {
      restaurants,
      countyId
    } = this.state

    const countiesMap = new Map()
    restaurants.forEach(r => countiesMap.set(r.county.id, r.county.name))

    return (
      <>
        <Navbar bg='light'>
          <Navbar.Brand href='#home'>Covid Carry Out - STL</Navbar.Brand>
        </Navbar>
        <div style={{ marginTop: '20px' }} className='container'>
          <Form.Control as='select' onChange={this.handleCountyChange}>
            <option value='-1'>All</option>
            {[...countiesMap].map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </Form.Control>
          <Restaurants restaurants={restaurants} countyId={countyId} />
        </div>
      </>
    )
  }
}

export default App
