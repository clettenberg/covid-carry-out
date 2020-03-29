import { fetch } from 'whatwg-fetch'
import React from 'react'
import Restaurants from './Restaurants'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Spinner from './Spinner'
class App extends React.Component {
  constructor (props) {
    super(props)

    this.handleCountyChange = this.handleCountyChange.bind(this)

    this.state = {
      restaurants: [],
      err: [],
      countyId: -1,
      hasFetchedRestaurants: false
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
        this.setState({
          restaurants,
          hasFetchedRestaurants: true
        })
      })
  }

  countySelect (countiesMap) {
    return (
      <Form.Group>
        <Form.Control as='select' onChange={this.handleCountyChange}>
          <option value='-1'>All</option>
          {[...countiesMap].map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </Form.Control>
      </Form.Group>
    )
  }

  spinner () {
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '80px'
        }}
      >
        <Spinner />
      </div>
    )
  }

  render () {
    const {
      restaurants,
      countyId,
      hasFetchedRestaurants
    } = this.state

    const countiesMap = new Map()
    restaurants.forEach(r => countiesMap.set(r.county.id, r.county.name))

    return (
      <>
        <Navbar bg='light'>
          <Navbar.Brand href='#home'>Covid Carry Out - STL</Navbar.Brand>
        </Navbar>
        <Container style={{ marginTop: '20px' }}>
          {hasFetchedRestaurants
            ? this.countySelect(countiesMap)
            : this.spinner()}

          <Restaurants restaurants={restaurants} countyId={countyId} />
        </Container>
      </>
    )
  }
}

export default App
